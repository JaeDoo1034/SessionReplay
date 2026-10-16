# Session Replay Runtime Mermaid

이 문서는 현재 `test_ui + SDK + Express WAS + SQLite/Supabase + viewer`가 어떻게 동작하는지 Mermaid 다이어그램으로 정리한 문서입니다.

현재 운영 기준:

- 로컬 개발: `DATABASE_URL`이 없으면 SQLite 사용
- Vercel Production: `DATABASE_URL`이 있으면 Supabase Postgres 사용
- DB 연결 timeout 같은 일시 장애는 `src/replay-postgres-db.js`에서 재시도
- SDK는 저장 실패 시 서버가 내려준 실제 `json.error`를 사용자 활동 로그에 표시

## 전체 아키텍처

```mermaid
flowchart LR
  User[사용자] --> TestUI[Test UI<br/>금융 앱 화면]

  TestUI --> SDK[SessionReplaySDK<br/>sdk/session-replay-sdk.js]

  SDK --> StartAPI[POST /api/replay/sessions/start]
  SDK --> BatchAPI[POST /api/replay/events/batch]
  SDK --> EndAPI[POST /api/replay/sessions/end]

  StartAPI --> Server[Express WAS<br/>src/server.js]
  BatchAPI --> Server
  EndAPI --> Server

  Server --> Store{Replay Store 선택}
  Store -->|local<br/>DATABASE_URL 없음| SQLite[(SQLite<br/>data/session-replay.sqlite)]
  Store -->|production<br/>DATABASE_URL 있음| PgStore[src/replay-postgres-db.js]
  PgStore --> Retry{Transient DB error?}
  Retry -->|yes| RetryWait[짧게 대기 후 retry]
  RetryWait --> PgStore
  Retry -->|no| Supabase[(Supabase Postgres)]

  Viewer[Replay Viewer<br/>/viewer] --> ListAPI[GET /api/replay/sessions]
  Viewer --> PayloadAPI[GET /api/replay/sessions/:id/payload]
  Viewer --> LLMAPI[POST /api/llm-analyze]

  ListAPI --> Server
  PayloadAPI --> Server
  LLMAPI --> Server

  Server --> Analyzer[Behavior Analyzer<br/>src/behavior-analyzer.js]
  Server --> LLM[LLM<br/>OpenAI API]

  SQLite --> Server
  Supabase --> Server
  Server --> Viewer

  Viewer --> Replayer[SessionReplayer<br/>src/replayer.js]
  Replayer --> Iframe[Replay iframe]

  classDef storage fill:#eef2ff,stroke:#4f46e5,color:#1e1b4b;
  classDef retry fill:#dcfce7,stroke:#16a34a,color:#14532d;
  class Store,SQLite,Supabase storage;
  class PgStore,Retry,RetryWait retry;
```

## Test UI 녹화 흐름

```mermaid
stateDiagram-v2
  [*] --> Ready

  Ready --> Recording: Start 클릭
  Recording --> Stopped: Stop 클릭
  Stopped --> Saved: Save 클릭
  Saved --> Recording: Start 클릭

  Recording: 이벤트 수집 중
  Recording: click/input/scroll/mutation/view_state

  Stopped: 녹화 중지
  Stopped: 남은 queue flush 가능

  Saved: 세션 종료 저장
  Saved: viewer에서 조회 가능
```

## SDK 내부 동작

```mermaid
sequenceDiagram
  participant U as User
  participant UI as Test UI
  participant SDK as SessionReplaySDK
  participant API as Express API
  participant Store as Replay Store
  participant DB as SQLite or Supabase

  U->>UI: Session 버튼 클릭
  U->>UI: Start 클릭
  UI->>SDK: sdk.start()

  SDK->>SDK: sessionId 생성
  SDK->>API: POST /api/replay/sessions/start
  API->>Store: insertSession()
  Store->>DB: replay_sessions 저장

  SDK->>SDK: 초기 snapshot 기록
  SDK->>SDK: 이벤트 listener 등록
  SDK->>SDK: MutationObserver 시작

  U->>UI: 클릭/스크롤/화면 이동/입력
  UI->>SDK: sdk.track("view_state")
  SDK->>SDK: event/mutation queue 적재

  SDK->>API: POST /api/replay/events/batch
  API->>Store: insertEvents()
  Store->>DB: replay_events batch 저장

  U->>UI: Stop 클릭
  UI->>SDK: sdk.pause()
  SDK->>API: 남은 events flush

  U->>UI: Save 클릭
  UI->>SDK: sdk.save()
  SDK->>API: POST /api/replay/sessions/end
  API->>Store: endSession()
  Store->>DB: session status ended
```

## 운영 저장 안정화 흐름

