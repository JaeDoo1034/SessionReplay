# session-replay-snippet v7

## 요약

v7은 v4 안정 구조를 기준으로 다시 재구성한 뒤, Clarity/rrweb 기준을 반영해  
`재현도 우선` + `보안/운영 안전장치`를 같이 강화한 버전입니다.

## 작업 배경

- v6 계열에서 재현 이슈가 반복됨
  - Replay 시 광고/외부 iframe 영역이 흰색 빈칸으로 보이는 문제
  - Replay 시 버튼 클릭 이후 동적 콘텐츠 변경이 충분히 따라오지 않는 문제
- 요구사항
  - v4 스타일 기반으로 재구성
  - snapshot은 시작 시 1회만 유지
  - 스크립트 실행 모드 제어 + 파일 선택명 UI 표시

## 작업 이력 (2026-02-18)

1. v4 기반 재구성
- 구조를 단순화하고 snapshot 정책을 `초기 1회`로 고정

2. Replay 실행 옵션 보강
- sandbox 정책을 런타임에서 제어하도록 변경
- `Scripts OFF/ON` 토글과 보안 경고 메시지 추가

3. UI 개선
- 파일 업로드 시 스니펫 패널에 `Selected file: <name>` 표시

4. Clarity/rrweb 기준 반영
- `configure()` / `getConfig()` API 추가
- 기본값을 `maskAllInputs=true`로 변경
- selector 기반 `block/mask` 정책 추가
- mutation 값/직렬화 노드 redaction 통계 수집
- 이벤트/DOM 폭증 대비 `maxEvents`, `maxMutationHtmlBytes` 한도 추가

5. 재현 안정성 강화
- 클릭/입력 흐름 추적용 `intent_marker` 이벤트 추가
- mutation 적용은 patch 우선, 실패 시 제한적 fallback
- iframe 요약(`iframeSummary`) 저장 및 replay 시 src 복원
- cross-origin/광고 프레임은 placeholder 렌더링으로 원인 가시화

## 주요 변경 요약

- 파일: `Test/session-replay-snippet-v7.js`
- 버전 문자열: `7.0.0-snippet`
- snapshot 정책: `start 시 1회`
- 신규 공개 API
  - `configure(options)`
  - `getConfig()`
  - `setReplayScriptMode(enabled)` (내부적으로 `replay.scriptMode` 반영)
- payload 확장
  - `recordingConfig`
  - `droppedEventCount`
  - `redactionStats`

## 검증

- 문법 점검: `node --check Test/session-replay-snippet-v7.js` 통과
