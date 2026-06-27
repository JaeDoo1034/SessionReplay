# Session Replay Masking Policy

## 목적

세션 리플레이는 사용자의 화면, 클릭, 입력, 스크롤, DOM 변경을 저장합니다.

따라서 replay 품질만큼 중요한 것이 개인정보와 민감정보를 기록하지 않는 것입니다.

현재 프로젝트의 마스킹 정책은 다음 목표를 갖습니다.

- 입력값 원문을 저장하지 않는다.
- 민감 영역으로 지정된 DOM은 snapshot/replay 이벤트에서 제거하거나 `[redacted]`로 대체한다.
- replay 제어 UI처럼 분석 대상이 아닌 내부 UI는 기록 대상에서 제외한다.
- 어떤 마스킹이 발생했는지 `redactionStats`로 집계한다.

## 적용 위치

현재 마스킹 정책은 두 계층에 있습니다.

### 배포용 태깅 SDK

파일:

- `sdk/session-replay-sdk.js`

Vercel 배포된 test UI에서 실제로 사용하는 SDK입니다.

`web/test-page/index.html` 하단에서 다음처럼 삽입됩니다.

```html
<script
  src="/sdk/session-replay-sdk.js"
  data-project-id="finance-demo"
  data-user-id="local-tester"
  data-auto-start="false">
</script>
```

### 개발/스니펫용 Recorder

파일:

- `src/recorder.js`
- `src/main.js`

초기 스니펫/로컬 replay 실험에서 쓰던 recorder입니다.

기본 정책은 SDK와 유사하지만, `src/recorder.js` 쪽은 rrweb/Clarity 호환 selector를 조금 더 포함합니다.

## 기본 설정

배포용 SDK의 기본값은 다음과 같습니다.

```js
maskAllInputs: true
blockSelectors: [
  ".sr-block",
  "[data-sr-block='true']",
  "[data-private='true']",
  "[data-sensitive='true']"
]
maskTextSelectors: [
  ".sr-mask",
  "[data-sr-mask='true']",
  "[data-clarity-mask='true']",
  "[data-rr-mask='true']"
]
```

의미는 다음과 같습니다.

- `maskAllInputs`: input/textarea 입력값을 기본적으로 마스킹
- `blockSelectors`: 해당 영역 전체를 기록에서 제외하거나 redacted 처리
- `maskTextSelectors`: 해당 영역의 텍스트만 마스킹

## Test UI의 현재 사용 예

test UI의 세션 제어 팝업은 실제 사용자 행동 분석 대상이 아닙니다.

그래서 다음처럼 `data-sr-block="true"`가 붙어 있습니다.

```html
<button id="session-popover-toggle" data-sr-block="true">...</button>
<aside id="session-popover" data-sr-block="true">...</aside>
```

이 영역에서 발생한 클릭, 입력, DOM 변경은 replay payload에 들어가지 않거나 redacted 처리됩니다.

## 입력값 마스킹

### input/change 이벤트

SDK는 `input`, `change` 이벤트를 기록할 때 실제 값을 그대로 저장하지 않습니다.

`maskAllInputs`가 `true`이면 입력값은 `*`로 대체됩니다.

예시:

```text
원본: 123456
저장: ******
```

배포용 SDK의 `maskValue()`는 최대 12자까지만 `*`를 남깁니다.

```text
원본: very-long-sensitive-value
저장: ************
```

이렇게 하면 사용자가 입력했다는 사실과 대략적인 길이는 알 수 있지만, 원문 값은 저장하지 않습니다.

### select 값

`src/recorder.js` 기준으로 `select`는 일반적으로 선택값을 유지합니다.

다만 select 자체가 민감 영역 안에 있으면 선택값을 제거하거나 redacted 처리할 수 있습니다.

## 텍스트 마스킹

`maskTextSelectors`에 매칭되는 영역은 텍스트가 마스킹됩니다.

사용 예:

```html
<p class="sr-mask">홍길동 010-1234-5678</p>
<span data-sr-mask="true">민감한 안내 문구</span>
```

snapshot 또는 mutation serialization 과정에서 해당 텍스트는 원문 대신 마스킹 값으로 바뀝니다.

배포용 SDK에서는 text node를 `maskValue()`로 처리하거나, mutation 값은 `[redacted]`로 대체합니다.

`src/recorder.js`의 `maskSensitiveText()`는 text node를 `[redacted]`로 대체합니다.

## Block 정책

`blockSelectors`에 매칭되는 영역은 더 강하게 보호합니다.

사용 예:

```html
<section class="sr-block">기록하면 안 되는 영역</section>
<div data-private="true">개인정보 영역</div>
<div data-sensitive="true">민감정보 영역</div>
```

처리 방식:

- 사용자 이벤트 target이 block 영역 안이면 이벤트 기록을 건너뜀
- mutation target이 block 영역 안이면 mutation 기록을 건너뜀
- snapshot 생성 시 block node를 제거하거나 `data-sr-redacted="blocked"`로 표시
- serialize된 added/removed node가 민감하면 `outerHTML: "[redacted]"`로 저장

## Snapshot 마스킹

녹화 시작 시 SDK는 초기 화면 HTML snapshot을 저장합니다.

이때 다음 처리가 적용됩니다.

- `<script>` 제거
- block selector 영역 제거 또는 redacted 처리
- input/textarea 값 마스킹
- mask text selector 영역 텍스트 마스킹

목적은 replay에 필요한 화면 구조를 남기되, 민감 값과 내부 제어 UI를 제거하는 것입니다.

## Mutation 마스킹

`mutation` 이벤트는 화면 변경을 replay하기 위해 중요하지만, 민감정보가 들어갈 가능성이 큽니다.

현재 정책:

