# Session Replay Test Environment Workflow

## 목적

현재까지 작성한 `Test/session-replay-snippet` 버전들을 실제 서비스형 구조에서 검증할 수 있도록 테스트 환경을 만든다.

최종 목표는 단순 브라우저 Snippet 실행을 넘어, 특정 화면에 태깅 SDK처럼 스크립트를 삽입하고, 수집된 세션 리플레이 데이터를 WAS 서버를 통해 SQLite DB에 적재한 뒤, 재생/검증할 수 있는 구조를 만드는 것이다.

## 전체 진행 단계

1. 테스트용 프론트 UI 구축
2. 세션 리플레이 태깅 SDK 구조 설계
3. WAS 서버 API 설계 및 구현
4. SQLite DB 스키마 설계 및 적재
5. 수집 데이터 조회/재생 흐름 연결
6. 검증 시나리오 및 체크리스트 작성

## 1. 테스트용 프론트 UI 구축

### 참고 대상

- 참고 URL: `https://www.apple.com/kr/iphone/`
- 목적: Apple iPhone 페이지의 사용 흐름과 UI 밀도를 참고해, 세션 리플레이 테스트에 적합한 인터랙션을 가진 프론트를 만든다.

### 구현 방향

Apple 페이지를 그대로 복제하지 않고, 리플레이 검증에 필요한 UI 패턴을 재구성한다.

- 상단 내비게이션
- 제품 히어로 영역
- 제품 카드/비교 영역
- 탭 또는 세그먼트 컨트롤
- CTA 버튼
- 모달 또는 상세 패널
- 스크롤 기반 섹션 전환
- 폼 입력 영역
- 동적으로 변경되는 콘텐츠 영역

### 리플레이 검증 포인트

- 클릭 이벤트가 실제 UI 상태 변화를 일으키는지
- 탭/버튼/모달/폼 입력이 replay에서 재현되는지
- 스크롤 위치와 viewport scaling이 안정적인지
- DOM mutation이 과도하게 적용되어 화면이 깨지지 않는지
- iframe 또는 외부 콘텐츠 영역이 있을 경우 placeholder/요약 처리가 가능한지

## 2. 태깅 SDK 구조 설계

### 목표

특정 세션 리플레이 대상 화면에 아래와 같은 방식으로 스크립트를 삽입할 수 있는 구조를 만든다.

```html
<script src="/sdk/session-replay-sdk.js" data-project-id="demo-project"></script>
```

또는 초기화 API 형태를 지원한다.

```html
<script src="/sdk/session-replay-sdk.js"></script>
<script>
  window.SessionReplaySDK.init({
    projectId: "demo-project",
    userId: "test-user",
    collectIntervalMs: 5000
  });
</script>
```

### SDK 역할

- 세션 ID 생성 및 유지
- 초기 snapshot 수집
- click/input/change/scroll/navigation/mutation 이벤트 수집
- privacy 설정 적용
  - input masking
  - block/mask selector
  - redaction 통계
- 일정 주기 또는 이벤트 개수 기준으로 서버에 batch 전송
- 네트워크 실패 시 retry 또는 in-memory queue 유지

### 기존 버전 기준

- `v4`: 실제 이벤트 재현 로직의 기준
- `v6`: mutation patch 방식 참고
- `v7`: privacy/config/운영 가드 기준

SDK는 v7 방향을 기본으로 삼되, 재현 실패 시 v4/v6 로직과 비교할 수 있도록 분리 가능한 구조로 만든다.

## 3. WAS 서버 구조

### 목표

SDK에서 전송한 세션 데이터를 받아 SQLite에 저장하고, 이후 조회/재생할 수 있는 API를 제공한다.

### 주요 API 초안

```text
POST /api/replay/sessions/start
POST /api/replay/events/batch
POST /api/replay/sessions/end
GET  /api/replay/sessions
GET  /api/replay/sessions/:sessionId
GET  /api/replay/sessions/:sessionId/events
```

### API 역할

- 세션 시작 기록
- 이벤트 batch 저장
- 세션 종료 상태 업데이트
- 세션 목록 조회
- 특정 세션 메타데이터 조회
- 특정 세션 이벤트 타임라인 조회

## 4. SQLite DB 설계

### 기본 방향

초기 구현은 단순성과 검증 편의성을 우선한다.

- DB: SQLite
- 이벤트 payload는 JSON 문자열로 저장
- 조회 성능이 필요한 필드는 컬럼으로 분리

### 테이블 초안

```sql
CREATE TABLE replay_sessions (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  user_id TEXT,
  page_url TEXT,
  user_agent TEXT,
  viewport_width INTEGER,
  viewport_height INTEGER,
  started_at INTEGER NOT NULL,
  ended_at INTEGER,
  status TEXT NOT NULL
);

CREATE TABLE replay_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_time INTEGER NOT NULL,
  sequence INTEGER NOT NULL,
  payload_json TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (session_id) REFERENCES replay_sessions(id)
);

CREATE INDEX idx_replay_events_session_sequence
ON replay_events(session_id, sequence);
```

