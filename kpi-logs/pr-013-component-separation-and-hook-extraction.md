# PR #13 — 컴포넌트 분리 및 useTagField 훅 추출

## Meta

| Field         | Value                                              |
|---------------|----------------------------------------------------|
| PR Number     | #13                                                |
| PR Link       | feat/13 branch                                     |
| Date          | 2026-03-07                                         |
| Type          | refactor                                           |
| Related Issue | -                                                  |
| Files Changed | 12                                                 |
| Lines Added   | +62                                                |
| Lines Removed | -136                                               |

---

## Problem Statement

`IndustryVersionNewForm.tsx`에는 TagField UI 로직과 상태 관리 로직이 하나의 파일에 혼재되어 있었다.
구체적으로:

- TagField 컴포넌트가 `IndustryVersionNewForm.tsx` 내부에 인라인으로 정의되어 있어 재사용 불가
- 태그 필드마다 `tags`, `inputValue` 두 개의 state + `addTag` / `removeTag` 호출 패턴이 5번 반복 — 총 10개의 `useState`
- `addTag`는 `value`, `setInput`, `setTags` 세 개의 인자를 받는 복잡한 함수 시그니처로, 호출 시마다 3개의 개념을 동시에 이해해야 함
- `formatDate`가 `features/industry/constants.ts`에 정의되어 있어 shared 유틸임에도 불구하고 도메인 폴더에 위치
- `INITIAL_FORM`, `IndustryIconConfig` 타입이 컴포넌트 파일 내부에 정의되어 있어 재사용 및 탐색이 어려움

---

## Solution Summary

TagField를 독립 컴포넌트로 분리하고, 태그 상태 관리 로직을 `useTagField` 커스텀 훅으로 캡슐화했다.
동시에 `formatDate`, `INITIAL_FORM`, `IndustryIconConfig` 타입을 각 아키텍처 규칙에 맞는 위치로 이동했다.

---

## Technical Implementation

### Approach

**TagField 컴포넌트 분리**
`features/industry/layout/TagField.tsx`로 추출. `'use client'` 지시어 추가.
props 인터페이스: `title`, `tags`, `inputValue`, `placeholder`, `onChangeInput`, `onAdd`, `onRemove`

**useTagField 훅 추출**
`features/industry/hooks/useTagField.ts` 신규 생성.
하나의 태그 필드에 대한 전체 상태(tags, inputValue)와 핸들러(onAdd, onRemove, onChangeInput)를 반환.
훅의 반환값이 `TagField` props와 1:1 매핑되도록 설계 → `{...keyword}` spread 패턴으로 사용 가능.

**기타 위치 정리**
- `formatDate`: `features/industry/constants.ts` → `shared/lib/formatDate.ts`
- `INITIAL_FORM`: `CompanyForm.tsx` 인라인 → `features/company/constants.ts`
- `IndustryIconConfig` 타입: `IndustryCard.tsx` 인라인 → `features/industry/types.ts`
- `getIndustryIconConfig`: `export` 제거 (파일 내부에서만 사용)

### Key decisions and trade-offs

| Decision | Alternative considered | Why you chose this |
|----------|----------------------|-------------------|
| `useTagField` 훅이 반환값을 TagField props와 동일한 키 이름으로 설계 | 각각 다른 이름으로 반환 후 매핑 | spread 패턴(`{...keyword}`)을 사용할 수 있어 호출부 코드가 극단적으로 단순해짐 |
| TagField를 `layout/` 폴더에 유지 | `ui/` 폴더로 이동 | 이 컴포넌트는 입력 인터랙션을 포함하는 layout-level 컴포넌트 |
| `useTagField`를 `features/industry/hooks/`에 위치 | `shared/hooks/`에 위치 | 현재 industry 도메인에서만 사용됨. 다른 도메인에서 필요 시 shared로 이동 |

---

## Before vs After

### Code metrics

| Metric                        | Before | After | Change     |
|-------------------------------|--------|-------|------------|
| IndustryVersionNewForm 줄 수  | 209    | 140   | -69줄 (-33%) |
| useState 호출 수 (태그 관련)  | 10     | 0     | -10        |
| addTag / removeTag 함수       | 2      | 0     | 제거       |
| useTagField 인스턴스          | 0      | 5     | +5         |
| TagField props 작성량 (per instance) | 5줄 | 1줄 (spread) | -80% |
| 신규 파일                     | 0      | 2     | TagField.tsx, useTagField.ts |

### Before (IndustryVersionNewForm 태그 상태 관리)

```tsx
const [keywordTags, setKeywordTags] = useState<string[]>([]);
const [trendTags, setTrendTags] = useState<string[]>([]);
// ... 3개 더 (총 5개)

const [keywordInput, setKeywordInput] = useState('');
// ... 4개 더 (총 5개)

const addTag = (
  value: string,
  setInput: (value: string) => void,
  setTags: (updater: (prev: string[]) => string[]) => void,
) => { ... };

<TagField
  title="핵심 산업 키워드"
  tags={keywordTags}
  inputValue={keywordInput}
  onChangeInput={setKeywordInput}
  onAdd={() => addTag(keywordInput, setKeywordInput, setKeywordTags)}
  onRemove={(value) => removeTag(value, setKeywordTags)}
  placeholder="..."
/>
```

