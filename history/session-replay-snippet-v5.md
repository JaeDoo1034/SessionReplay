# session-replay-snippet v5

## 요약

v5는 동적 렌더링/CSS 반영 실패를 줄이기 위해 스냅샷 전략을 강화하고, 재생 안정성을 높인 버전입니다.  
2026-02-18 기준으로 `v5.1.0-snippet`까지 반영되었습니다.

## v4 대비 주요 개선

- 주기 스냅샷 도입
  - `snapshotIntervalMs` 기반 정기 스냅샷 저장
  - `captureSnapshotNow()` 수동 캡처 지원
- 지연 스냅샷 강화
  - 클릭/입력/스크롤/내비게이션/헤드 스타일 변경 이후 지연 캡처로 화면 수렴 상태 기록
- 재생 스크립트 모드 도입 (`Scripts OFF/ON`)
  - 기본 `OFF`: replay iframe에서 스크립트 실행 차단 + script/on* 핸들러 제거
  - `ON`: 원본 페이지 스크립트 실행 허용
- 버튼 상호작용 이벤트 기록 확장
  - `click` 외 `dblclick/auxclick/contextmenu/pointer/mouse/touch/keydown/keyup` 기록
  - 키보드 `Enter/Space` 기반 버튼 액션 포함
- mutation 타임라인 포함
  - mutation도 재생 타임라인 순서에 포함
  - `eventType: mutation_*` 기록 및 상태 표시

## 2026-02-18 추가 보정 사항 (v5.1)

- 베이스 스냅샷 선택 개선
  - 의미 있는 사용자 이벤트가 부족한 세션에서도 초기 스냅샷 대신 시각적으로 완성도 높은 스냅샷 선택
  - 기준: stylesheet 수, HTML 길이, 시점
- 타임라인 시작점 보정
  - 선택된 베이스 스냅샷 시점 이전 이벤트 제외
- iframe 빈 영역 대응
  - 스냅샷에 iframe 요약(`src/currentSrc/path`) 저장
  - 재생 시 iframe `src` 복원 + iframe 로드 대기 로직 추가

## 기대 효과

- SPA/동적 스타일 환경에서 재생 시작 화면 품질 향상
- 기록 이벤트 다양화로 사용자 행동 분석 정확도 향상
- 재생 중 콘솔 에러/충돌 감소(기본 Scripts OFF)

## 남은 한계

- 외부 광고/위젯 iframe은 CSP, X-Frame-Options, 3rd-party 정책으로 여전히 빈 영역이 발생할 수 있음
- 원본 앱 런타임 상태(메모리 상태, 비동기 API 응답)는 100% 재현 불가
- `Scripts ON` 시 사이트별 런타임 충돌 가능성 존재