### 저장 데이터

- `snapshot`
- `event`
- `mutation`
- `navigation`
- `intent_marker`
- `session_start`
- `session_end`
- `recordingConfig`
- `redactionStats`
- `droppedEventCount`

## 5. 수집 및 재생 흐름

### 기록 흐름

1. 대상 페이지 로드
2. SDK 초기화
3. 세션 생성
4. 초기 snapshot 수집
5. 사용자 이벤트 및 mutation 수집
6. 일정 주기로 WAS에 batch 전송
7. 세션 종료 또는 페이지 이탈 시 남은 이벤트 전송

### 재생 흐름

1. 세션 목록에서 replay 대상 선택
2. 세션 메타데이터 조회
3. 이벤트 타임라인 조회
4. snapshot을 replay iframe에 로드
5. event/mutation/navigation을 시간 순서대로 적용
6. 클릭 포인터, 입력값, 스크롤, DOM 변경 결과 검증

## 6. 프로젝트 구조 초안

```text
SessionReplay/
  src/
    server/
      app.js
      db.js
      routes/
        replay.js
    sdk/
      session-replay-sdk.js
    web/
      test-page/
      replay-viewer/
  Test/
    session-replay-snippet-v*.js
  history/
  work_concept/
  workflow/
    session-replay-test-environment-workflow.md
```

실제 구조는 현재 `package.json`, 기존 `src`, `index.html`, `Test` 폴더 상태를 확인한 뒤 맞춘다.

## 7. 구현 순서

### Step 1. 현재 프로젝트 구조 점검

- `package.json` 스크립트 확인
- 현재 서버/프론트 구성이 있는지 확인
- 기존 `src` 사용 방식을 확인

### Step 2. 테스트 프론트 생성

- Apple iPhone 페이지에서 참고할 UI 패턴 정리
- 리플레이 검증에 필요한 인터랙션을 포함한 테스트 페이지 구현
- 반응형 viewport에서 깨지지 않는 레이아웃 구성

### Step 3. SDK 최소 버전 구현

- 세션 생성
- snapshot 1회 수집
- click/input/scroll/mutation 수집
- batch 전송
- config API 구성

### Step 4. WAS + SQLite 구현

- SQLite 연결
- migration 또는 init schema 구성
- session/event 저장 API 구현
- 조회 API 구현

### Step 5. Replay Viewer 연결

- 저장된 세션 목록 표시
- 세션 선택 후 이벤트 로드
- 기존 snippet replay 로직을 viewer 구조에 맞게 연결

### Step 6. 검증

- `history/replay-validation-checklist-v6.md` 기준 항목 재사용
- v7 기준 privacy/config/iframe placeholder/운영 가드 항목 추가
- 테스트 페이지에서 실제 수집 -> 저장 -> 조회 -> 재생까지 end-to-end 확인

## 8. 우선순위

1. 동작하는 end-to-end 흐름
2. 리플레이 재현 안정성
3. privacy/config 가드
4. 운영 편의 기능
5. UI 완성도 개선

## 9. 주의 사항

- Apple 페이지는 참고용이며 디자인/브랜드/애셋을 직접 복제하지 않는다.
- 테스트 UI는 세션 리플레이 검증 목적에 맞춰 자체 제작한다.
- 초기 DB는 SQLite로 충분히 단순하게 시작한다.
- SDK는 대상 페이지에 삽입되는 코드이므로 전역 오염과 성능 부담을 최소화한다.
- 수집 payload는 개인정보 마스킹을 기본값으로 둔다.
- replay iframe의 script 실행 여부는 보안과 재현성 사이에서 명확히 토글 가능해야 한다.

## 10. 구현된 경로

### 실행 URL

- 테스트 UI: `/test-ui`
- Replay Viewer: `/viewer`
- 기존 MVP 화면: `/index.html`

### 파일 경로

```text
src/replay-db.js
sdk/session-replay-sdk.js
web/test-page/index.html
web/test-page/styles.css
web/test-page/app.js
web/replay-viewer/index.html
web/replay-viewer/styles.css
web/replay-viewer/viewer.js
data/session-replay.sqlite
```

### 구현된 서버 API

```text
POST /api/replay/sessions/start
POST /api/replay/events/batch
POST /api/replay/sessions/end
GET  /api/replay/sessions
GET  /api/replay/sessions/:sessionId
GET  /api/replay/sessions/:sessionId/events
GET  /api/replay/sessions/:sessionId/payload
```

### 테스트 흐름

1. `npm run dev` 실행
2. 브라우저에서 `http://localhost:4173/test-ui` 접속
3. 제품 선택, feature 탭, 모달, 폼 입력, 액세서리 추가, 스크롤 수행
4. `http://localhost:4173/viewer` 접속
5. SQLite에 저장된 세션 선택
6. `Play` 실행 후 snapshot/event/mutation 재생 확인
