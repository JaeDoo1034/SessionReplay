# SDK Flush Concurrency and Queue Order Ready4Act

## 상태

아직 코드 수정하지 않은 개선 후보입니다.

현재 `sdk/session-replay-sdk.js`의 `flush()` 로직은 단일 flush 흐름에서는 queue 순서를 보존합니다. 다만 동시에 여러 flush가 겹칠 경우 batch 전송/저장 순서가 뒤섞일 가능성이 있어, 향후 `isFlushing` lock 또는 promise chain 방식으로 직렬화하는 개선이 필요합니다.

## 현재 구현

현재 `flush()`는 queue에서 batch 대상 이벤트를 복사하는 것이 아니라, 원본 queue에서 꺼내면서 제거합니다.

```js
var events = state.queue.splice(0, config.maxBatchSize);
```

예:

```text
queue = [A, B, C, D, E]

flush 시작
events = [A, B]
queue  = [C, D, E]
```

전송이 성공하면 `[A, B]`는 서버에 저장되고 queue에서는 제거된 상태로 남습니다.

전송이 실패하면 꺼냈던 이벤트를 queue 앞쪽에 다시 복원합니다.

```js
state.queue = events.concat(state.queue).slice(0, config.maxEvents);
```

실패 시:

```text
events = [A, B]
queue  = [C, D, E]

복원 후
queue = [A, B, C, D, E]
```

따라서 단일 flush 실패/복원 흐름에서는 queue 순서가 깨지지 않습니다.

## 문제 가능성이 있는 지점

현재 구현에는 동시에 여러 flush가 실행되는 것을 막는 lock이 없습니다.

flush가 호출되는 지점:

- 주기 타이머: `setInterval(... flush ...)`
- queue가 `maxBatchSize` 이상이 되었을 때 `record()`에서 즉시 flush
- `pause()`에서 `flushAll()`
- `save()`에서 `flushAll()`
- `pagehide`에서 `sendBeacon`으로 남은 queue 전송

이 중 일부가 거의 동시에 실행되면 여러 flush가 같은 시점에 진행될 수 있습니다.

## 순서가 꼬일 수 있는 예시

초기 상태:

```text
queue = [A, B, C, D, E, F]
```

`flush1` 실행:

```text
flush1 events = [A, B]
queue = [C, D, E, F]
```

`flush1`이 아직 서버 응답을 기다리는 중에 `flush2` 실행:

```text
flush2 events = [C, D]
queue = [E, F]
```

만약 `flush2`가 먼저 성공하고 `flush1`이 나중에 실패하면:

```text
서버에는 [C, D]가 먼저 저장됨
queue에는 [A, B, E, F]가 복원됨
```

이 경우 클라이언트 queue 안에서 남은 이벤트 순서는 앞쪽 복원으로 유지되지만, 서버 저장 순서는 원래 발생 순서와 다를 수 있습니다.

## 영향 범위

### 단일 flush 기준

문제 없음.

```text
splice로 꺼냄
성공하면 제거 유지
실패하면 앞쪽 복원
```

이 흐름만 보면 순서 보장이 됩니다.

### concurrent flush 기준

주의가 필요합니다.

가능한 영향:

- 서버에 batch 저장 순서가 달라질 수 있음
- 조회 쿼리가 `sequence` 또는 `event_time` 기준으로 정렬하지 않으면 viewer timeline이 흔들릴 수 있음
- 실패 batch가 복원된 뒤 이후 batch보다 늦게 전송될 수 있음
- 같은 이벤트가 재전송될 가능성은 낮지만, 서버 idempotency가 없으면 네트워크 애매한 실패에서 중복 저장 가능성도 남음

## 현재 완화 요소

각 event에는 순서를 복구할 수 있는 정보가 있습니다.

- `id`: SDK 세션 내부 sequence
- `at`: 실제 발생 시각
- `timeOffsetMs`: 녹화 시작 후 offset

따라서 서버와 viewer가 이 값을 기준으로 정렬하면 저장 순서가 약간 뒤섞여도 timeline을 어느 정도 복구할 수 있습니다.

다만 현재 replayer는 전달받은 `payload.events` 순서에 의존하는 부분이 크기 때문에, payload 구성 단계에서 정렬이 중요합니다.

## 개선 방향

### 1. isFlushing lock 추가

가장 단순한 개선입니다.

```js
if (state.isFlushing) {
  return state.flushPromise || Promise.resolve({ inserted: 0 });
}

state.isFlushing = true;
state.flushPromise = doFlush().finally(() => {
  state.isFlushing = false;
  state.flushPromise = null;
});
```

장점:

- 동시에 여러 flush가 queue를 splice하지 않음
- batch 순서가 안정됨
- 구현 난이도가 낮음

주의:

- flush 중 새 이벤트가 들어올 수 있으므로, 현재 batch 완료 후 queue가 남아 있으면 다음 flush가 이어져야 함

### 2. Promise chain으로 flush 직렬화

flush 요청을 하나의 chain에 연결합니다.

```js
state.flushChain = state.flushChain.then(() => doFlush());
return state.flushChain;
```

장점:

- 여러 flush 요청이 순서대로 처리됨
- `flushAll()`과 일반 flush를 같은 흐름으로 정리 가능

주의:

- 실패 시 chain이 끊기지 않도록 catch 처리 필요

### 3. batch id / ack 도입

각 batch에 고유 id와 sequence range를 담습니다.

예:

```js
{
  batchId: "b_...",
  firstSequence: 1,
  lastSequence: 80,
  events: [...]
}
```

장점:

- 서버에서 중복 batch 감지 가능
- 저장 품질 진단 가능
- viewer에서 누락 sequence 확인 가능

주의:

- DB schema 또는 unique key 설계가 필요할 수 있음

### 4. 서버 저장/조회 정렬 보강

payload 조회 시 반드시 발생 순서 기준으로 정렬합니다.

권장 정렬 기준:

```text
event_time ASC, sequence ASC, id ASC
```

또는 SDK sequence가 명확하면:

```text
sequence ASC
```

장점:

- 서버 저장 순서가 조금 어긋나도 viewer timeline 안정화
- replayer가 payload 순서에 의존해도 입력 순서가 정리됨

## 우선순위

권장 우선순위:

1. `flush()` 직렬화
2. payload 조회 정렬 확인
3. batch id / ack 설계
4. offline queue 또는 IndexedDB backup과 함께 재전송 구조 고도화

## 결론

현재 `flush()`의 실패 복원 로직 자체는 순서를 깨뜨리지 않습니다.

문제 가능성은 `splice()`와 복원 방식이 아니라, 여러 flush가 동시에 실행될 수 있다는 점입니다.

따라서 향후 조치 방향은 다음과 같습니다.

> queue에서 batch를 꺼내는 `flush()` 실행을 직렬화하고, 서버 조회 시 sequence/time 기준 정렬을 보장한다.
