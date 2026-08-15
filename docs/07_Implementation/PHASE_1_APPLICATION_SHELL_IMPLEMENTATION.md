# Afzal Ahmad AI HQ — Phase 1 Application Shell Implementation

**Status:** Ready for implementation  
**Version:** 1.0  
**Phase:** Phase 1 — Application Shell  
**Owner:** Afzal Ahmad  
**Repository:** `afzalahmadofficial/afzal-ai-hq`

---

## 1. Objective

Build the first working application layer on top of the existing Supabase foundation.

The Phase 1 goal is a secure authenticated shell where the owner can select a project, open the Command Center, create a durable task, monitor its lifecycle, and prepare the system for the first CEO → Research Agent vertical slice.

This phase deliberately prioritizes a small, working, secure path over implementing every AI agent.

---

## 2. Target Outcome

At the end of Phase 1:

```text
Afzal
  ↓
Login
  ↓
Supabase Auth
  ↓
Project Membership
  ↓
Project Selector
  ↓
AI HQ Dashboard
  ↓
Command Center
  ↓
Create Task
  ↓
Task Status
  ↓
CEO / Router integration point
```

The first end-to-end AI slice can then extend the task into:

```text
CEO / Router
  ↓
Research Agent
  ↓
Research Result
  ↓
Supabase
  ↓
Task Result
  ↓
Dashboard
```

---

## 3. Implementation Principles

1. **Security before convenience.**
2. **Database RLS remains authoritative.**
3. **The browser is not a trusted authorization boundary.**
4. **Project context must accompany every project-scoped operation.**
5. **Long-running work is represented by durable tasks.**
6. **Agents are invoked through controlled server-side orchestration.**
7. **Secrets never enter client-side code.**
8. **Use reusable components instead of page-specific duplication.**
9. **Normalize errors at the API boundary.**
10. **Build one complete vertical slice before expanding the agent fleet.**

---

## 4. Phase Boundaries

### In scope

- Authentication.
- Session management.
- Protected routes.
- Project membership loading.
- Project selector.
- Application layout.
- Dashboard.
- Command Center.
- Task creation.
- Task list/detail foundation.
- Role-aware UI.
- Error/loading/empty states.
- Security validation.
- CEO integration boundary.

### Out of scope

- Full autonomous agent fleet.
- Automatic publishing.
- Complex external integrations.
- Billing.
- Public multi-tenant onboarding.
- Advanced analytics.
- Production-grade background worker infrastructure beyond what is required for the first vertical slice.

---

## 5. Route Plan

Recommended protected route model:

```text
/login

/projects
/projects/:projectId
/projects/:projectId/command
/projects/:projectId/agents
/projects/:projectId/tasks
/projects/:projectId/tasks/:taskId
/projects/:projectId/research
/projects/:projectId/content
/projects/:projectId/approvals
/projects/:projectId/reports
/projects/:projectId/analytics
/projects/:projectId/memory
/projects/:projectId/activity
/projects/:projectId/settings
```

The framework may use a different routing syntax. The architectural requirement is explicit project context.

---

## 6. Recommended Frontend Structure

Framework-neutral target structure:

```text
app/
├── routes/
│   ├── login/
│   ├── projects/
│   └── project/
├── components/
│   ├── shell/
│   ├── navigation/
│   ├── projects/
│   ├── tasks/
│   ├── agents/
│   ├── approvals/
│   └── ui/
├── providers/
│   ├── auth-provider
│   └── project-provider
├── lib/
│   ├── supabase/
│   ├── api/
│   ├── auth/
│   ├── permissions/
│   └── validation/
└── types/
```

Responsibilities should remain separated even if actual filenames differ.

---

## 7. Authentication Implementation

### Required flow

```text
Application start
  ↓
Check Supabase session
  ↓
Loading
  ├── No session → /login
  └── Session → load memberships
```

### Components

- `AuthProvider`
- `AuthGuard`
- `LoginPage`
- `UserMenu`
- `LogoutAction`

### Requirements

- Never render protected project data before session verification.
- Keep auth state centralized.
- Subscribe to auth/session changes according to the chosen Supabase client pattern.
- Clear project context when the user signs out.
- Normalize auth errors.

---

## 8. Supabase Client Separation

Maintain a clear distinction between:

### Client-safe Supabase client

Used for authenticated user operations that are safe under RLS.

