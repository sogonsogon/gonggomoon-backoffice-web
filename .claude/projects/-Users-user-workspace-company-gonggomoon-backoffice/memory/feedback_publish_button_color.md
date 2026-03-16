---
name: 발행 버튼 색상
description: 발행 버튼은 항상 검정(bg-ds-grey-900)으로 유지 — primary blue 변경 금지
type: feedback
---

발행(publish) 버튼은 bg-ds-grey-900 text-white hover:bg-ds-grey-800 로 유지한다.

**Why:** 사용자가 명시적으로 검정색 유지를 요청함. primary blue로 변경하지 말 것.

**How to apply:** AnalysisDetailActions, AnalysisRow 등 발행 버튼에 bg-primary 제안/적용 금지.
