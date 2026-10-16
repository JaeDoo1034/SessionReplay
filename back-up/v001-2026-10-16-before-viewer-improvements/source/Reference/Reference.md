# Session Replay Reference (2026-02-18)

## 1) 오픈소스 Session Replay 후보

### rrweb
- GitHub: https://github.com/rrweb-io/rrweb
- 가이드(설정): https://raw.githubusercontent.com/rrweb-io/rrweb/master/guide.md
- 핵심 포인트
  - 웹 세션을 record/replay 할 수 있는 오픈소스 라이브러리
  - `blockClass`, `maskTextClass`, `maskAllInputs`, `maskInputOptions`, `slimDOMOptions` 같은 개인정보/용량 제어 옵션 제공

### OpenReplay
- GitHub: https://github.com/openreplay/openreplay
- 데이터 마스킹 문서: https://docs.openreplay.com/en/v1.20.0/session-replay/data-masking/
- 핵심 포인트
  - 오픈소스 세션 리플레이 제품군
  - 민감 정보는 브라우저에서 마스킹/제거 후 전송하는 방식을 권장
  - selector 기반으로 마스킹 범위를 세밀하게 지정 가능

### PostHog
- GitHub: https://github.com/PostHog/posthog
- Session Replay 프라이버시 문서: https://posthog.com/docs/session-replay/privacy
- 핵심 포인트
  - 오픈소스 프로덕트 애널리틱스/리플레이 스택
  - `ph-no-capture`, `ph-mask` 등 CSS class 기반 캡처/마스킹 제어
  - 입력값 마스킹(`maskAllInputs`) 및 네트워크 캡처 수준(헤더/바디) 제어 가능

## 2) Best Practice 정리

1. 최소 수집(Data minimization)
- 필요한 이벤트만 수집하고, 민감 영역은 selector로 차단/마스킹
- 입력값은 기본 마스킹, 필요한 필드만 예외 허용

2. 스냅샷 + 증분 이벤트 혼합
- 초기/주기/종료 스냅샷을 두고 이벤트/Mutation을 증분 적용
- 스냅샷을 체크포인트로 사용해 재생 드리프트를 줄임

3. 재생 샌드박스 격리
- replay iframe에 `sandbox`를 적용하고 스크립트 실행은 기본 OFF
- 문서 sanitize 시 `script`, inline handler(`on*`), `javascript:` URL 제거

4. 데이터 보존/용량 상한
- 이벤트 수 상한(max events)과 샘플링 정책을 둬 성능/비용/메모리 리스크를 제한

## 3) 보안 상 주의사항

1. 민감정보 로깅 금지
- OWASP Logging Cheat Sheet 기준으로 비밀번호, 토큰, 세션 식별자 등은 로그/리플레이 payload에 남기지 않아야 함
- 참고: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html

2. iframe sandbox 조합 주의
- MDN 기준 `allow-scripts`와 `allow-same-origin` 동시 사용은 격리 강도를 약화시킬 수 있으므로 목적에 맞게 최소 권한으로 사용
- 참고: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe

3. 네트워크 캡처 기본값 주의
- 요청/응답 바디 캡처는 민감정보 유출 위험이 크므로 기본 OFF, 필요 시 명시적 allowlist로 제한
- 참고: PostHog privacy / OpenReplay data masking 문서

## 4) 조사 기반 v7 개선 반영 내용

대상 파일: `Test/session-replay-snippet-v7.js`

1. 개인정보 보호 기본값 강화
- `maskInputValue` 기본값을 `true`로 변경
- 민감 selector(`SENSITIVE_NODE_SELECTOR`) 기반으로 기록 제외 처리
- 입력값/Mutation value 마스킹 로직 추가

2. 재생 보안 강화
- replay iframe `sandbox` 적용 (`allow-same-origin`, `allow-forms`; scripts는 기본 OFF)
- `setReplayScriptMode()` API와 UI 토글 추가
- sanitize 단계에서 스크립트 태그/inline handler/`javascript:` URL 제거

3. 재생 안정성 강화
- 초기/주기/종료 스냅샷 캡처(`snapshotIntervalMs`)
- base snapshot 선택 로직(첫 의미 이벤트 시점 기준) 도입
- childList patch 우선 + fallback 유지

4. 운영 안정성 강화
- `maxEvents` 상한 및 `droppedEventCount` 추적 추가
- `recordingConfig`를 payload에 포함

## 5) 출처 링크 목록

- rrweb README: https://github.com/rrweb-io/rrweb
- rrweb guide(raw): https://raw.githubusercontent.com/rrweb-io/rrweb/master/guide.md
- OpenReplay README: https://raw.githubusercontent.com/openreplay/openreplay/main/README.md
- OpenReplay Data Masking: https://docs.openreplay.com/en/v1.20.0/session-replay/data-masking/
- PostHog README: https://raw.githubusercontent.com/PostHog/posthog/master/README.md
- PostHog Session Replay Privacy: https://posthog.com/docs/session-replay/privacy
- OWASP Logging Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
- MDN iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