`Stop failed`, `Save failed` 장애 이후 운영 소스에는 DB 연결 timeout 방어 흐름이 추가되었습니다.

```mermaid
flowchart TD
  Request[Replay API 요청<br/>start / batch / end / list] --> Server[src/server.js]
  Server --> Store[src/replay-postgres-db.js]
  Store --> Query[query 또는 transaction 실행]
  Query --> Pool[pg Pool]
  Pool --> Supabase[(Supabase Postgres)]

  Pool -. connection timeout .-> Transient{Transient DB error?}
  Transient -->|yes| Delay[250ms, 500ms 순차 대기]
  Delay --> Retry[최대 3회 재시도]
  Retry --> Query
  Transient -->|no 또는 retry exhausted| ErrorJson[API json.error 반환]

  ErrorJson --> SDK[sdk/session-replay-sdk.js]
  SDK --> UILog[test_ui Activity Log<br/>실제 서버 에러 표시]

  Supabase --> Success[200 OK]
  Success --> Viewer[viewer에서 세션 조회 가능]

  classDef fix fill:#dcfce7,stroke:#16a34a,color:#14532d;
  classDef error fill:#fee2e2,stroke:#dc2626,color:#7f1d1d;
  class Store,Transient,Delay,Retry,UILog fix;
  class ErrorJson error;
```

## Viewer 재생/분석 흐름

```mermaid
sequenceDiagram
  participant V as Viewer
  participant API as Express API
  participant Store as Replay Store
  participant DB as SQLite or Supabase
  participant R as SessionReplayer
  participant A as Behavior Analyzer
  participant L as LLM

  V->>API: GET /api/replay/sessions
  API->>Store: listSessions()
  Store->>DB: 세션 목록 조회
  DB-->>Store: sessions
  Store-->>API: sessions
  API-->>V: sessions

  V->>API: GET /api/replay/sessions/:id/payload
  API->>Store: getPayload()
  Store->>DB: session + events 조회
  DB-->>Store: payload 구성 데이터
  Store-->>API: replay payload
  API-->>V: replay payload

  V->>R: replayer.load(payload)
  R->>R: snapshot iframe 로드
  R->>R: preview/render

  V->>A: analyzeBehavior(payload)
  A-->>V: metrics + customer type 후보

  V->>API: POST /api/llm-analyze
  API->>L: 고객 행동 유형 정의 요청
  L-->>API: customer type JSON
  API-->>V: LLM 분석 결과

  V->>R: Play 클릭
  R->>R: event/mutation/view_state 시간순 재생
```

## 화면 전환 Replay

```mermaid
flowchart TD
  UserAction[사용자 화면 이동<br/>홈/상품몰/혜택몰/자산] --> ShowScreen[showScreen screenName]

  ShowScreen --> DOMUpdate[active screen 변경]
  ShowScreen --> TrackViewState[sdk.track view_state]

  TrackViewState --> Queue[SDK event queue]
  Queue --> Batch[events batch 저장]
  Batch --> Store{Replay Store}
  Store --> SQLite[(SQLite local)]
  Store --> Supabase[(Supabase production)]

  SQLite --> Payload[viewer payload 조회]
  Supabase --> Payload
  Payload --> Replayer[src/replayer.js]

  Replayer --> ApplyViewState[applyViewStateEvent]
  ApplyViewState --> ReplayDOM[Replay iframe에서 동일 screen active 처리]
```

## Viewer 현재 UI 배치

```mermaid
flowchart TB
  Topbar[상단 툴바<br/>세션 목록 버튼 / Replay Viewer / Test UI]

  Topbar --> Body[본문 영역]

  Body --> Left[좌측 1<br/>고객 행동 분석 결과]
  Body --> Right[우측 4<br/>세션 리플레이 화면]

  Topbar --> Drawer[세션 목록 Drawer]
  Drawer --> SessionSelect[세션 선택]
  SessionSelect --> Left
  SessionSelect --> Right
```

## 요약

현재 구조의 핵심은 다음과 같습니다.

- `test_ui`는 금융 앱 형태의 테스트 화면입니다.
- `SessionReplaySDK`는 테스트 화면의 행동을 수집합니다.
- SDK는 WAS 서버에 세션 시작, 이벤트 batch, 세션 종료를 전송합니다.
- WAS는 로컬에서는 SQLite, 운영에서는 Supabase Postgres에 세션과 이벤트를 저장합니다.
- 운영 Postgres 저장소는 connection timeout 계열 에러를 최대 3회 재시도합니다.
- viewer는 저장소에서 payload를 조회해 `SessionReplayer`로 재생합니다.
- viewer는 같은 payload를 `behavior-analyzer.js`와 LLM 분석에 사용해 고객 행동 유형을 표시합니다.
