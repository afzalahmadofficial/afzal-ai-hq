# Afzal Ahmad AI HQ — Application Bootstrap Specification

**Status:** Ready for implementation  
**Version:** 1.0  
**Phase:** Phase 1 — Application Bootstrap  
**Owner:** Afzal Ahmad

## 1. Objective

Create the minimum production-ready application foundation for Afzal Ahmad AI HQ before implementing the AI orchestration layer.

The bootstrap must establish:

- a real frontend application;
- environment configuration;
- Supabase client integration;
- authentication boundary;
- protected application routing;
- shared application layout;
- project context provider;
- reusable error/loading states;
- a clean boundary for future server-side orchestration.

The bootstrap is intentionally small. It should provide a stable foundation without prematurely implementing every feature.

## 2. Target Architecture

```text
Browser
  │
  ▼
Frontend Application
  │
  ├── Auth Provider
  ├── Project Provider
  ├── App Shell
  └── Route Guards
  │
  ▼
Application API / Server Boundary
  │
  ├── Authorization
  ├── Task Creation
  └── Agent Orchestration (later)
  │
  ▼
Supabase
  ├── Auth
  └── PostgreSQL + RLS
```

## 3. Repository Foundation

Recommended initial structure:

```text
afzal-ai-hq/
├── docs/
├── supabase/
├── app/
│   ├── routes/
│   ├── components/
│   ├── layouts/
│   └── providers/
├── lib/
│   ├── supabase/
│   ├── auth/
│   └── permissions/
├── server/
│   └── api/
├── public/
└── tests/
```

Framework-specific names may change, but responsibilities should remain separated.

## 4. Environment Configuration

Required configuration must be split into client-safe and server-only values.

### Client-safe

- Supabase project URL.
- Supabase anonymous/publishable key as required by the selected Supabase client setup.

### Server-only

- Supabase service-role credential, if a privileged server operation genuinely requires it.
- LLM provider keys.
- External integration secrets.
- Signing secrets.

Never commit real secrets to GitHub.

## 5. Supabase Client Boundary

Create a reusable Supabase client abstraction rather than creating ad-hoc clients throughout the application.

Conceptually:

```ts
getSupabaseClient()
```

The browser client must operate under the authenticated user's session and therefore remain subject to RLS.

Privileged server operations must use a separate server-only boundary.

## 6. Authentication Provider

Create a single authentication provider responsible for exposing:

```ts
interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}
```

Responsibilities:

1. Load the current session.
2. Subscribe to auth state changes.
3. Expose authenticated user state.
4. Provide logout.
5. Clean up the auth listener.

## 7. Auth Guard

Protected routes must not render project data before authentication state is resolved.

```text
Auth loading
    ↓
Show loading shell
    ↓
Authenticated?
 ┌──┴──┐
No     Yes
 ↓      ↓
Login   Project Context
```

An unauthenticated user must never receive project-scoped data.

## 8. Project Provider

After authentication, load the user's active project memberships.

Conceptual interface:

```ts
interface ProjectContextState {
  projects: ProjectMembership[];
  activeProject: ProjectMembership | null;
  loading: boolean;
  setActiveProject(projectId: string): void;
}
```

The provider should own project selection state so all project-scoped screens use the same source of truth.

## 9. Project Isolation

When switching projects:

```text
Project A
   ↓
Invalidate project-scoped state
   ↓
Set Project B
   ↓
Fetch authorized Project B data
```

Never retain Project A data in a visible Project B screen.

Every project-scoped server request must independently validate authorization.

## 10. Initial Routes

The first implementation should support only the routes required for the shell:

```text
/login
/projects
/projects/:projectId
/projects/:projectId/command
/projects/:projectId/tasks
/projects/:projectId/agents
```

Additional routes from the full shell specification can be added after the foundation is stable.

## 11. Initial App Shell

The first protected layout should contain:

```text
┌────────────────────────────────────────────┐
│ Afzal Ahmad AI HQ       Project ▼  Profile │
├──────────────┬─────────────────────────────┤
│ Overview     │                             │
│ Command      │        Main Content         │
│ Agents       │                             │
│ Tasks        │                             │
│ Research     │                             │
│ Content      │                             │
│ Approvals    │                             │
│ Reports      │                             │
│ Settings     │                             │
└──────────────┴─────────────────────────────┘
```

