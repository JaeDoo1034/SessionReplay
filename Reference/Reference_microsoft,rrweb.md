## v7 개선 점검 및 재구성 계획 (Clarity + rrweb 기준, 재현도 우선)

### 요약
현재 `Test/session-replay-snippet-v7.js`는 v4 기반으로 단순/안정 구조를 유지하지만, Clarity/rrweb 관점에서 보면 `개인정보 보호`, `재현 신뢰성`, `운영 제어`가 부족합니다.  
사용자 선택 우선순위는 `재현도 우선`으로 고정하고, 단 **요구사항인 “snapshot 최초 1회”는 유지**하는 방향으로 개선합니다.

### 점검 결과 (현재 상태 기준)
1. `maskInputValue` 기본값이 `false`여서 민감 입력값이 원문으로 기록될 수 있음.  
`Test/session-replay-snippet-v7.js:24`, `Test/session-replay-snippet-v7.js:515`

2. snapshot이 시작 시 1회만 존재하여, SPA 동적 변경이 누적되면 replay drift(원본과 상태 불일치) 복구 지점이 없음.  
`Test/session-replay-snippet-v7.js:545`

3. replay iframe sandbox가 스크립트 실행 허용으로 고정되어 있어 환경에 따라 보안 리스크가 큼(특히 `allow-scripts` + `allow-same-origin`).  
`Test/session-replay-snippet-v7.js:884`

4. mutation 기록/재생이 대용량 DOM 변화에서 비용이 크고, selector 불안정 시 적용 실패 가능성이 있음.  
`Test/session-replay-snippet-v7.js:621`, `Test/session-replay-snippet-v7.js:1106`

5. 운영 안전장치(이벤트 상한, dropped count, payload 크기 가드)가 없음.  
`Test/session-replay-snippet-v7.js:577`

### 공개 API/인터페이스 변경안
1. `window.SessionReplaySnippet.configure(options)` 추가  
- `privacy.maskAllInputs` (default `true`)  
- `privacy.blockSelectors` (default Clarity/rrweb 호환 selector 세트)  
- `privacy.maskTextSelectors`  
- `replay.scriptMode` (`off|on`, default `off`)  
- `limits.maxEvents` (default `20000`)  
- `limits.maxMutationHtmlBytes` (default `120000`)

2. `window.SessionReplaySnippet.getConfig()` 추가

3. payload 스키마 확장  
- `recordingConfig`  
- `droppedEventCount`  
- `redactionStats`

### 구현 설계 (결정 완료)
1. Recorder 프라이버시 계층 추가  
- 기본값을 `maskInputValue=true`로 변경.  
- rrweb의 `maskAllInputs`, `blockClass/maskTextSelector` 개념을 반영해 selector 기반 차단/마스킹 적용.  
- `mutation.oldValue/newValue`, `serializeNode.outerHTML`도 민감 노드면 `[redacted]` 처리.

2. 단일 snapshot 제약 하 재현도 보강  
- snapshot은 **초기 1회 유지**.  
- 대신 `interaction-intent marker`를 추가해 클릭/입력 이후 mutation window를 그룹화하고 replay에서 우선 적용 순서를 안정화.  
- mutation 적용 실패 시 fallback 경로를 명시적으로 분리(현재 target-innerHTML 덮어쓰기 남용 방지).

3. iframe/광고 영역 처리 강화  
- Clarity 한계와 동일하게 cross-origin iframe 내부 DOM은 직접 재현하지 않음(불가).  
- iframe `src/currentSrc` 메타 저장 및 replay 시 복원.  
- 복원 실패 시 “3rd-party frame placeholder”를 렌더해 빈 흰칸 대신 원인 가시화.

4. replay script mode를 런타임 제어로 복원  
- 현재 고정 sandbox를 제거하고 `scriptMode`에 따라 동적 구성.  
- 기본값 `scripts OFF`, 필요 시 UI 토글로 ON.  
- ON 전환 시 상태창에 보안 경고 메시지 출력.

5. 운영 안정성 추가  
- `maxEvents` 초과 시 이벤트 드롭 + 카운터 집계.  
- mutation payload 크기 상한 초과 시 축약 저장(`targetInnerHTML` 생략 + 통계 이벤트).  
- `mousemove` 샘플링 유지, scroll/input debounce 도입.

### 테스트 케이스 및 수용 기준
1. 개인정보 보호  
- password/email/tel/input name(token/secret) 값이 payload에서 평문으로 남지 않을 것.  
- 민감 selector 영역 텍스트/DOM이 마스킹될 것.

2. 재현도  
- 버튼 클릭 후 동적 콘텐츠 변경(React/Vue SPA)에서 replay 결과가 원본과 동일할 것.  
- mutation ON/OFF 모두 오류 없이 동작할 것.

3. iframe/광고  
- cross-origin 광고 iframe에서 “빈 흰칸” 대신 복원 또는 placeholder가 표시될 것.  
- same-origin iframe은 src 복원 후 정상 표시될 것.

4. 보안 모드  
- scripts OFF에서 inline handler/script 태그 실행이 차단될 것.  
- scripts ON에서 동작은 개선되되, 경고 표시가 노출될 것.

5. 운영성능  
- 대량 세션에서 이벤트 상한 동작 및 `droppedEventCount` 집계가 정확할 것.  
- payload 크기 상한 정책이 적용되어 OOM/브라우저 멈춤이 없을 것.

### 가정 및 기본값
1. 우선순위는 `재현도 우선`으로 확정.  
2. snapshot은 요구사항대로 “start 시 1회”만 유지.  
3. cross-origin iframe 내부 DOM 완전 재현은 기술적으로 불가하므로 복원/placeholder 전략을 채택.  
4. 기본 배포값은 `scripts OFF`, 디버그 시에만 ON.

### 참고 소스
1. rrweb guide (privacy/masking/options): https://github.com/rrweb-io/rrweb/blob/master/guide.md  
2. Microsoft Clarity data masking: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-data-masking  
3. Microsoft Clarity API behavior (sampling/session constraints): https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api  
4. Clarity 3rd-party iframe limitation 맥락: https://learn.microsoft.com/en-us/answers/questions/1425604/clarity-playback-issue-with-third-party-dom-elemen  
5. MDN iframe sandbox: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
