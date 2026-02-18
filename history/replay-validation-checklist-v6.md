# Replay Validation Checklist (v6)

## 목적

`Test/session-replay-snippet-v6.js` 기준으로, 재생 시 원본 화면/상호작용/mutation 반영이 정상인지 빠르게 검증하기 위한 체크리스트입니다.

## 사전 준비

- 검증 대상 페이지에서 `window.SessionReplaySnippet.version`이 `6.0.0-snippet`인지 확인
- 동일 세션을 최소 1회 `Start -> Stop -> Download`로 저장
- 비교 기준으로 원본 화면 녹화 또는 스크린샷 확보

## 기록(Recorder) 검증

- [ ] `Start` 클릭 시 상태가 `Recording started.`로 바뀜
- [ ] 클릭/입력/스크롤 후 `Stop` 시 `eventCount`가 0보다 큼
- [ ] 저장된 JSON에 `snapshot` 이벤트가 최소 1개 존재
- [ ] 저장된 JSON에 `event`(click/input/scroll 중 1개 이상) 존재
- [ ] DOM 변경이 있었던 시나리오에서 `mutation` 이벤트가 존재

## 기본 재생(Replayer) 검증

- [ ] `Open Replay` 클릭 시 모달이 열림
- [ ] `Play` 클릭 후 초기 화면이 원본 시작 상태와 유사하게 표시됨
- [ ] 재생 완료 시 상태가 `Replay completed.`로 종료됨
- [ ] `Stop` 클릭 시 즉시 중단되고 상태가 `Replay stopped.`로 변경됨

## 상호작용 재생 검증

- [ ] 클릭 위치 표시(포인터/리플)와 클릭 대상 outline이 보임
- [ ] 입력/변경 이벤트가 폼 필드 값에 반영됨
- [ ] 스크롤 이벤트가 의도한 위치로 이동함
- [ ] `0.5x/1x/2x/4x` 속도 변경이 체감상 정상 반영됨

## Mutation 재생 검증

- [ ] `Mutation OFF`에서 화면 깨짐 없이 기본 이벤트 재생 가능
- [ ] `Mutation ON`에서 DOM 변화(토글, 리스트 증감, 텍스트 변경)가 반영됨
- [ ] 대규모/위험 변동에서도 전체 화면이 빈 화면으로 붕괴되지 않음
- [ ] 동일 JSON를 2회 이상 반복 재생해도 결과가 크게 달라지지 않음

## 파일 선택 UI 검증

- [ ] `파일 선택` 버튼에 배경 음영이 표시됨
- [ ] 버튼 라벨이 가독성 있게 보임(밝은 텍스트 + 둥근 버튼 형태)

## 실패 시 확인 포인트

- `mutation.target` selector가 재생 DOM에서 유효한지 확인
- `childList` mutation의 `addedNodes/removedNodes`와 `targetInnerHTML` 크기 확인
- `Mutation OFF`는 정상인데 `ON`에서만 깨지면 mutation 적용 경로 우선 점검
- 특정 페이지에서만 실패하면 동적 렌더링 타이밍(API/타이머) 차이 여부 확인
