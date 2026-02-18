# Session Replay MVP (Browser)

브라우저에서 동작하는 Session Replay Recorder + Replayer + LLM 분석 MVP입니다.

## 현재 상태 (2026-02-18)

- 실행용 코드(`src`)는 v7 기준으로 업데이트됨
- 스니펫 실험 코드는 `Test/session-replay-snippet-v7.js` 기준으로 유지
- 기록 정책: **snapshot은 시작 시 1회만 기록**
- 재생 정책: mutation 적용 ON/OFF, script 실행 OFF/ON 제어
- 보안/운영 강화:
  - `maskAllInputs` 기본 ON
  - selector 기반 민감 영역 block/mask
  - `maxEvents`, `maxMutationHtmlBytes` 제한
  - `droppedEventCount`, `redactionStats` 집계
- iframe 재생 개선:
  - `iframeSummary` 저장 후 재생 시 src 복원
  - cross-origin iframe은 placeholder 표시(흰 빈칸 대신 원인 가시화)

## 실행 방법

1. 의존성 설치

```bash
npm install
```

2. 환경 변수 설정

```bash
cp .env.example .env
```

`.env`의 `OPENAI_API_KEY`를 실제 값으로 설정합니다.

3. 서버 실행

```bash
npm start
```

4. 브라우저 접속

- `http://localhost:4173`

## 기본 사용 플로우

1. `Start Recording`
2. 사용자 상호작용(클릭/입력/스크롤/탭 등)
3. `Stop Recording`
4. `Download JSON` 또는 `Replay JSON` 업로드
5. `Play Replay`
6. 필요 시 `Mutation ON/OFF`, `Scripts ON/OFF` 전환

## v7 기준 주요 기능

### Recorder

- 이벤트 기록: `click`, `mousemove`, `input`, `change`, `scroll`, `submit`
- 내비게이션 기록:
  - `hashchange`, `popstate`, `beforeunload`, `pagehide`, `pageshow`, `visibilitychange`
  - `history_pushstate`, `history_replacestate`, `navigation_intent`
- 상호작용 intent marker 기록(`intent_marker`)
- privacy 마스킹/차단 정책 적용
- 운영 가드:
  - 이벤트 상한 초과 시 드롭
  - 대형 mutation HTML 절단/생략

### Replayer

- snapshot 복원 후 타임라인 재생
- mutation patch 우선 적용 + 제한적 fallback
- 클릭/입력/스크롤/마우스 이동 시각화 + 실제 이벤트 디스패치
- script sandbox 모드 제어
  - 기본: `Scripts OFF`
  - 필요 시 ON 전환 가능(보안 주의)
- iframe 복원
  - same-origin: src 복원 시도
  - cross-origin: placeholder 표시

## 런타임 API (`window.SessionReplayApp`)

- `configure(options)`
- `getConfig()`
- `setReplayMutationMode(enabled)`
- `setReplayScriptMode(enabled)`
- `getPayload()`
- `loadPayload(payload)`

예시:

```js
window.SessionReplayApp.configure({
  privacy: {
    maskAllInputs: true,
    blockSelectors: [".rr-block", "[data-private='true']"],
    maskTextSelectors: [".rr-mask", ".clarity-mask"]
  },
  replay: {
    scriptMode: "off" // "off" | "on"
  },
  limits: {
    maxEvents: 20000,
    maxMutationHtmlBytes: 120000
  }
});
```

## payload 주요 필드

```json
{
  "recordingConfig": {
    "privacy": { "maskAllInputs": true },
    "limits": { "maxEvents": 20000, "maxMutationHtmlBytes": 120000 }
  },
  "droppedEventCount": 0,
  "redactionStats": {
    "maskedInputEvents": 0,
    "maskedMutationValues": 0,
    "redactedSerializedNodes": 0,
    "blockedNodeEvents": 0,
    "blockedMutations": 0,
    "truncatedMutationHtml": 0
  }
}
```

## 트러블슈팅

- Replay에서 광고/외부 프레임이 안 보임
  - cross-origin iframe 내부 DOM은 재생 불가
  - v7에서는 placeholder로 대체 표시됨
- Replay에서 스크립트 기반 동작이 재현되지 않음
  - `Scripts OFF` 상태일 수 있음
  - 필요 시 `Scripts ON`으로 전환(보안 위험 인지)

## 프로젝트 구조

- `index.html`: 테스트 UI
- `src/main.js`: UI/런타임 설정/API 연결
- `src/recorder.js`: 기록 로직
- `src/replayer.js`: 재생 로직
- `src/behavior-analyzer.js`: 행동 요약 + LLM 프롬프트 생성
- `src/server.js`: Express + OpenAI/LangChain 분석 API
- `Test/session-replay-snippet-v7.js`: DevTools 스니펫 최신 버전
- `history/`: 버전 변경 이력
- `Reference/Reference.md`: 조사 레퍼런스(Clarity, rrweb, sandbox 등)

## 관련 문서

- 히스토리 인덱스: `history/README.md`
- v7 작업 이력: `history/session-replay-snippet-v7.md`
- 레퍼런스: `Reference/Reference.md`
