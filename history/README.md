# Session Replay History

이 폴더는 세션 리플레이 프로젝트의 업무 히스토리, 버전별 개선 이력, 운영 구조 변경 내용을 정리하는 공간입니다.

## 폴더 이용 규칙

### `history/`

`history/` 폴더 자체는 업무 히스토리 이력을 남기는 공간입니다.

아래와 같은 내용은 `history/` 바로 아래에 날짜 또는 버전 기준 문서로 정리합니다.

- 기능 추가 및 구조 변경 이력
- SDK, WAS, DB, viewer, test-ui 등 주요 업무 단위 진행 내용
- 배포 준비, 운영 구조 변경, 화면 개선 등 프로젝트 진행 기록
- 추후 이 폴더만 봐도 "언제, 왜, 무엇을 바꿨는지" 알 수 있어야 하는 내용

권장 파일명:

```text
YYYY-MM-DD-업무-주제.md
session-replay-기능명-vN.md
```

### `history/lession learned/`

`history/lession learned/` 폴더는 오류 해결 방식을 정리하는 공간입니다.

아래와 같은 내용은 이 폴더에 정리합니다.

- 장애 또는 버그의 원인 분석
- 문제 재현 조건
- 해결 방향과 실제 수정 위치
- 기존 흐름과 개선 흐름 비교
- 같은 문제를 다시 겪지 않기 위한 개념 설명

현재 폴더명은 프로젝트 내 실제 경로 기준으로 `lession learned`를 사용합니다.
추후 폴더명을 정리할 경우 기존 문서 링크도 함께 수정해야 합니다.

### `history/ready4act/`

`history/ready4act/` 폴더는 아직 고치지 않았지만, 고칠 예정이거나 추후 필요해보이는 내용을 정리하는 공간입니다.

아래와 같은 내용은 이 폴더에 정리합니다.

- 현재 코드에서 발견한 개선 후보
- 아직 수정하지 않은 잠재 버그 또는 안정성 이슈
- 향후 설계가 필요한 기능 후보
- 바로 lesson learned로 확정하기 전의 조치 대기 항목
- 다음 작업자가 바로 action으로 옮길 수 있어야 하는 분석 메모

## 버전 목록

- [v1](./session-replay-snippet-v1.md): 스니펫 기본 동작(기록/재생/분석) 베이스라인
- [v2](./session-replay-snippet-v2.md): 버전 식별자 정리
- [v3](./session-replay-snippet-v3.md): 재생 안정성 개선(레이아웃/Mutation 토글/한국어 분석 출력)
- [v4](./session-replay-snippet-v4.md): 실제 상호작용 이벤트 재생(탭/버튼 동작)
- [v5](./session-replay-snippet-v5.md): 스냅샷 전략 강화, Scripts OFF/ON, mutation 타임라인, iframe 복원
- [v6](./session-replay-snippet-v6.md): v4 기반 리베이스 + childList patch 재생 방식
- [v7](./session-replay-snippet-v7.md): v4 재구성 + Clarity/rrweb 기준(privacy/config/iframe placeholder/운영 가드)

## 운영 문서

- [Replay Validation Checklist (v6)](./replay-validation-checklist-v6.md): 재생 품질 수동 점검 항목
- [Session Replay Test Environment v1](./session-replay-test-environment-v1.md): SDK/WAS/SQLite/test-ui/viewer 통합 테스트 환경 현재 상태
- [2026-06-29 세션 이름 저장 및 Test UI 시인성 개선](./2026-06-29-session-name-and-test-ui-ux-refresh.md): 세션 이름 저장, viewer 표시, 금융 앱형 test-ui 개선
- [2026-06-29 배포용 SDK 및 원격 제어 화면](./2026-06-29-deploy-sdk-and-control-console.md): 외부 사이트 삽입용 SDK 분리, 원격 녹화 제어 화면, SDK 제어 API/DB 구조

## Lesson Learned

- [Stop failed / Save failed DB Timeout](./lession%20learned/stop-save-failed-db-timeout.md): Vercel/Supabase DB timeout과 저장 실패 해결
- [Dialog Popup Replay Tracking Gap](./lession%20learned/dialog-popup-replay-tracking-gap.md): dialog popup 재생 누락 원인과 해결 방향
- [Customer Behavior Labeling Improvement](./lession%20learned/customer-behavior-labeling-improvement.md): 고객 행동 유형 라벨링 개선
- [Mobile Replay CSS Broken by Localhost Base URL](./lession%20learned/mobile-replay-css-localhost-base-url.md): 모바일 replay CSS 깨짐과 localhost base URL 보정

## Ready4Act

- [SDK Flush Concurrency and Queue Order](./ready4act/sdk-flush-concurrency-and-queue-order.md): flush 실패 복원은 단일 흐름에서 순서를 보존하지만, concurrent flush 상황에서는 batch 저장 순서가 뒤섞일 수 있어 직렬화가 필요한 개선 후보

## 타임라인

- 2026-02-18: v1, v2, v3, v4 문서화 완료
- 2026-02-18: v5/v5.1 문서화 및 빈 화면 대응(베이스 스냅샷/iframe 복원) 반영
- 2026-02-18: v6 생성, mutation 재생 안정화(childList patch 우선 + fallback)
- 2026-02-18: v7 생성, v4 재구성 + 단일 snapshot 유지 + Clarity/rrweb 기반 보안/재현/운영 개선
- 2026-06-28: SDK/WAS/SQLite/test-ui/viewer 통합 테스트 환경 v1 문서화
- 2026-06-29: 세션 이름 저장 기능과 test-ui UX 개선 내용 문서화
- 2026-06-29: 기존 테스트용 SDK와 분리된 배포용 SDK 및 원격 제어 화면 구조 문서화
- 2026-06-29: 모바일 replay CSS 깨짐 원인(localhost base URL) 및 해결 방식 문서화
