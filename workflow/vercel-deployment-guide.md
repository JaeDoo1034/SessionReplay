# Vercel Deployment Guide

## 목적

현재 Session Replay 테스트 환경을 Vercel에 배포하기 위한 가이드입니다.

이 프로젝트는 Express WAS, SDK 정적 파일, 테스트 UI, viewer, SQLite 저장소를 하나의 Node.js 서버에서 제공합니다.

## 현재 배포 준비 상태

Vercel 공식 문서 기준으로 Express 앱은 `src/server.js` 같은 server entrypoint를 감지해 Vercel Function으로 실행할 수 있습니다.

현재 프로젝트는 다음을 반영했습니다.

- `src/server.js` 유지
- `package.json`에 Node 22 engine 명시
- `vercel.json`에 Function `includeFiles` 설정 추가
- `/test-ui`, `/viewer` 명시 라우트 유지
- `/sdk/:file`, `/web/:section/:file`, `/src/:file` 명시 asset 라우트 추가
- `express.static(projectRoot)` 제거
- Vercel 환경에서는 SQLite DB 경로를 `/tmp/session-replay.sqlite`로 사용
- `OPENAI_API_KEY`가 없어도 서버는 시작하고, LLM 분석 API 호출 시에만 오류를 반환하도록 처리

## 중요한 제약

### SQLite는 Vercel에서 영구 저장소가 아님

현재 Vercel 배포에서는 SQLite를 `/tmp/session-replay.sqlite`에 저장하도록 분기했습니다.

이 방식은 데모/프리뷰 배포용입니다.

주의:

- Function 인스턴스가 재시작되면 데이터가 사라질 수 있음
- 배포가 새로 이루어지면 데이터가 유지되지 않을 수 있음
- 여러 인스턴스로 스케일되면 세션 데이터가 분산될 수 있음

운영형으로 가려면 SQLite 파일 저장 대신 외부 DB로 바꾸는 것이 맞습니다.

추천 후보:

- Vercel Postgres 또는 Neon Postgres
- Supabase Postgres
- Turso/libSQL
- Upstash Redis/KV 계열

현재 목적이 POC 배포라면 `/tmp` SQLite로 먼저 화면과 흐름을 확인할 수 있습니다.

## 환경 변수

Vercel Project Settings > Environment Variables에 아래 값을 설정합니다.

### 필수는 아님

LLM 분석을 사용하지 않으면 없어도 viewer와 replay는 동작합니다.

```text
OPENAI_API_KEY=...
```

### 선택

```text
OPENAI_MODEL=gpt-4o-mini
SESSION_REPLAY_DB_PATH=/tmp/session-replay.sqlite
```

`SESSION_REPLAY_DB_PATH`는 지정하지 않아도 Vercel 환경에서는 자동으로 `/tmp/session-replay.sqlite`를 사용합니다.

## 배포 방법

### Git 연동 방식

1. GitHub에 현재 프로젝트 push
2. Vercel에서 New Project
3. GitHub repository import
4. Framework Preset은 감지값 또는 Other
5. Build Command는 비워두거나 기본값 사용
6. Output Directory는 비워둠
7. Environment Variables 설정
8. Deploy

### Vercel CLI 방식

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

로컬에서 Vercel 방식으로 확인하려면:

```bash
vercel dev
```

## 배포 후 확인 URL

배포 도메인이 `https://your-project.vercel.app`라고 하면:

- `https://your-project.vercel.app/test-ui`
- `https://your-project.vercel.app/viewer`
- `https://your-project.vercel.app/api/replay/sessions`

현재 CLI 배포 URL:

- Production alias: `https://session-replay-poc.vercel.app`
- Latest deployment: `https://session-replay-lvjqg7rk5-session-replay.vercel.app`

## 배포 후 테스트 시나리오

1. `/test-ui` 접속
2. 우측 `Session` 버튼 클릭
3. 추적 이벤트 선택
4. `Start` 클릭
5. 홈/상품몰/혜택몰/자산 화면 이동
6. 상품 상세/이벤트 상세 등 클릭
7. `Stop` 클릭
8. `Save` 클릭
9. `/viewer` 접속
10. `세션 목록` 클릭
11. 저장된 세션 선택
12. 리플레이 화면에서 `Play`
13. `Local summary` 또는 `Analyze with LLM` 실행

## 현재 로컬 검증 결과

포트 `4174`에서 변경된 서버를 실행해 확인했습니다.

- `/test-ui`: 200
- `/web/test-page/styles.css`: 200
- `/sdk/session-replay-sdk.js`: 200
- `/src/replayer.js`: 200
- `/api/replay/sessions?limit=1`: 200
- `/src/server.js`: 404

내부 서버 파일은 공개되지 않고, 브라우저에서 필요한 asset만 명시적으로 서빙됩니다.

Vercel production 배포 후 추가 확인:

- `/test-ui`: 200
- `/viewer`: 200
- `/api/replay/sessions?limit=1`: 200
- `/sdk/session-replay-sdk.js`: 200
- `/web/test-page/styles.css`: 200
- `/src/replayer.js`: 200

## 향후 운영 배포 전환 작업

1. SQLite 제거
2. `src/replay-db.js`를 외부 DB adapter로 교체
3. 세션 payload JSON 저장 전략 정리
4. 대량 이벤트 저장 시 batch insert 최적화
5. viewer 목록 pagination 추가
6. LLM 호출 rate limit 또는 queue 추가
7. 인증/프로젝트별 접근 제어 추가
