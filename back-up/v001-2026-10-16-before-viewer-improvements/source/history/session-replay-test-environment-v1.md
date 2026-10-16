# Session Replay Test Environment v1

## 요약

이 문서는 기존 `Test/session-replay-snippet-v*` 단일 파일 실험을 넘어, 실제 서비스형 구조로 확장한 현재 버전의 작업 이력을 정리합니다.

현재 버전은 금융권 앱 형태의 테스트 UI에 태깅 SDK를 삽입하고, WAS 서버와 SQLite DB에 세션 데이터를 저장한 뒤, viewer 화면에서 세션 리플레이와 고객 행동 분석 결과를 함께 확인하는 구조입니다.

## 현재 실행 방법

```bash
npm run dev
```

기본 포트는 `4173`입니다.

- 테스트 UI: `http://127.0.0.1:4173/test-ui`
- 리플레이 viewer: `http://127.0.0.1:4173/viewer`
- SQLite DB: `data/session-replay.sqlite`

LLM 분석을 사용하려면 `.env`에 `OPENAI_API_KEY`가 필요합니다.

## 주요 파일

### 서버 및 DB

- `src/server.js`
  - Express WAS 서버
  - `/test-ui`, `/viewer` 정적 화면 라우팅
  - replay 세션 저장/조회/삭제 API
  - LLM 고객 행동 분석 API
- `src/replay-db.js`
  - SQLite 저장소
  - `replay_sessions`, `replay_events` 테이블 생성
  - 세션 시작/종료, 이벤트 batch 저장, payload 조립, 개별/전체 삭제

### SDK 및 재생

- `sdk/session-replay-sdk.js`
  - 태깅 SDK
  - 대상 페이지에 `<script src="/sdk/session-replay-sdk.js">` 형태로 삽입
  - snapshot, click/input/change/submit/scroll/navigation/mutation/mousemove 수집
  - `Start`, `Stop`, `Save` 흐름 지원
  - `view_state` 커스텀 이벤트로 SPA형 화면 전환 기록
- `src/replayer.js`
  - viewer iframe 안에서 snapshot/event/mutation/view_state 재생
  - Mutation ON/OFF 지원
  - click, input, scroll, navigation, view_state 적용
  - mutation 적용 시 화면 붕괴를 줄이기 위해 위험한 fallback을 제한
- `src/behavior-analyzer.js`
  - 세션 이벤트를 정량 지표로 변환
  - 로컬 고객 유형 후보 및 confidence 산출
  - LLM prompt 생성

### 테스트 UI 및 viewer

- `web/test-page/index.html`
- `web/test-page/styles.css`
- `web/test-page/app.js`
  - 금융권 모바일 앱 스타일 테스트 화면
  - 홈, 상품몰, 상품목록, 혜택몰, 이벤트 상세, 자산/소비 화면 구성
  - 세션 컨트롤은 우측 `Session` 버튼 하나로 통합
  - 패널 내부에서 `Start`, `Stop`, `Save` 기능 분리
  - 추적 이벤트 선택 가능

- `web/replay-viewer/index.html`
- `web/replay-viewer/styles.css`
- `web/replay-viewer/viewer.js`
  - SQLite에 저장된 세션 목록 조회
  - drawer 형태의 세션 목록
  - 좌측 고객 행동 분석 결과, 우측 세션 리플레이 화면
  - 본문 비율은 대략 `1:4`로 리플레이 화면을 크게 배치
  - Behavior metrics는 6개 핵심 지표를 2열 x 3행으로 표시

## 구현된 아키텍처

```text
테스트 UI
  -> SessionReplaySDK
    -> POST /api/replay/sessions/start
    -> POST /api/replay/events/batch
    -> POST /api/replay/sessions/end
      -> SQLite(replay_sessions, replay_events)

Viewer
  -> GET /api/replay/sessions
  -> GET /api/replay/sessions/:sessionId/payload
  -> SessionReplayer iframe 재생
  -> analyzeBehavior 로컬 지표 생성
  -> POST /api/llm-analyze
```

## API 현황

### 화면

- `GET /test-ui`
- `GET /viewer`

### Replay 저장/조회

- `POST /api/replay/sessions/start`
- `POST /api/replay/events/batch`
- `POST /api/replay/sessions/end`
- `GET /api/replay/sessions`
- `GET /api/replay/sessions/:sessionId`
- `GET /api/replay/sessions/:sessionId/events`
- `GET /api/replay/sessions/:sessionId/payload`

### 삭제

- `DELETE /api/replay/sessions/:sessionId`
- `DELETE /api/replay/sessions`
- `POST /api/replay/sessions/delete-all`

