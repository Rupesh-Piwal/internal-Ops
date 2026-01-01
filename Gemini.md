🔐 RBAC Authorization System — Specification
1️⃣ Functional Requirements
FR-1: Authentication Integration

The system must use Clerk for user authentication.

Only authenticated users may access protected routes.

Unauthenticated users must be redirected to the sign-in flow.

FR-2: Role Definitions

The system must support exactly two roles:

admin

viewer

Each user must have one and only one role at any time.

Role values must be type-safe and centrally defined.

FR-3: Role Assignment

User roles must be stored in Clerk public metadata.

Role assignment must:

Be possible via an internal admin flow or Clerk dashboard

Default to viewer if not explicitly assigned

The system must gracefully handle missing or invalid roles.

FR-4: Route-Level Authorization

The system must enforce role-based access at the route level.

Routes must be grouped logically (e.g. /admin, /dashboard).

Access rules:

admin: full access to all protected routes

viewer: access to non-admin protected routes only

Unauthorized access must redirect to a Forbidden (403) page.

FR-5: Server-Side Enforcement (Source of Truth)

All authorization checks must be enforced on the server.

Server Components, API routes, and Server Actions must:

Validate authentication state

Validate user role

Client-side checks must never be relied upon for security.

FR-6: API Authorization

All internal API routes must re-validate user role independently.

API responses must:

Return 401 for unauthenticated requests

Return 403 for unauthorized requests

Authorization logic must be reusable across routes.

FR-7: UI-Level Authorization (UX Optimization)

The UI may conditionally render components based on role.

UI checks must:

Improve user experience only

Never replace server enforcement

Examples:

Hide admin-only buttons from viewers

Disable restricted actions visually

FR-8: Error Handling & Access Feedback

The system must provide clear feedback for:

Unauthenticated access attempts

Unauthorized access attempts

A dedicated /forbidden page must exist.

Errors must not leak sensitive authorization logic.

FR-9: Extensibility

The RBAC system must be designed to:

Support additional roles in the future

Evolve into permission-based or policy-based authorization

Core application code must not require refactoring to add roles.

2️⃣ Non-Functional Requirements
NFR-1: Security

Authorization logic must follow defense-in-depth:

Middleware

Server components

API route guards

Role checks must be tamper-proof and server-validated.

Fail-safe defaults must deny access when in doubt.

NFR-2: Type Safety

All role definitions must be strongly typed using TypeScript.

No magic strings or hard-coded role checks are allowed.

Shared types must be used across frontend and backend.

NFR-3: Performance

Role checks must be lightweight and low-latency.

No additional database queries should be required for every request.

Authorization must rely on cached identity metadata when possible.

NFR-4: Maintainability

Authorization logic must be:

Centralized

Testable

Easy to reason about

Clerk-specific logic must be isolated from business logic.

Folder structure must reflect clear separation of concerns.

NFR-5: Scalability

The system must support:

Increasing number of users

Additional protected routes

Authorization complexity should grow linearly, not exponentially.

NFR-6: Observability & Debuggability

Authorization failures must be easy to trace during development.

Clear logs or error messages must exist for forbidden access paths.

The system must allow easy integration of audit logging later.

3️⃣ Data Storage (Prisma ORM + PostgreSQL)
Design Principle

Authentication data is owned by Clerk.

Authorization metadata is split between:

Clerk (role identity)

PostgreSQL (application resources)

Clerk (Identity Store)

Stores:

User ID

Session

Role (admin | viewer) in publicMetadata

Treated as the source of truth for user roles.