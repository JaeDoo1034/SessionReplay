# Session Replay MVP (Browser)

웹 브라우저에서 동작하는 Session Replay Recorder + Replayer 최소 구현입니다.

## 1) Node.js 설치 (macOS)
아래 중 한 가지 방법만 선택하면 됩니다.

### 방법 A: Homebrew
```bash
brew install node
node -v
npm -v
```

### 방법 B: nvm (여러 버전 관리 권장)
```bash
brew install nvm
mkdir -p ~/.nvm
export NVM_DIR="$HOME/.nvm"
source "$(brew --prefix nvm)/nvm.sh"
nvm install --lts
nvm use --lts
node -v
npm -v
```

권장 버전: Node.js LTS (v20 이상)

## 2) 실행 방법
빌드 없이 정적 파일로 동작하므로 아래 둘 중 하나를 사용하면 됩니다.

### 빠르게 실행 (Python 내장 서버)
```bash
python3 -m http.server 4173
```
브라우저에서 `http://localhost:4173` 접속

### Node로 실행하고 싶다면
```bash
npx serve . -l 4173
```
브라우저에서 `http://localhost:4173` 접속

## 3) Recorder 사용
1. `Start Recording` 클릭
2. 입력/클릭/스크롤/DOM 변경(예: `Append Item`) 수행
3. `Stop Recording` 클릭
4. `Download JSON` 클릭

## 4) Replayer 사용
1. `Replay JSON`에서 방금 저장한 파일 선택
2. 속도(`0.5x/1x/2x/4x`) 선택
3. `Play Replay` 클릭
4. `Stop Replay`로 중단 가능

## 구현 범위
- DOM 변화 기록: `MutationObserver`
- 이벤트 기록: `click`, `mousemove`, `input`, `change`, `scroll`, `submit`
- 저장 방식: 로컬 JSON 다운로드
- 재생 방식: `snapshot` 복원 후 `mutation/event` 타임라인 적용
- 클릭 재생: 기록된 `x/y` 좌표에 포인터 + 리플 이펙트 표시
- 이동 경로 재생: `mousemove` 좌표를 기본 40ms 샘플링으로 기록해 포인터 trail 표시
- 좌표 정합: 기록 시점 `viewportWidth/viewportHeight`를 함께 저장하고, replay 화면 크기에 맞춰 좌표 스케일링
- 좌표 정합(강화): 가능하면 `targetOffsetX/Y + targetWidth/Height`를 이용해 타겟 요소 기준 상대좌표로 우선 매핑

## 이벤트 데이터 구조
```json
{
  "version": 1,
  "createdAt": "2026-02-17T16:00:00.000Z",
  "page": { "href": "...", "userAgent": "..." },
  "eventCount": 123,
  "events": [
    {
      "id": 1,
      "type": "snapshot | mutation | event | meta",
      "at": 1234.56,
      "timeOffsetMs": 12.34,
      "data": {}
    }
  ]
}
```

## 파일 구조
- `index.html`: 테스트 UI + Recorder/Replayer 제어
- `src/recorder.js`: 기록 로직
- `src/replayer.js`: 재생 로직
- `src/main.js`: UI 이벤트 연결, JSON 입출력

## 동작 플로우 (Mermaid)

### Recorder 상세 플로우
```mermaid
flowchart TD
  A[사용자: Start Recording 클릭] --> B[recorder.start]
  B --> C[상태 초기화\nisRecording=true\nstartedAt=performance.now\nevents=[]\nsequence=0\nlastMousemoveAt=0]
  C --> D[초기 스냅샷 기록\nsnapshot: html/viewport/url]
  D --> E[MutationObserver attach\nhtml 전체 감시]
  E --> F[Event Listener attach\nclick/mousemove/input/change/scroll/submit]

  F --> G{브라우저 이벤트 발생}
  G -->|click| H[click 데이터 구성\nx,y,button,target path,viewportW/H\n+target 상대좌표 메타]
  G -->|mousemove| I{샘플링 간격 체크\nnow-lastMousemoveAt >= mousemoveSampleMs}
  I -->|No| I1[드롭]
  I -->|Yes| I2[mousemove 기록\nx,y,target path,viewportW/H\n+target 상대좌표 메타]
  G -->|input/change| J[value 추출\nmask 옵션 반영]
  G -->|scroll| K[scrollTop/scrollLeft 추출]
  G -->|submit| L[defaultPrevented 기록]

  E --> M{DOM 변경 발생}
  M --> N[mutation 기록\nmutationType/target/oldValue/newValue\nchildList면 targetInnerHTML 포함]

  H --> O[record type=event]
  I2 --> O
  J --> O
  K --> O
  L --> O
  N --> P[record type=mutation]

  O --> Q[events.push\nid++, at, timeOffsetMs, data]
  P --> Q

  R[사용자: Stop Recording 클릭] --> S[recorder.stop]
  S --> T[Observer/listener detach]
  T --> U[meta: recording_stopped 기록]
  U --> V[getPayload\nversion/page/eventCount/events]
  V --> W[Download JSON]
```

### Replayer 플로우
```mermaid
flowchart TD
  A[사용자: Replay JSON 업로드] --> B[JSON parse]
  B --> C[replayer.load payload]
  C --> D[Play 클릭]
  D --> E[replayer.play speed]
  E --> F[snapshot 이벤트 찾기]
  F --> G[iframe.srcdoc에 snapshot html 주입\nscript 제거]
  G --> H[iframe onload 후 타임라인 시작]
  H --> I[replayEvents = mutation + event]

  I --> J{다음 이벤트}
  J -->|mutation| K[applyMutation\nchildList: targetInnerHTML\nattributes: set/remove\ncharacterData: textContent]
  J -->|event: input/change| L[target.value 적용]
  J -->|event: scroll| M[window/element scroll 적용]
  J -->|event: click| N[좌표 매핑 후 포인터+리플\n타겟 outline]
  J -->|event: mousemove| O[좌표 매핑 후 포인터 이동\ntrail 렌더링]

  N --> P[다음 이벤트 delay 계산\n(next.timeOffset-current.timeOffset)/speed]
  O --> P
  K --> P
  L --> P
  M --> P
  P --> J

  J -->|끝| Q[Replay completed]
  R[Stop 클릭] --> S[clearTimeout + 상태 reset]
```

### 포인터 좌표 매핑 플로우
```mermaid
flowchart TD
  A[mapPointerPosition] --> B{target 상대좌표 메타 존재?}
  B -->|Yes| C{상대좌표 사용 가능?\n- target != html/body\n- target 크기 ~= 전체 뷰포트 아님}
  C -->|Yes| D[target.getBoundingClientRect 기준\nx=left+width*ratio\ny=top+height*ratio]
  C -->|No| E[뷰포트 비율 매핑\nx=(recorded x / recorded viewportW)*replayW\ny=(recorded y / recorded viewportH)*replayH]
  B -->|No| E
  D --> F[포인터 좌표 반환]
  E --> F
```