Only the first implementation routes need to be fully functional.

## 12. Dashboard MVP

The first dashboard should show:

- active project;
- current user role;
- quick Command Center action;
- task count or recent tasks;
- system status;
- useful empty states.

Avoid building analytics before the underlying data is available.

## 13. Command Center MVP

The Command Center needs only one core interaction initially:

```text
User objective
      ↓
Validate input
      ↓
Create durable task
      ↓
Return task ID
```

Do not call an LLM directly from the browser.

The first endpoint can create the task and leave orchestration for the next milestone.

## 14. Task Contract

The application should use a stable view model:

```ts
interface TaskViewModel {
  id: string;
  projectId: string;
  title: string;
  status: string;
  agentId?: string;
  createdAt: string;
  updatedAt: string;
  result?: unknown;
}
```

The UI must not depend on internal agent implementation details.

## 15. Role-Aware Navigation

Navigation should be generated from centralized permissions.

Example conceptual mapping:

```text
owner     → all project controls
admin     → administrative + operational controls
operator  → operational controls
member    → permitted read-only controls
```

Hiding a button is not a security mechanism. Backend authorization and RLS remain authoritative.

## 16. Loading States

Required bootstrap loading states:

- authentication loading;
- project loading;
- dashboard loading;
- task submission loading;
- task list loading.

Never expose a blank screen during expected asynchronous operations.

## 17. Error Handling

Normalize application errors into predictable categories:

```text
AUTH_REQUIRED
FORBIDDEN
NOT_FOUND
VALIDATION_ERROR
NETWORK_ERROR
TASK_ERROR
INTERNAL_ERROR
```

User-facing messages must be safe and actionable. Internal stack traces must remain server-side.

## 18. Security Checklist

- [ ] No service-role key in frontend bundle.
- [ ] No LLM API key in frontend bundle.
- [ ] Protected routes require authentication.
- [ ] Project membership is validated.
- [ ] Project IDs are authorization-checked server-side.
- [ ] Existing RLS policies remain enabled.
- [ ] Cross-project data isolation is tested.
- [ ] Sensitive values are not written to logs.
- [ ] User-generated/external content is treated as untrusted.

## 19. Testing Checklist

### Auth

- [ ] Login succeeds.
- [ ] Session persists correctly.
- [ ] Logout works.
- [ ] Unauthenticated users cannot access protected routes.

### Project context

- [ ] User sees only authorized projects.
- [ ] Active project can be selected.
- [ ] Project switching refreshes project-scoped state.
- [ ] Unauthorized project access is rejected.

### Shell

- [ ] Sidebar navigation works.
- [ ] Project selector works.
- [ ] Profile/logout works.
- [ ] Loading and error states render correctly.

### Command Center

- [ ] Empty objective is rejected.
- [ ] Valid objective creates a task.
- [ ] Created task belongs to selected project.
- [ ] Unauthorized users cannot create tasks.

## 20. Definition of Done

Bootstrap is complete when Afzal can:

1. Open the application.
2. Sign in with Supabase Auth.
3. Reach the protected AI HQ shell.
4. See his authorized project(s).
5. Select a project.
6. View the project dashboard.
7. Open the Command Center.
8. Submit an objective.
9. Create a durable project-scoped task.
10. Open the task from the Tasks page.
11. Log out and lose access to protected routes.

## 21. Next Vertical Slice

Once the bootstrap is working, implement:

```text
Command Center
      ↓
Task Creation API
      ↓
CEO / Router Agent
      ↓
Research Agent
      ↓
Research Result
      ↓
Supabase
      ↓
Task Detail UI
```

This is the first end-to-end AI HQ capability and should be treated as the next major milestone.

## 22. Architectural Rule

**Do not add complexity until the previous boundary works.**

The implementation sequence is:

```text
Application bootstrap
        ↓
Authentication
        ↓
Project context
        ↓
Protected shell
        ↓
Task creation
        ↓
CEO routing
        ↓
Research execution
        ↓
Specialist expansion
```

This keeps the system testable, secure, and extensible.