### Server-only privileged client

Used only when a server-side operation genuinely requires elevated privileges.

```text
Browser
  ↓
User session
  ↓
RLS-protected Supabase access
```

and, separately:

```text
Server
  ↓
Validated user + project permission
  ↓
Privileged operation if required
```

The service-role key must never be exposed to browser JavaScript.

---

## 9. Project Membership Loading

After authentication, load the user's active project memberships.

Conceptually:

```sql
select project_id, user_id, role, status
from project_members
where user_id = current_user
  and status = 'active';
```

The exact query must follow the existing schema and RLS architecture.

### Important

Do not rely on a browser-supplied `user_id` for authorization.

The authenticated identity comes from the Supabase session/token context.

---

## 10. Project Provider

Create a centralized project context.

Conceptual interface:

```ts
interface ProjectContext {
  projectId: string | null;
  projectName: string | null;
  role: 'owner' | 'admin' | 'operator' | 'member' | null;
  memberships: ProjectMembership[];
  loading: boolean;
  error: string | null;
  selectProject: (projectId: string) => void;
}
```

### Rules

- Selected project must belong to the authenticated user.
- Switching projects clears or invalidates project-scoped server state.
- Project context must not be treated as proof of authorization.
- The server revalidates the project membership on mutations.

---

## 11. Project Selector

Build the selector in the top navigation.

```text
Afzal Ahmad AI HQ        [ My AI HQ ▼ ]        Profile
```

If multiple projects exist:

```text
My AI HQ
Content Lab
Research Lab
```

If only one project exists, it may be selected automatically while still showing the active project context.

### Failure states

- no active projects;
- project not found;
- membership revoked;
- network failure.

---

## 12. Protected Application Shell

Build the shell only after authentication and project context are available.

```text
AuthGuard
   ↓
ProjectGuard
   ↓
AppLayout
   ├── TopBar
   ├── Sidebar
   └── PageContent
```

### Sidebar

```text
Overview
Command Center
Agents
Tasks
Research
Content
Approvals
Reports
Analytics
Memory
Activity
Settings
```

Navigation visibility can be role-aware, but server-side authorization remains mandatory.

---

## 13. Permission Model

Create one centralized permission layer.

Conceptual model:

```ts
can(role, permission)
```

Suggested permission groups:

```text
read
operate
approve
manage_members
manage_settings
manage_agents
```

Map these permissions to the existing roles rather than scattering role comparisons throughout the UI.

Example principle:

```text
owner   → all
admin   → admin + operational
operator → operational
member  → read
```

The exact mapping must remain consistent with database policies.

---

## 14. Overview Dashboard Implementation

Build the dashboard around four initial cards/sections:

### Active Tasks

Show recent non-terminal tasks.

### Pending Approvals

Show approval requests requiring attention.

### Recent Research

Show the latest research outputs if available.

### Recent Activity

Show important system events.

The dashboard should be useful even before agents are fully implemented.

---

## 15. Command Center Implementation

The Command Center is the first mutation surface.

UI:

```text
What should AI HQ work on?

┌─────────────────────────────────────────────┐
│ Research the latest AI automation trends... │
└─────────────────────────────────────────────┘

                [ Start Task ]
```

### Client validation

Minimum requirements:

- non-empty objective;
- reasonable maximum length;
- valid project context;
- authenticated session.

Client validation improves UX but does not replace server validation.

---

## 16. Task Creation API

Recommended endpoint:

```http
POST /api/projects/:projectId/tasks
```

Request:

```json
{
  "title": "Research AI automation trends",
  "objective": "Find the most important AI automation developments for LinkedIn content."
}
```

Server flow:

```text
Request
 ↓
Validate session
 ↓
Validate project membership
 ↓
Validate role/permission
 ↓
Validate payload
 ↓
Create task
 ↓
Create system event
 ↓
Queue CEO execution
 ↓
Return task ID
```

Response:

```json
{
  "data": {
    "taskId": "...",
    "status": "queued"
  },
  "requestId": "..."
}
```

---

## 17. Task Lifecycle

Use a durable status model.

```text
queued
  ↓
running
  ├── succeeded
  ├── partially_succeeded
  ├── failed
  ├── cancelled
  └── needs_approval
```

When an approval is resolved, the task may continue according to orchestration rules.

