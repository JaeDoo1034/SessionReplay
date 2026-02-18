# session-replay-snippet v6

## 요약

v6는 v4 안정 구조를 기준으로 다시 시작한 버전입니다.  
v5에서 발생한 화면 깨짐/빈 영역 이슈를 줄이기 위해 mutation 재생 방식을 단순하고 안전하게 재설계했습니다.

## 핵심 변경

- v4 기반으로 리베이스
  - 복잡한 주기 스냅샷/스크립트 모드/iframe 복원 로직은 v6에서 제외
- `childList` mutation 재생 방식 개선
  - 기존: `target.innerHTML` 통째 교체
  - 변경: `removedNodes`/`addedNodes` 기반 patch 우선 적용
  - patch 적용 실패 시에만 `targetInnerHTML` fallback
- 위험 mutation 가드 유지
  - `html/body` 대상 치환 차단
  - `nth-of-type` 기반 대형 변동은 스킵

## 왜 필요한가

- `innerHTML` 전체 교체는 React/SPA 페이지에서 경로 불일치가 발생하면 큰 영역이 빈 화면으로 바뀌기 쉬움
- patch 방식은 변화된 노드만 다루므로 전체 레이아웃 손상을 줄일 수 있음

## 현재 상태

- 파일: `Test/session-replay-snippet-v6.js`
- 버전 문자열: `6.0.0-snippet`
- 문법 점검: `node --check` 통과
