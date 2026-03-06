# Gonggomoon Frontend

This is an admin service based on the Next.js 16+ App Router.
It utilizes a feature-based architecture to separate responsibilities by domain.

This document defines the project collaboration standards and architectural design rules.

---

# 1. Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: shadcn/ui
- **Package Manager**: pnpm
- **Global State**: Zustand
- **Server State**: TanStack Query
- **Data Layer**: Server Actions + Route Handlers
- **Fetch**: Uses `shared/lib` API wrapper

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
└── mock/               // Mock data

```

---

# 3. Architecture Principles

## 3.1 App Router

- Follow the Next.js App Router structure.
- Use `src/app` based file-system routing.
- Server Components by default; use `'use client'` only when necessary.
- Leverage layout-based hierarchical structures.

## 3.2 Feature-Based Architecture

Separate code by domain units. Each feature folder is responsible for:

```
features/{domain}

actions.ts   → server actions
queries.ts   → tanstack query
types.ts     → domain types
components   → feature UI
hooks        → feature hooks

```

_Note: Move shared domain logic to the `shared` directory._

## 3.3 Mock-Driven Development

- **Data Structure Compliance**: Always verify the data structure defined in `mock/data` before implementing features, and design UI/logic based on it.
- **Data Utilization**: If server APIs are not ready, use appropriate data from the `mock/` folder to ensure the service behaves as expected.
- **Type Synchronization**: Ensure Mock data interfaces are consistent with `shared/types` or `features/**/types.ts`. Add missing types to these locations as needed.

---

# 4. Code Convention

## Formatter

- **Indent**: 2 spaces
- **String**: Single quote
- **Semicolon**: Required

## Naming

- **Variables / Functions**: `camelCase`
- **Components**: `PascalCase`
- **Boolean**: Prefix with `is` / `has`
- **CRUD**: Use `get`, `create`, `update`, `delete`
- **Event Handler**: `handleEventName`

---

# 5. Design System and Styling Rules

- **Prioritize Design Tokens**: Always use the custom design system (DS) tokens defined in `globals.css` as the primary source for styling.
- **Variable Usage**: Use CSS variables prefixed with `ds-` (e.g., `var(--ds-primary)`, `var(--ds-surface-bg)`) instead of hardcoded hex codes, RGB values, or arbitrary spacing.
- **Tailwind Integration**: When using Tailwind CSS, prioritize utility classes mapped to these design tokens (e.g., `text-ds-main`, `bg-ds-brand`) over standard Tailwind colors or arbitrary values (e.g., `text-blue-500` or `bg-[#f0f0f0]`).
- **Token Discovery**: Reference `globals.css` to identify the correct token for colors, typography, spacing, and border-radius to ensure visual consistency.
- **Constraint**: Do not introduce new style values that bypass the established design system unless explicitly instructed.

---

# 6. Architectural Goals

- Feature-centric architecture.
- Separation of Server / Client data layers.
- Scalable domain structures.
- Predictable state flow.