The UI must not infer task status from local timers.

---

## 18. Tasks List

The initial Tasks page should support:

- pagination or bounded recent list;
- status filter;
- agent filter when agent assignments exist;
- created date;
- task title;
- status indicator.

Example:

| Task | Agent | Status | Created |
|---|---|---|---|
| AI trends research | CEO → Research | Running | Today |
| LinkedIn content ideas | CEO | Queued | Today |

---

## 19. Task Detail

Task detail should show:

```text
Objective
Agent
Status
Created
Updated

Result
────────────
Structured output / summary

Sources
────────────
References

Errors
────────────
Normalized failure information
```

Do not expose internal stack traces, provider credentials, or hidden prompts.

---

## 20. CEO Integration Boundary

The application shell must call a stable orchestration interface rather than directly invoking model providers.

Conceptual interface:

```ts
interface Orchestrator {
  enqueueTask(input: {
    projectId: string;
    taskId: string;
    objective: string;
  }): Promise<void>;
}
```

The implementation may later route to:

```text
CEO / Router
  ↓
Research Agent
  ↓
Content Agent
  ↓
SEO Agent
  ↓
Other specialists
```

The shell should not need to know those internal routing details.

---

## 21. First Vertical Slice

The first implementation milestone after the shell is:

```text
Command Center
   ↓
Task creation
   ↓
CEO / Router
   ↓
Research Agent
   ↓
Research result
   ↓
Supabase persistence
   ↓
Task = succeeded
   ↓
Task detail displays result
```

This is the most important proof that the architecture is real rather than documentation-only.

---

## 22. RLS and Security Validation

Before connecting mutations, verify the database security layer.

Required checks:

- authenticated user can access their active membership;
- member can read permitted project data;
- operator can perform permitted operational actions;
- admin/owner can perform administrative actions;
- unauthorized project access is denied;
- project-scoped tables remain isolated.

Never disable RLS to make the application work.

---

## 23. API Error Contract

Use normalized application errors.

```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not have permission to perform this action.",
    "requestId": "req_123"
  }
}
```

Recommended codes:

```text
UNAUTHENTICATED
FORBIDDEN
VALIDATION_ERROR
PROJECT_NOT_FOUND
TASK_NOT_FOUND
TASK_CREATE_FAILED
AGENT_UNAVAILABLE
RATE_LIMITED
INTERNAL_ERROR
```

---

## 24. Loading, Empty and Error States

Every page must define all three states.

### Loading

Use skeletons/spinners appropriate to the operation.

### Empty

Explain what the user can do next.

### Error

Show a useful message and retry action when retrying is safe.

Example:

```text
No tasks yet.
Start your first AI HQ task from the Command Center.

[ Open Command Center ]
```

---

## 25. Activity and Audit Events

Important mutations should generate traceable events.

Examples:

```text
TASK_CREATED
TASK_STARTED
TASK_COMPLETED
TASK_FAILED
APPROVAL_REQUESTED
APPROVAL_APPROVED
APPROVAL_REJECTED
PROJECT_MEMBER_CHANGED
```

Where supported, associate:

```text
user_id
project_id
task_id
request_id
timestamp
```

---

## 26. Observability

Every API mutation should have a request/correlation ID.

Example:

```text
requestId = req_abc123
projectId = project_xyz
taskId = task_123
```

Use the same ID through application logs and orchestration boundaries where practical.

Never log secrets, access tokens, or sensitive prompt contents unnecessarily.

---

## 27. Validation Checklist Before Coding

Before implementation begins, confirm:

- [ ] Supabase project is available.
- [ ] Auth is enabled/configured.
- [ ] `project_members` exists and is secured.
- [ ] Project RLS policies are active.
- [ ] `agents` policies are active.
- [ ] `agent_tasks` policies are active.
- [ ] Content/research/approval policies are active.
- [ ] Security helper functions are present.
- [ ] Owner/admin/operator/member roles are consistent.
- [ ] Required environment variables are available.
- [ ] Secrets are not committed to Git.

---

## 28. Implementation Sequence

### Milestone 1 — Auth

1. Create application entry point.
2. Configure Supabase client.
3. Implement session provider.
4. Implement login.
5. Implement logout.
6. Implement protected route guard.

### Milestone 2 — Project Context

1. Query active memberships.
2. Create project provider.
3. Build selector.
4. Validate selection.
5. Handle no-project state.