- mutation target이 block 영역이면 mutation 기록 생략
- mutation target이 mask 영역이면 old/new value를 `[redacted]` 처리
- added/removed node가 민감하면 `outerHTML: "[redacted]"`
- mutation HTML이 너무 크면 저장하지 않고 truncate 통계 증가

배포용 SDK의 mutation HTML 제한:

```text
120000 characters
```

`src/recorder.js` 기준 mutation HTML 제한:

```text
120000 bytes
```

## Click 이벤트 마스킹

click 이벤트는 좌표와 target path를 저장합니다.

저장 정보 예:

- target selector/path
- x/y 좌표
- viewport width/height
- mouse button
- target text 일부

단, target이 block 영역이면 click 이벤트 자체를 기록하지 않습니다.

target이 mask text 영역이면 text는 `[redacted]` 처리됩니다.

## Navigation 이벤트 마스킹

현재 navigation 관련 이벤트는 다음 값을 저장합니다.

- `href`
- `pathname`
- `hash`
- history state의 safe JSON
- navigation intent의 anchor href

주의:

URL query string에 개인정보나 token이 들어가면 저장될 수 있습니다.

현재 정책은 DOM/input 중심 마스킹이므로, URL query parameter redaction은 추가 개선 후보입니다.

## 저장되는 마스킹 통계

세션 payload와 DB에는 `redactionStats`가 함께 저장됩니다.

현재 항목:

- `maskedInputEvents`: 입력값이 마스킹된 이벤트 수
- `maskedMutationValues`: mutation old/new value가 redacted 처리된 수
- `redactedSerializedNodes`: serialize 과정에서 node가 redacted 처리된 수
- `blockedNodeEvents`: block 영역에서 발생해 건너뛴 사용자 이벤트 수
- `blockedMutations`: block 영역에서 발생해 건너뛴 mutation 수
- `truncatedMutationHtml`: 너무 커서 저장하지 않은 mutation HTML 수

viewer와 DB에서 이 값은 세션이 얼마나 많이 마스킹되었는지 확인하는 근거로 사용할 수 있습니다.

## DB 저장 위치

마스킹 설정과 통계는 session metadata로 저장됩니다.

SQLite:

- `replay_sessions.recording_config_json`
- `replay_sessions.redaction_stats_json`

Supabase Postgres:

- `replay_sessions.recording_config_json`
- `replay_sessions.redaction_stats_json`

payload 조회 시에는 다음 형태로 포함됩니다.

```json
{
  "recordingConfig": {
    "privacy": {
      "maskAllInputs": true,
      "blockSelectors": ["..."],
      "maskTextSelectors": ["..."]
    }
  },
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

## 권장 사용 규칙

### 1. 세션 리플레이 제어 UI는 항상 block 처리

예:

```html
data-sr-block="true"
```

녹화 시작/중지/저장 버튼, 팝업, 디버그 패널은 고객 행동 분석 대상이 아니므로 기록에서 제외합니다.

### 2. 개인정보가 보이는 영역은 block 우선

주민번호, 계좌번호 전체, 전화번호, 주소, 인증번호, 보안카드, 토큰 등이 들어갈 수 있는 영역은 `mask`보다 `block`이 안전합니다.

예:

```html
<section data-sensitive="true">...</section>
```

### 3. 사용자에게 의미 있는 UI 구조는 남기고 텍스트만 숨기려면 mask 사용

예:

```html
<span data-sr-mask="true">홍길동</span>
```

이 방식은 replay 화면의 레이아웃은 유지하면서 텍스트만 숨길 때 적합합니다.

### 4. input은 기본 마스킹 유지

현재 기본값은 `maskAllInputs: true`입니다.

금융 앱 테스트에서는 이 값을 끄지 않는 것을 권장합니다.

## 현재 한계

현재 구현은 POC 수준의 마스킹 정책입니다.

주의할 점:

- URL query string redaction은 아직 명시적으로 구현되어 있지 않음
- click target path의 `id`, `name`, `aria-label`에 개인정보가 들어가면 노출될 수 있음
- `select` 값은 일반값으로 저장될 수 있음
- 화면 텍스트 전체 자동 PII 탐지는 하지 않음
- 이미지, canvas, iframe 내부 콘텐츠는 제한적으로만 다룸

## 개선 후보

다음 개선을 추가하면 금융권 세션 리플레이에 더 적합해집니다.

### URL redaction

URL에서 다음 query parameter를 자동 제거합니다.

- `token`
- `access_token`
- `refresh_token`
- `code`
- `password`
- `otp`
- `phone`
- `email`
- `account`

### Selector path redaction

`id`, `name`, `aria-label`에 개인정보 패턴이 보이면 stable selector 대신 generic path를 사용합니다.

### PII pattern masking

텍스트 node에서 다음 패턴을 자동 마스킹합니다.

- 전화번호
- 이메일
- 주민등록번호 유사 패턴
- 계좌번호 유사 패턴
- 카드번호 유사 패턴

### 마스킹 미리보기

녹화 시작 전 현재 화면에서 어떤 요소가 block/mask 대상인지 시각적으로 표시하는 디버그 모드를 추가할 수 있습니다.

## 요약

현재 정책은 다음 원칙을 따릅니다.

- 입력값은 기본적으로 원문 저장하지 않음
- 명시적 block 영역은 이벤트와 DOM 변경에서 제외
- 명시적 mask 영역은 텍스트/값만 redacted
- snapshot과 mutation 모두 저장 전 sanitize
- 마스킹 결과는 `redactionStats`로 세션에 저장

따라서 viewer에서 보는 replay는 원본 화면 그대로가 아니라, 개인정보 보호 정책을 통과한 sanitized replay입니다.
