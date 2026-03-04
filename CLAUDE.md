---

# Gonggomoon Frontend

Next.js 16+ App Router 기반 관리자 서비스입니다.
Feature-based architecture를 사용하여 도메인 단위 책임을 분리합니다.

본 문서는 프로젝트 협업 기준 및 아키텍처 설계 규칙을 정의합니다.

---

# 1. Tech Stack

Framework
Next.js 16+ (App Router)

Language
TypeScript

Styling
Tailwind CSS

UI
shadcn/ui

Package Manager
pnpm

Global State
Zustand

Server State
TanStack Query

Data Layer
Server Actions + Route Handlers

Fetch
shared/lib API wrapper 사용

---

# 2. Project Structure

```
src/
├── app/
│   ├── (main)/
│   │   ├── industry/
│   │   │   └── [industryId]/
│   │   │       ├── version/
│   │   │       │   ├── new/
│   │   │       │   │   └── page.tsx
│   │   │       │   └── [versionId]/
│   │   │       │       └── page.tsx
│   │   │       └── page.tsx
│   │   ├── company/
│   │   │   ├── create/
│   │   │   │   └── page.tsx
│   │   │   └── edit/
│   │   │       └── [companyId]/
│   │   │           └── page.tsx
│   │   ├── recruitment/
│   │   │   ├── create/
│   │   │   │   └── page.tsx
│   │   │   ├── confirm/
│   │   │   │   └── [recruitmentId]/
│   │   │   │       └── page.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── loading.tsx
│   └── layout.tsx
│
├── features/
│   ├── admin/
│   ├── auth/
│   ├── recruitment/
│   ├── company/
│   └── industry/
│
├── shared/
│   ├── components/
│   │   ├── ui/
│   │   └── layout/
│   ├── lib/
│   ├── config/
│   ├── types/
│   ├── store/
│   └── hooks/
│
└── mock/               // mock data
```

---

# 3. Architecture Principles

## 3.1 App Router

Next.js App Router 구조 사용

* `src/app` 기반 파일 시스템 라우팅
* 기본은 Server Component
* 필요한 경우에만 `'use client'`
* layout 기반 계층 구조

공식 문서
[https://nextjs.org/docs/app](https://nextjs.org/docs/app)

---

## 3.2 Feature-Based Architecture

도메인 단위 코드 분리

각 feature는 다음 책임을 가짐

```
features/{domain}

actions.ts   → server actions
queries.ts   → tanstack query
types.ts     → domain types
components   → feature UI
hooks        → feature hooks
```

도메인 공통 로직은 `shared`로 이동

---
## 3.3 Mock-Driven Development
데이터 구조 준수: 기능을 구현할 때 반드시 mock/data 내에 정의된 데이터 구조를 먼저 확인하고, 이를 기반으로 UI 및 로직을 설계합니다.

적절한 데이터 활용: 개발 단계에서 서버 API가 완성되지 않았더라도 mock/ 폴더 내의 적절한 데이터를 사용하여 실제 서비스와 동일한 동작을 보장하도록 구현합니다.

타입 동기화: Mock 데이터의 인터페이스는 shared/types 또는 features 내부의 types.ts와 일관성을 유지해야 합니다.
타입이 존재하지 않는 경우, shared/types 또는 features 내부의 types.ts에 추가합니다.

---
# 4. Code Convention

## Formatter

Indent
2 spaces

String
single quote

Semicolon
required

---

## Naming

Variables / Functions
camelCase

Components
PascalCase

Boolean
is / has prefix

CRUD

```
get
create
update
delete
```

Event Handler

```
handleEventName
```

---

# 5. Architectural Goals

본 프로젝트의 설계 목표

* Feature 중심 구조
* Server / Client data layer 분리
* 확장 가능한 도메인 구조
* 예측 가능한 상태 흐름

---