### Milestone 3 — Shell

1. Build app layout.
2. Build sidebar.
3. Build top bar.
4. Add profile menu.
5. Add role-aware navigation.

### Milestone 4 — Dashboard

1. Active tasks.
2. Approvals.
3. Recent research.
4. Activity.
5. Loading/empty/error states.

### Milestone 5 — Command Center

1. Composer.
2. Client validation.
3. Task creation API.
4. Server authorization.
5. Task ID response.

### Milestone 6 — Task UI

1. Task list.
2. Task detail.
3. Status rendering.
4. Result rendering.
5. Error rendering.

### Milestone 7 — CEO Integration

1. Create orchestration interface.
2. Connect task queue/execution boundary.
3. Implement CEO/router request contract.
4. Persist execution status.

### Milestone 8 — Research Agent

1. Define research task contract.
2. Execute research.
3. Store sources/results.
4. Update task status.
5. Render result in UI.

---

## 29. Definition of Done

Phase 1 is complete when all of the following are true:

### Authentication

- [ ] Login works.
- [ ] Logout works.
- [ ] Protected routes require authentication.

### Project security

- [ ] Only active memberships are selectable.
- [ ] Project access is revalidated server-side.
- [ ] Cross-project data cannot leak.

### Shell

- [ ] Sidebar works.
- [ ] Top bar works.
- [ ] Project selector works.
- [ ] Responsive behavior works.

### Tasks

- [ ] Command Center creates a task.
- [ ] Task persists in Supabase.
- [ ] Task list displays it.
- [ ] Task detail displays it.
- [ ] Status updates are observable.

### AI

- [ ] CEO integration point exists.
- [ ] Research Agent integration point exists.
- [ ] First research request can complete end-to-end.

### Security

- [ ] RLS remains enabled.
- [ ] No service-role key is exposed client-side.
- [ ] Secrets are not committed.
- [ ] Authorization is not dependent on frontend checks.

---

## 30. Acceptance Test

Perform this exact test after implementation:

```text
1. Open AI HQ.
2. Confirm unauthenticated user reaches Login.
3. Sign in.
4. Confirm active projects load.
5. Select the AI HQ project.
6. Confirm dashboard loads only project-authorized data.
7. Open Command Center.
8. Submit:
   "Research the most important AI automation trends for my LinkedIn audience."
9. Confirm a task is created.
10. Confirm task status becomes queued/running.
11. Confirm CEO receives the task.
12. Confirm Research Agent receives the delegated task.
13. Confirm research result is persisted.
14. Confirm task becomes succeeded.
15. Open task detail.
16. Confirm summary and sources are visible.
17. Confirm activity contains the task lifecycle.
18. Test an unauthorized project ID.
19. Confirm access is denied.
```

---

## 31. Rollback Strategy

Each implementation milestone should be independently deployable where practical.

If a new feature causes a security or data-integrity problem:

1. Disable the feature route or mutation.
2. Preserve existing database security policies.
3. Stop privileged orchestration.
4. Inspect logs using request IDs.
5. Correct the implementation.
6. Re-run security and end-to-end tests.

Never solve a production problem by broadly disabling RLS or authorization.

---

## 32. Immediate Next Coding Action

The first coding task is now explicitly defined:

> **Build the authenticated application shell with Supabase session handling and project membership selection.**

Do not implement the full CEO agent yet.

The immediate code path is:

```text
Supabase Auth
    ↓
Session Provider
    ↓
Auth Guard
    ↓
Project Membership Query
    ↓
Project Provider
    ↓
Project Selector
    ↓
Protected App Layout
```

Once that works, move to the Command Center and durable task creation.

---

## 33. Related Documents

- `docs/06_Architecture/APPLICATION_ARCHITECTURE.md`
- `docs/06_Architecture/APPLICATION_SHELL_SPECIFICATION.md`
- `docs/01_Vision.md`
- `docs/03_Agents/CEO_AGENT.md`
- `docs/03_Agents/RESEARCH_AGENT.md`
- `docs/06_Architecture/RLS_SECURITY_REVIEW.md`
- `docs/06_Architecture/SUPABASE_DEPLOYMENT_PREFLIGHT.md`

---

**Status:** Ready for implementation  
**Next milestone:** Authentication + Project Context + Protected Application Shell