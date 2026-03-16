---
name: 검정 버튼 정책
description: 발행 버튼, 페이지네이션 active 버튼은 bg-ds-grey-900 검정으로 유지 — primary blue 변경 금지
type: feedback
---

발행(publish) 버튼과 페이지네이션 active 버튼은 bg-ds-grey-900 text-white로 유지한다.

**Why:** 사용자가 명시적으로 검정색 유지를 요청함. primary blue로 변경 제안 금지.

**How to apply:** AnalysisDetailActions, AnalysisRow의 발행 버튼, CompanyTable 페이지네이션 버튼에 bg-primary 적용 금지.