viewer 전체 삭제는 `POST /api/replay/sessions/delete-all`을 먼저 호출하고, 실패 시 `DELETE /api/replay/sessions`, 그래도 실패하면 현재 로드된 목록을 개별 삭제하는 fallback을 사용합니다.

### LLM 분석

- `POST /api/llm-analyze`

요청에는 `summary`, `prompt`, `analysisInstructions`를 전달할 수 있습니다.
viewer에서 `Analyze with LLM` 클릭 시 분석 기준을 추가로 입력하는 팝업을 먼저 띄웁니다.

## Test UI 현재 상태

테스트 UI는 Kakao 계열 금융 앱 이미지를 참고해 모바일 금융 앱 형태로 재구성했습니다.

주요 화면:

- 홈
  - 메인 계좌, 잔액, 이체 버튼
  - 상품몰/혜택몰/자산소비 이동 메뉴
  - 추천 서비스, 이벤트성 카드, 최근 활동 로그
- 상품몰
  - 입출금, 예금, 적금, 대출, 청약상품, 펀드, ISA, IRP 카테고리
- 상품목록
  - 최근 본 상품 영역
  - 상품별 한 줄 특징과 금리/상태 pill
  - 상품 상세 dialog
- 혜택몰
  - 포인트 금액
  - 진행 중 이벤트
  - 이벤트 상세 화면
- 자산/소비
  - 총 자산, 소비 요약
  - 자산 구성, 소비 카테고리

## 녹화 컨트롤 정책

초기에는 `Sessions` 버튼, floating `Start` 버튼, 상태 pill이 동시에 있어 UX가 혼란스러웠습니다.

현재는 우측 `Session` 버튼 하나만 유지합니다.

- `Start`
  - 새 세션 생성 또는 저장 후 새 녹화 시작
  - 초기 snapshot 기록
  - 이벤트 listener 및 mutation observer 활성화
- `Stop`
  - 녹화만 중지
  - 아직 세션을 최종 종료 저장하지 않음
  - queue에 남은 이벤트는 flush
- `Save`
  - 중지된 세션을 최종 저장
  - `/api/replay/sessions/end` 호출
  - viewer에서 ended 세션으로 조회 가능

SDK 공개 API:

- `start()`
- `pause()`
- `save()`
- `stop()` (`save()` alias 성격)
- `flush()`
- `track(eventType, data)`
- `configure(options)`
- `setEnabledEvents(events)`
- `getRecordingState()`

## 화면 전환 replay

테스트 UI는 SPA처럼 화면이 전환됩니다.

`web/test-page/app.js`의 `showScreen()`에서 SDK가 recording 상태일 때 아래 이벤트를 명시적으로 기록합니다.

```js
sdk.track("view_state", {
  screenName,
  title,
  activeSelector: `.screen[data-view="${screenName}"]`,
  scrollTop: window.scrollY
});
```

`src/replayer.js`는 `view_state` 이벤트를 받아 해당 screen만 active 처리하고, title/scroll 위치를 복원합니다.

## Viewer 현재 상태

viewer의 현재 목표는 “세션 리플레이 화면을 최대한 크게 보면서 고객 행동 분석을 함께 확인”하는 것입니다.

현재 배치:

- 상단 툴바
  - `세션 목록` 버튼
  - `Replay Viewer` 제목
  - `Test UI` 링크
- 세션 목록
  - 기본 닫힘
  - `세션 목록` 버튼 클릭 시 왼쪽 drawer로 열림
  - 배경 클릭, `x`, `Esc`로 닫힘
  - 세션 선택 시 자동 닫힘
- 본문
  - 좌측: 고객 행동 분석 결과
  - 우측: 세션 리플레이 화면
  - 비율: 대략 `1:4`

## 고객 행동 분석 UI

좌측 분석 패널은 다음 정보를 표시합니다.

- Primary type
- Confidence
- Behavior metrics
- LLM-defined customer type
- Evidence
- Customer definition

Behavior metrics는 시인성을 위해 6개 핵심 지표만 2열 x 3행으로 표시합니다.

- Engagement
- Exploration
- Purchase intent
- Friction
- Form intent
- Conversion

`Bounce risk`는 내부 계산과 LLM prompt 근거에는 남아 있지만, 좌측 패널에서는 공간과 시인성을 위해 제외했습니다.

## Confidence 의미

viewer의 `confidence`는 “이 세션을 해당 고객 유형으로 해석한 확신도”입니다.

엄밀한 통계 확률이라기보다는, 로컬 지표 또는 LLM이 세션 요약을 보고 판단한 신뢰도 점수입니다.

예:

- `confidence: 0.82`
- 현재 수집된 행동 데이터 기준으로 해당 고객 유형 해석이 약 82% 정도 일관된다는 의미

## Mutation replay 개선 내용

