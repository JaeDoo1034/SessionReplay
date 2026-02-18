# session-replay-snippet v1

## 요약

초기 단일 스니펫 버전입니다. 브라우저 개발자도구 Snippet에서 바로 실행해 세션 기록/재생/행동 분석을 수행할 수 있는 기반을 제공합니다.

## 주요 기능

- 세션 기록:
  - `snapshot`(초기 HTML + viewport)
  - `mutation`(DOM 변화)
  - `event`(click, mousemove, input, change, submit, scroll)
  - 네비게이션 관련 이벤트(`hashchange`, `popstate`, `history.pushState/replaceState` 등)
- 세션 재생:
  - 스냅샷 로드 후 타임라인 기반 이벤트 재생
  - 클릭 포인트/마우스 이동 경로 시각화
  - 입력값, 스크롤 재적용
- 분석:
  - 로컬 행동 요약 생성
  - 서버(`/api/llm-analyze`)에 요약/프롬프트 전송 가능
- 유틸:
  - JSON 다운로드/업로드
  - 스니펫 패널 UI 제공

## 제한 사항 (v1 기준)

- 클릭은 시각 표시 중심으로 동작하며, 사이트별 동적 UI(탭/커스텀 컴포넌트)에서 실제 핸들러 실행이 부족할 수 있음
- 복잡한 사이트에서는 mutation 재적용이 오히려 레이아웃을 깨뜨릴 수 있음
