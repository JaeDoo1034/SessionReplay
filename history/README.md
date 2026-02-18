# Session Replay Snippet History

이 폴더는 `Test/session-replay-snippet*.js` 버전별 개선 이력을 정리한 문서입니다.

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

## 타임라인

- 2026-02-18: v1, v2, v3, v4 문서화 완료
- 2026-02-18: v5/v5.1 문서화 및 빈 화면 대응(베이스 스냅샷/iframe 복원) 반영
- 2026-02-18: v6 생성, mutation 재생 안정화(childList patch 우선 + fallback)
- 2026-02-18: v7 생성, v4 재구성 + 단일 snapshot 유지 + Clarity/rrweb 기반 보안/재현/운영 개선
