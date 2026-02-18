# session-replay-snippet v3

## 요약

v3는 재생 정확도와 안정성 개선에 집중한 버전입니다. 특히 화면 깨짐 이슈 대응을 위해 viewport 스케일링과 mutation 적용 토글을 도입했습니다.

## v2 대비 주요 개선

- Mutation 재생 토글 추가
  - 기본값 `OFF`로 시작
  - UI 버튼 `Mutation OFF/ON` 제공
  - API: `setReplayMutationMode(enabled)`
- Replay 뷰포트 스케일링 추가
  - 기록 시점 viewport(`snapshot.data.viewport`)를 기준으로 iframe 스케일 계산
  - 재생 모달에 stage/canvas 레이어 도입
  - 창 크기 변경(`resize`) 시 스케일 재계산
- Replay iframe 제약 완화
  - iframe `sandbox` 속성 제거로 동적 페이지 렌더링 호환성 개선
- 분석 결과 표시 강화
  - 서버 응답에서 `customerResultKo`와 기존 결과를 분리해 표시

## 해결하려던 문제

- 특정 사이트(예: 포털 메인)에서 CSS 배치가 깨지는 현상
- 기록 화면과 재생 화면의 크기 차이로 좌표/레이아웃이 어긋나는 현상
- mutation 재적용이 오히려 화면을 망가뜨리는 케이스

## 주의 사항

- iframe `sandbox` 제거는 재현도에는 유리하지만, 보안 격리는 약해집니다.
