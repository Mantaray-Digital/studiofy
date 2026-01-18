# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Studiofy is a SaaS platform for transforming product photography into professional marketing assets. This is a **Turborepo monorepo** containing:
- `studiofy-fe/` (`@studiofy/web`) - Next.js frontend application
- `studiofy-be/` (`@studiofy/api`) - NestJS backend API

## Commands

### Root (Turborepo)
```bash
pnpm install         # Install all dependencies
pnpm dev             # Start all apps in dev mode
pnpm build           # Build all apps
pnpm lint            # Lint all apps
pnpm test            # Run tests across all apps
pnpm clean           # Clean all build artifacts and node_modules
```

### Run specific app
```bash
pnpm --filter @studiofy/web dev      # Start frontend only
pnpm --filter @studiofy/api dev      # Start backend only (alias: start:dev)
pnpm --filter @studiofy/api test     # Run backend tests
```

### Backend-specific (`studiofy-be/`)
```bash
pnpm start:dev       # Start dev server with hot reload
pnpm start:prod      # Run production build
pnpm test:watch      # Run tests in watch mode
pnpm test:e2e        # Run end-to-end tests
pnpm test:cov        # Run tests with coverage
```

**Requirements:** Node.js >=22.0.0, pnpm >=10.25.0

## Architecture

### Backend (`@studiofy/api`)

**Tech Stack:** NestJS 11, TypeScript 5.9, MongoDB/Mongoose 8, Redis, RabbitMQ

**Directory Structure:**
```
studiofy-be/src/
├── ability/           # CASL authorization factory
├── auth/              # Authentication (JWT, Google OAuth, email verification)
│   ├── strategies/    # Passport strategies
│   └── secrets/       # Token management with Redis
├── modules/
│   ├── users/         # User CRUD, billing records
│   ├── projects/      # Generation session history
│   └── bookmarks/     # Saved assets (images/text)
├── guards/            # JwtAuthGuard, AbilitiesGuard, RefreshTokenGuard
├── Decorator/         # @CheckAbility(), @UserParam(), @ResponseMessage()
├── interceptors/      # ResponseInterceptor (standardized responses)
├── filter/            # GlobalExceptionFilter, AppError
├── gcs/               # Google Cloud Storage service
└── config/            # Environment config with validation
```

**Key Patterns:**

1. **Authentication Flow:** JWT tokens (access + refresh) stored in cookies and Redis. Refresh tokens tracked by `refreshToken_{userId}_{sessionId}`.

2. **Authorization (CASL):** Role-based with Admin (full access) and User (own resources only). Use `@CheckAbility()` decorator on controller methods.

3. **Standard Response Format:** All endpoints return:
```typescript
{ success: boolean, message: string, data?: T, error?: { code, details } }
```

4. **Database Schemas:**
   - User: email (unique), password (bcrypt, select:false), status enum, roles enum, credits
   - Project: user ref, name, thumbnail_url, meta, is_archived
   - Bookmark: user ref, project ref, type (image|text), content, unique index on user+content

5. **Microservices:** RabbitMQ client (`Email_SERVICE`) for email events (verification, password reset, welcome).

**API Prefix:** `/api/v1`

### Frontend (`@studiofy/web`)

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5.9, Tailwind CSS 4, React Query, Zustand

**Directory Structure:**
```
studiofy-fe/src/
├── api/               # API call functions (e.g., auth.api.ts)
├── app/               # Next.js App Router pages
│   └── (auth)/        # Route group for auth pages
├── components/ui/     # Reusable UI components (Radix-based)
├── hooks/             # Custom hooks by domain (e.g., hooks/auth/)
├── lib/               # Library configs (react-query.ts, axios.ts, utils.ts)
├── schema/            # Zod validation schemas by domain
├── store/             # Zustand stores
├── types/             # TypeScript types by domain
└── utils/             # apiClient.ts, handleApiError.ts
```

**Key Patterns:**

1. **Data Flow:** Schema (Zod) → API (axios) → Hook (useMutation/useQuery) → Page (react-hook-form)

2. **API Client:** `src/utils/apiClient.ts` - auto-refreshes tokens on 401, cleans undefined params. Base URL from `NEXT_PUBLIC_API_URL`.

3. **Response Type:** All API functions return `Response<T>` wrapper matching backend format.

4. **Design Tokens:** CSS variables in `globals.css` for colors (`--primary-*`, `--secondary-*`) and typography (`--h1` through `--h7`, `--b1` through `--b5`).

5. **Path Alias:** `@/*` maps to `./src/*`

## Cross-Cutting Concerns

- **Auth Tokens:** Stored in `sessionStorage` (FE) and Redis (BE). Access token in cookie + Authorization header, refresh token for silent renewal.
- **File Storage:** Google Cloud Storage for images. Backend handles upload/resize with Sharp.
- **Toast Notifications:** Use unique IDs per hook to prevent duplicates.
- **Client Components:** Must use `'use client'` directive in Next.js App Router.