Mutation ON 시 replay 화면이 깨지는 문제가 있었습니다.

현재 개선 방향:

- Mutation ON일 때 native click replay 중복 적용을 줄임
- `characterData` mutation은 부모 `textContent`를 무조건 덮어쓰지 않음
- 단순 text-only node에 한해서 제한적으로 적용
- 대규모 childList fallback은 전체 화면을 덮어쓰지 않도록 제한

남은 주의점:

- 복잡한 프레임워크 DOM 변경은 여전히 mutation 적용 순서나 selector 안정성에 영향을 받을 수 있음
- 화면 재현이 깨지면 먼저 `Mutation OFF`로 기본 event replay가 정상인지 확인

## 삭제 기능

viewer 좌측 세션 목록에는 개별 삭제와 전체 삭제가 있습니다.

- 개별 삭제: `DELETE /api/replay/sessions/:sessionId`
- 전체 삭제:
  - `POST /api/replay/sessions/delete-all`
  - fallback `DELETE /api/replay/sessions`
  - fallback 개별 삭제 반복

SQLite에서는 `replay_events`를 먼저 지우고 `replay_sessions`를 지웁니다.

## LLM 분석 개선 내용

초기에는 고정 범주 기반 customer type ranking 느낌이 강했습니다.

현재는 LLM에게 다음 방향으로 요청합니다.

- 정해진 카테고리만 고르지 말 것
- 세션 행동 패턴을 설명하는 고객 유형명을 직접 정의할 것
- 추천보다 “이 고객은 어떤 유형의 고객인지” 정의할 것
- 사용자가 팝업에 입력한 추가 분석 기준을 반영할 것

추가 분석 기준은 서버에서 최대 1200자까지 정리해 prompt에 붙입니다.

## Microsoft Clarity 참고 반영

`Reference/microsoft-clarity-ui-observations.md`와 `Reference/image/`의 스크린샷을 참고했습니다.

반영된 방향:

- viewer는 세션 목록 + replay + 분석 패널 중심
- 세션 목록은 필요할 때 여는 drawer로 이동
- 리플레이 화면을 크게 보고 분석 결과를 보조 패널로 둠
- 히트맵/세션리플레이 영역은 같은 replay frame을 공유하는 방향으로 정리

## 검증 이력

주요 검증:

```bash
node --check src/server.js
node --check src/replay-db.js
node --check sdk/session-replay-sdk.js
node --check web/test-page/app.js
node --check web/replay-viewer/viewer.js
```

SQLite 전체 삭제 함수는 임시 DB로 검증했습니다.

```json
{"before":1,"deleted":1,"after":0}
```

로컬 서버 응답 확인:

- `/test-ui` HTML 최신 반영 확인
- `/viewer` HTML 최신 반영 확인
- `/web/test-page/styles.css` 200 응답 확인
- `/web/replay-viewer/styles.css` 최신 layout 반영 확인

## 현재 known issue / 다음 작업 후보

1. 실제 브라우저 시각 QA 강화
- 브라우저 자동화 연결이 런타임 메타 문제로 한 번 실패했습니다.
- 이후 CSS/HTML/JS는 curl 및 정적 검사 중심으로 검증했습니다.
- 다음 작업에서는 실제 브라우저 screenshot 기준으로 viewer 레이아웃을 더 다듬는 것이 좋습니다.

2. replay iframe scaling 정책
- 현재는 iframe 자체를 크게 배치합니다.
- transform scale은 click/heatmap 좌표가 어긋날 수 있어 아직 적용하지 않았습니다.

3. Mutation ON 안정성
- 주요 위험 지점은 완화했지만, 복잡한 DOM 변경에서 추가 QA가 필요합니다.

4. OpenAI API key
- `.env`의 `OPENAI_API_KEY`가 없으면 `/api/llm-analyze`는 실패합니다.
- 로컬 summary와 replay는 API key 없이 동작합니다.

5. DB 파일
- `data/session-replay.sqlite`, `-wal`, `-shm`은 실행 중 생성됩니다.
- 세션 목록이 이상하면 viewer 전체 삭제 또는 DB 파일 상태 확인이 필요합니다.

## 다음 사람이 이어서 볼 순서

1. `history/session-replay-test-environment-v1.md`로 현재 구조 이해
2. `workflow/session-replay-test-environment-workflow.md`로 원래 목표 확인
3. `src/server.js`에서 API와 라우팅 확인
4. `sdk/session-replay-sdk.js`에서 기록 정책 확인
5. `web/test-page/app.js`에서 테스트 UI event/view_state 흐름 확인
6. `web/replay-viewer/viewer.js`에서 viewer 선택/삭제/분석 흐름 확인
7. `src/replayer.js`에서 replay 적용 로직 확인
