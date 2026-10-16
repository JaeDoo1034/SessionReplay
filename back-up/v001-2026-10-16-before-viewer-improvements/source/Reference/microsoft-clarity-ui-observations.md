# Microsoft Clarity UI Observations

## 참고 출처

- Microsoft Clarity 공식 사이트: `https://clarity.microsoft.com/`
- Recordings overview: `https://learn.microsoft.com/en-us/clarity/session-recordings/recordings-overview`
- Heatmaps overview: `https://learn.microsoft.com/en-us/clarity/heatmaps/heatmaps-overview`
- Insights overview: `https://learn.microsoft.com/en-us/clarity/insights/insights-overview`

## 핵심 화면 구조

Microsoft Clarity의 session recordings 화면은 크게 세 영역으로 이해할 수 있다.

1. 좌측 세션 목록
2. 중앙/우측 inline replay player
3. 필터/세그먼트 및 AI/Insight 보조 영역

좌측 목록은 최신 세션을 카드 형태로 보여주며, 각 카드에는 entry/exit page, referral URL, clicks, user ID, device type 같은 메타데이터가 포함된다.

우측 player는 선택된 세션을 바로 재생하는 중심 영역이다. 재생, 일시정지, 앞으로 이동 같은 video-style control을 제공하고, favorite/share/label/heatmap 연결 같은 액션을 함께 제공한다.

필터와 segment는 recordings를 좁혀 보기 위한 핵심 장치다. Clarity는 목록 전체 또는 선택된 recording에 대해 AI 기반 요약을 제공하는 방향으로 제품을 확장하고 있다.

## Session Recordings 특징

- 실제 영상 파일이 아니라 HTML과 사용자 행동 이벤트를 기반으로 세션을 시각적으로 재구성한다.
- scroll, click/tap, page/screen visit 같은 이벤트를 기반으로 사용자의 여정을 보여준다.
- 사용자가 무엇을 하려 했는지, 어떤 콘텐츠를 핵심으로 봤는지, 어떤 버그/마찰이 있었는지, CTA를 놓쳤는지 같은 질문에 답하는 데 초점이 있다.
- 세션 목록 카드에는 선택에 필요한 메타데이터가 밀도 있게 담긴다.

## Heatmaps 특징

- click maps, scroll maps, area maps, conversion maps, attention maps를 제공한다.
- click map은 단순 절대 좌표보다 element 기반 click 분석을 강조한다.
- click map 유형에는 all clicks, dead clicks, rage clicks, error clicks, first clicks, last clicks가 있다.
- scroll map은 사용자들이 어디까지 내려봤는지, average fold가 어디인지 보여준다.
- area map은 선택한 영역 안의 클릭 총량을 보여준다.
- conversion map은 e-commerce 전환과 클릭 요소의 관계를 보여준다.
- attention map은 페이지 구역별 체류 시간을 시각화한다.

## Insights 특징

- ML 기반 필터와 추천으로 중요한 페이지/세션 패턴을 먼저 드러내는 방향이다.
- 모든 interaction을 사용자가 직접 뒤지는 대신, 중요한 recording과 heatmap 패턴을 표면화한다.
- 제품 사용자로는 designer, product manager, marketer, web developer를 상정한다.

## 현재 SessionReplay viewer에 적용할 방향

- 좌측 세션 목록 카드에 metadata badge를 추가한다.
  - duration
  - event count
  - click count
  - submit count
  - friction/rage signal
  - status
- 우측 상단에 AI summary/customer pattern 카드를 배치한다.
- replay player 주변에는 탭형 보조 패널을 둔다.
  - Timeline
  - Events
  - Metrics
- 단순 재생 화면이 아니라, “어떤 세션을 먼저 봐야 하는지”가 보이는 분석 화면으로 만든다.
- Heatmap은 아직 구현하지 않더라도 click/scroll/attention/conversion map으로 확장 가능한 시각 구조를 준비한다.