### After

```tsx
const keyword = useTagField();
const trend = useTagField();
// ... 3개 더

<TagField title="핵심 산업 키워드" {...keyword} placeholder="..." />
```

---

## Impact

### Developer impact

- `IndustryVersionNewForm`에 새로운 태그 필드가 필요할 경우, `useTagField()` 한 줄 + `<TagField {...x} />` 한 줄로 추가 가능
- TagField UI를 수정할 때 한 파일(`TagField.tsx`)만 수정하면 모든 인스턴스에 반영됨 (이전에는 인라인이라 파일 자체를 수정해야 했음)
- `formatDate`를 `shared/lib`에서 import하는 패턴이 확립되어 다른 도메인 개발자도 중복 구현 없이 사용 가능

### User impact

기능적 변화 없음. 동일한 UI와 동작을 유지하면서 내부 구조만 개선됨.

### Measurable KPI metrics

| Metric                                 | Value    | Note              |
|----------------------------------------|----------|-------------------|
| IndustryVersionNewForm 줄 수 감소      | -69줄    | 209 → 140         |
| 제거된 중복 state 패턴                 | 10개     | useState 10개 제거 |
| 재사용 가능해진 컴포넌트               | 1개      | TagField          |
| 재사용 가능해진 훅                     | 1개      | useTagField       |
| 아키텍처 규칙 위반 수정                | 3건      | formatDate, INITIAL_FORM, IndustryIconConfig |
| 불필요한 export 제거                   | 1개      | getIndustryIconConfig |

---

## Code Quality Improvements

- TagField 컴포넌트가 독립 파일로 존재하여 파일 탐색 시 즉시 발견 가능
- `addTag`의 3-argument 함수 시그니처 제거 — 호출 시 `setInput`, `setTags`를 외부에서 주입하는 패턴은 내부 구현을 노출하는 설계였음
- 각 상수/타입이 아키텍처 규칙에 맞는 위치(`constants.ts`, `types.ts`, `shared/lib`)에 배치되어 코드베이스의 예측 가능성 향상

---

## Maintainability Improvements

- 6개월 후 태그 입력 버그를 수정할 때, `useTagField.ts` 한 파일만 수정하면 5개 필드 모두 적용됨
- 새로운 팀원이 `features/industry/hooks/` 폴더를 보면 태그 관련 상태 로직의 위치를 즉시 알 수 있음
- `shared/lib/formatDate.ts`의 위치가 다른 도메인에서도 재사용 가능함을 명시적으로 나타냄

---

## What I Learned

### Technical

- 훅의 반환값 키 이름을 소비하는 컴포넌트의 props와 맞추면 spread 패턴으로 결합 가능 — API 설계 시 소비자 관점을 먼저 생각하는 것이 중요함
- `'use client'`가 없는 컴포넌트도 클라이언트 컴포넌트 트리에 포함되면 클라이언트에서 실행되지만, 명시적으로 선언하는 것이 의도를 명확히 함

### Engineering judgment

- 컴포넌트를 분리하는 기준: "이 코드를 수정할 때 다른 파일에도 영향을 줄 수 있는가" → TagField는 여러 위치에서 사용될 수 있어 분리가 맞음
- 훅을 추출하는 기준: 동일한 useState + 핸들러 패턴이 N번 반복될 때 (이번 경우 N=5)
- 타입과 상수는 사용하는 컴포넌트 파일이 아닌, 도메인의 `types.ts` / `constants.ts`에 두어야 탐색 가능성이 보장됨

---

## Future Improvements

| Priority | Improvement                                              | Reason                                              |
|----------|----------------------------------------------------------|-----------------------------------------------------|
| P1       | `useTagField`에 중복 태그 추가 시 사용자 피드백 추가     | 현재 조용히 무시됨. 토스트 메시지 등으로 안내 필요  |
| P2       | TagField에 최대 태그 수 제한 prop 추가 (`maxCount`)      | 운영 시 데이터 과적 방지                            |
| P3       | `useTagField`를 `shared/hooks`로 이동                    | 다른 도메인(recruitment 등)에서도 태그 입력 필요 시 |

---

## Interview Talking Points

"IndustryVersionNewForm에서 동일한 useState + 핸들러 패턴이 5번 반복되는 것을 발견하고, `useTagField` 커스텀 훅으로 추출했습니다. 훅의 반환값 키 이름을 TagField 컴포넌트의 props와 동일하게 설계해 `{...keyword}` spread 패턴으로 사용할 수 있도록 했고, 그 결과 컴포넌트가 209줄에서 140줄로 33% 줄었으며 태그 관련 state 10개가 제거되었습니다."
