# Afzal Ahmad AI HQ — Application Shell Specification

**Status:** Ready for implementation  
**Version:** 1.0  
**Owner:** Afzal Ahmad  
**Repository:** `afzalahmadofficial/afzal-ai-hq`  
**Phase:** Phase 1 — Application Shell  

---

## 1. Purpose

This document defines the complete Phase 1 application shell for **Afzal Ahmad AI HQ**.

The application shell is the authenticated operator-facing layer that sits above the existing Supabase/PostgreSQL foundation and below the future AI-agent orchestration system.

The goal is not to build every agent immediately. The goal is to establish a clean, secure, extensible application framework in which Afzal can:

- sign in;
- select a project;
- access the AI HQ command center;
- view available agents;
- create and monitor tasks;
- review approvals;
- inspect activity and results;
- safely interact with the future CEO → Research Agent execution path.

The shell must be useful before the full AI system is complete.

---

## 2. Product Context

Afzal Ahmad AI HQ is a **personal AI headquarters**. Afzal is the primary owner and operator. Specialist AI agents work for him through a controlled orchestration layer.

The application should therefore feel like an operating console rather than a generic chatbot.

The primary mental model is:

```text
Afzal
  ↓
AI HQ Dashboard
  ↓
Project Context
  ↓
Command Center
  ↓
CEO / Router Agent
  ↓
Specialist Agents
  ↓
Tools + Supabase
  ↓
Tasks / Results / Reports
```

The shell must make this flow visible and understandable without exposing unnecessary implementation complexity.

---

## 3. Phase 1 Scope

### Included

- Authentication.
- Authenticated application shell.
- Project context.
- Project selector.
- Dashboard/Overview.
- Command Center.
- Agent directory.
- Task list and task details.
- Approval center foundation.
- Navigation/sidebar.
- User/profile controls.
- Supabase integration.
- Role-aware UI.
- Loading, empty, error, and unauthorized states.
- Secure API boundaries.
- Foundation for CEO → Research execution.

### Not included yet

- Full implementation of every specialist agent.
- Fully autonomous publishing.
- Unrestricted external integrations.
- Public multi-tenant SaaS functionality.
- Complex billing/subscription systems.
- Advanced analytics dashboards.
- Complete workflow automation engine.

Those belong to later implementation phases.

---

## 4. Architecture Position

```text
┌───────────────────────────────────────────────────────┐
│                     AFZAL AHMAD                       │
└──────────────────────────┬────────────────────────────┘
                           │
                           ▼
┌───────────────────────────────────────────────────────┐
│                 APPLICATION SHELL                     │
│                                                       │
│ Auth • Layout • Navigation • Projects • Command       │
│ Center • Agents • Tasks • Approvals • Activity        │
└──────────────────────────┬────────────────────────────┘
                           │
                           ▼
┌───────────────────────────────────────────────────────┐
│                    APPLICATION API                    │
│                                                       │
│ Validation • Authorization • Project Context          │
│ Task creation • Agent execution requests              │
└──────────────────────────┬────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
┌────────────────────────┐   ┌─────────────────────────┐
│ AGENT ORCHESTRATION    │   │ SUPABASE                 │
│ CEO → Specialists      │   │ Auth + PostgreSQL + RLS  │
└────────────────────────┘   └─────────────────────────┘
```

The shell must never bypass the application authorization model merely because a user is authenticated.

---

## 5. Primary User

### Owner

Afzal Ahmad is the primary system owner.

The owner can eventually:

- manage projects;
- manage members;
- configure agents;
- create tasks;
- review research;
- approve actions;
- inspect system activity;
- manage system settings.

The UI should communicate ownership clearly but should not rely on visual labels for security. Actual permissions must be enforced server-side and by database policies.

---

## 6. Supported Roles

The shell must understand the roles already established in the database architecture:

| Role | Purpose |
|---|---|
| `owner` | Full project ownership and highest privilege |
| `admin` | Administrative project management |
| `operator` | Execute operational work and agent tasks |
| `member` | Read/access permitted project information |

Role behavior should be centralized rather than duplicated across individual components.

Conceptual helper:

```ts
function can(role: ProjectRole, permission: Permission): boolean;
```

The frontend may hide unavailable controls for usability, but the backend/database remains authoritative.

---

## 7. Authentication

Supabase Auth is the authentication foundation.

### Authentication flow

```text
User opens AI HQ
      ↓
Session check
      ↓
No session ─────────→ Login
      │                  ↓
      │              Supabase Auth
      │                  ↓
      └────────────── Authenticated session
                         ↓
                   Load project context
                         ↓
                     AI HQ Shell
```

### Requirements

- Authentication must be handled through a supported Supabase Auth flow.
- Sessions must be validated before protected data is displayed.
- Logout must invalidate the local authenticated state.
- Auth errors must be user-friendly.
- Sensitive authentication details must never be logged.
- Protected routes must not briefly expose private project data before authentication is confirmed.

---

## 8. Application Route Model

Recommended route structure:

```text
/login
/
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

The exact framework syntax may change. The important architectural rule is that project-scoped routes carry an explicit project context.

---

## 9. Application Layout

The authenticated shell should use a persistent layout:

```text
┌──────────────────────────────────────────────────────────────┐
│ AI HQ                         Project ▼      Profile ▼        │
├───────────────┬──────────────────────────────────────────────┤
│               │                                              │
│ Overview      │                                              │
│ Command       │                 Main Content                 │
│ Agents        │                                              │
│ Tasks         │                                              │
│ Research      │                                              │
│ Content       │                                              │
│ Approvals     │                                              │
│ Reports       │                                              │
│ Analytics     │                                              │
│ Memory        │                                              │
│ Activity      │                                              │
│ Settings      │                                              │
│               │                                              │
└───────────────┴──────────────────────────────────────────────┘
```

### Layout requirements

- Clear active-navigation state.
- Responsive design.
- Persistent project context.
- Accessible navigation.
- Consistent page headers.
- Consistent loading/error states.
- No unnecessary visual complexity.

---

## 10. Project Selector

The selected project is one of the most important pieces of application state.

### Project selection flow

```text
Authenticated user
      ↓
Load active memberships
      ↓
Select project
      ↓
Validate membership
      ↓
Set project context
      ↓
Load project dashboard
```

Conceptual state:

```ts
interface ProjectContext {
  projectId: string;
  projectName: string;
  role: 'owner' | 'admin' | 'operator' | 'member';
}
```

### Rules

- Never trust a project ID supplied by the browser without authorization validation.
- Project changes must invalidate/refetch project-scoped data.
- Cached data from the previous project must not leak into the newly selected project.
- A user without an active membership must not access project pages.

---

## 11. Overview Dashboard

The Overview page is the AI HQ home screen after authentication.

### Recommended sections

#### Header

- Project name.
- Current role.
- Short system status.

#### Command Center shortcut

A prominent action for starting a new request.

#### Active tasks

Show:

- task name;
- agent;
- status;
- created time;
- progress where available.

#### Recent research

Show recent research outputs with source/reference counts.

#### Pending approvals

Show actions requiring Afzal's attention.

#### Recent activity

Show important system events.

### Dashboard principle

The Overview page should answer:

> **What is happening in my AI HQ right now, and what should I do next?**

---

## 12. Command Center

The Command Center is the primary interaction surface.

Example:

```text
┌──────────────────────────────────────────────────────┐
│                  COMMAND CENTER                      │
│                                                      │
│ What should AI HQ work on?                           │
│                                                      │
│ [ Find the most important AI topics for LinkedIn... ]│
│                                                      │
│              [ Start Task ]                          │
└──────────────────────────────────────────────────────┘
```

### Input requirements

The request composer should support:

- natural-language objective;
- optional agent selection later;
- optional task priority later;
- optional attachments later;
- clear submit action.

The initial version only needs the objective and project context.

### Submission flow

```text
User input
   ↓
Client validation
   ↓
Authenticated API request
   ↓
Project authorization
   ↓
Create task
   ↓
Queue CEO/Router execution
   ↓
Return task ID
   ↓
Navigate/show task status
```

The browser must not directly execute privileged agent logic.

---

## 13. Agent Directory

The Agents page provides visibility into available AI capabilities.

Each agent card should show:

- name;
- purpose;
- status;
- capabilities;
- version where appropriate;
- supported actions.

Example:

```text
┌────────────────────┐
│ CEO / Router       │
│ Strategic routing  │
│ ● Available        │
└────────────────────┘

┌────────────────────┐
│ Research Agent     │
│ Intelligence       │
│ ● Available        │
└────────────────────┘
```

The directory is informational in Phase 1. Full agent configuration belongs to later phases.

---

## 14. Tasks Page

The Tasks page is the operational control center.

### Task list fields

- Task name/title.
- Agent.
- Status.
- Created time.
- Updated time.
- Project.
- Priority when implemented.

### Statuses

The shell should support the architecture-defined lifecycle:

```text
queued
running
succeeded
partially_succeeded
failed
cancelled
needs_approval
approved
```

### Task detail page

A task detail view should show:

- objective;
- agent;
- current status;
- timestamps;
- structured output;
- references;
- errors when applicable;
- approval state;
- related tasks where applicable.

---

## 15. Research Page

The Research page provides a dedicated view for research outputs.

Initial version should support:

- recent research;
- title/summary;
- sources;
- task relationship;
- creation date;
- status.

Future versions may add filtering, source inspection, topic grouping, and research workspaces.

---

## 16. Content Page

The Content page is a future content-workspace foundation.

Phase 1 only needs the navigation and basic page structure.

Later it will support:

```text
Research
  ↓
Content angle
  ↓
Draft
  ↓
SEO/GEO review
  ↓
Approval
  ↓
Publish
```

No external publishing should be silently triggered from this page in Phase 1.

---

## 17. Approval Center

The Approval Center provides a human-in-the-loop control surface.

### Approval states

```text
pending
approved
rejected
expired/cancelled (future)
```

### Approval card

Show:

- requested action;
- requesting agent;
- reason/context;
- created time;
- risk/impact where available;
- approve/reject actions.

### Rule

An approval UI action is not itself authorization to bypass backend checks. The backend must validate that the current user can approve the request and that the approval is still valid.

---

## 18. Reports Page

The Reports page will eventually contain:

- daily intelligence reports;
- weekly summaries;
- content reports;
- competitor reports;
- system reports.

Phase 1 may use a placeholder state while preserving the final navigation structure.

---

## 19. Analytics Page

Analytics will later display:

- task volume;
- agent activity;
- content performance;
- research activity;
- workflow outcomes;
- model usage/cost estimates.

Phase 1 should provide the page shell without requiring the full analytics pipeline.

---

## 20. Memory Page

The Memory page is intended to expose useful durable AI HQ knowledge.

Potential categories:

- user preferences;
- project facts;
- decisions;
- strategies;
- durable research insights.

Secrets and unnecessary sensitive information must not be exposed through this page.

---

## 21. Activity Page

The Activity page will show important system events in chronological order.

Example:

```text
Today

14:42  Research Agent completed task
14:39  CEO Agent created research task
14:38  Afzal submitted request

Yesterday

18:10  Approval approved
17:52  Content task completed
```

Activity should be derived from durable system events rather than temporary frontend logs.

---

## 22. Settings

Settings should be divided into logical sections:

### Project settings

- project name;
- project metadata;
- membership management for authorized roles.

### Agent settings

Future configuration of enabled/disabled agents.

### Integration settings

Future external integrations.

### Security

- session/account controls;
- security status;
- authorized access information where appropriate.

### System

Future feature flags and operational settings.

Owner/admin controls must be hidden from lower-privilege roles and protected server-side.

---

## 23. Supabase Integration

Supabase provides the authenticated data foundation.

The shell interacts with:

```text
Supabase Auth
     ↓
Authenticated session
     ↓
Project membership
     ↓
Project-scoped queries
     ↓
RLS
     ↓
PostgreSQL
```

### Browser-side access

Use the normal authenticated client for data the current user is allowed to access.

### Server-side access

Use the backend for:

- orchestration;
- secrets;
- privileged operations;
- external API calls;
- service-role operations when genuinely required.

The Supabase service-role credential must never be shipped to browser code.

---

## 24. Data Access Rules

The shell must respect the existing database security architecture.

The important rule is:

> **Authenticated does not automatically mean authorized for every project.**

For project-scoped records, access must depend on active project membership and/or the relevant project role.

The existing RLS policies remain the database-level security boundary.

The application layer adds usability-oriented authorization checks, but must not weaken RLS.

---

## 25. Role-Aware UI

The UI should use a centralized permission map.

Example:

```ts
const permissions = {
  owner: ['read', 'operate', 'admin', 'approve'],
  admin: ['read', 'operate', 'admin', 'approve'],
  operator: ['read', 'operate'],
  member: ['read'],
};
```

This is illustrative only. The real permission map must match the database/security architecture.

### UI behavior

- `owner`: full project controls.
- `admin`: administrative controls.
- `operator`: operational actions.
- `member`: permitted read access.

Never use client-side role checks as the only security mechanism.

---

## 26. API Boundary

The frontend should communicate with a controlled application API for operations that require orchestration or privileged execution.

Example:

```text
Browser
  ↓
POST /api/projects/:projectId/tasks
  ↓
Validate session
  ↓
Validate project membership
  ↓
Validate request
  ↓
Create task
  ↓
Queue orchestration
  ↓
Return task ID
```

### API response pattern

Success:

```json
{
  "data": {},
  "requestId": "..."
}
```

Error:

```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not have permission to perform this action.",
    "requestId": "..."
  }
}
```

Internal stack traces and secrets must never be returned to the browser.

---

## 27. Frontend State Model

Separate state into four categories:

### Authentication state

```text
loading
unauthenticated
authenticated
error
```

### Project state

```text
loading
selected
no_projects
forbidden
error
```

### Server state

Data retrieved from Supabase/API.

### UI state

Temporary state such as open dialogs, selected filters, and composer text.

Do not duplicate durable server state unnecessarily in local component state.

---

## 28. Loading States

Every major screen must have an intentional loading state.

Examples:

- skeleton cards;
- loading table rows;
- disabled submit button while request is processing;
- task status indicator.

Avoid blank screens during normal network operations.

---

## 29. Empty States

Empty states should tell the user what the system expects next.

Examples:

### No projects

> No AI HQ projects are available for your account.

### No tasks

> No tasks yet. Start a request from the Command Center.

### No approvals

> You have no pending approvals.

### No research

> No research has been completed for this project yet.

---

## 30. Error States

Errors should be actionable and understandable.

The UI should distinguish:

- authentication failure;
- network failure;
- validation error;
- permission failure;
- missing project;
- task failure;
- agent failure;
- integration failure.

Do not display raw database or provider errors unless they are intentionally normalized for user consumption.

---

## 31. Unauthorized and Forbidden States

A user may be authenticated but not authorized for a project or operation.

Expected behavior:

```text
401 → Authentication required
403 → Authenticated but not authorized
404 → Resource not available / not found
422 → Invalid request
429 → Rate limit
500 → Unexpected server failure
```

The exact HTTP implementation may vary, but semantic distinction must remain.

---

## 32. Command Center → CEO Agent Foundation

The shell's most important future integration is the CEO Agent.

Phase 1 should establish the contract without requiring every agent to be implemented.

```text
Command Center
      ↓
Create task
      ↓
CEO Agent
      ↓
Classify objective
      ↓
Select specialist
      ↓
Create child task
```

The Command Center should therefore create a durable task rather than directly calling a specialist model from the browser.

---

## 33. CEO → Research Execution Path

The first real vertical slice should be:

```text
Afzal
  ↓
Command Center
  ↓
POST task
  ↓
CEO / Router
  ↓
Research Agent
  ↓
Search / Source tools
  ↓
Research result
  ↓
Supabase persistence
  ↓
Task = succeeded
  ↓
Dashboard displays result
```

### Required result information

- task ID;
- objective;
- summary;
- structured findings;
- source references;
- completion status;
- timestamps.

---

## 34. Task UI Contract

The frontend should not need to understand every internal agent operation.

It should consume a stable task representation:

```ts
interface TaskViewModel {
  id: string;
  projectId: string;
  title: string;
  status: TaskStatus;
  agentId?: string;
  createdAt: string;
  updatedAt: string;
  result?: unknown;
  error?: {
    code: string;
    message: string;
  };
}
```

This makes the UI resilient as the internal orchestration system evolves.

---

## 35. Security Requirements

The application shell must enforce the following baseline rules:

1. No service-role credential in client code.
2. No LLM provider secret in client code.
3. No external integration secret in client code.
4. Project IDs must be authorization-checked.
5. Role checks must be enforced server-side.
6. RLS must remain enabled for protected project data.
7. External content must be treated as untrusted.
8. High-impact actions must use approval workflows.
9. Sensitive values must be redacted from logs.
10. API errors must not expose internal secrets or stack traces.
11. Browser state must not become the source of truth for authorization.
12. Cross-project data must never be returned to an unauthorized user.

---

## 36. Prompt-Injection Boundary

The shell itself must not treat user-visible research or external content as trusted system instructions.

Trust hierarchy:

```text
System / application rules
        ↓
Authenticated user request
        ↓
Agent instructions
        ↓
External research data
```

External documents, webpages, social posts, and search results may contain malicious instructions. They are data to analyze, not authority to execute commands.

---

## 37. Accessibility

The shell should be accessible from the beginning.

Requirements:

- keyboard-accessible navigation;
- visible focus states;
- semantic buttons/links;
- sufficient text contrast;
- accessible form labels;
- useful error messages;
- status indicators understandable without color alone;
- responsive layouts.

Accessibility should be treated as part of the component architecture, not a final cleanup step.

---

## 38. Responsive Design

The application should work across:

- desktop;
- laptop;
- tablet;
- mobile where practical.

The desktop experience is the primary operator workspace, but navigation and command submission should remain usable on smaller screens.

---

## 39. Component Architecture

Recommended conceptual component hierarchy:

```text
AppShell
├── AuthGuard
├── ProjectProvider
├── AppLayout
│   ├── TopBar
│   │   ├── ProjectSelector
│   │   └── UserMenu
│   ├── Sidebar
│   └── MainContent
│       ├── OverviewPage
│       ├── CommandCenterPage
│       ├── AgentsPage
│       ├── TasksPage
│       ├── TaskDetailPage
│       ├── ResearchPage
│       ├── ContentPage
│       ├── ApprovalsPage
│       ├── ReportsPage
│       ├── AnalyticsPage
│       ├── MemoryPage
│       ├── ActivityPage
│       └── SettingsPage
```

Reusable UI primitives should be shared rather than recreated for every page.

---

## 40. Design System Direction

The interface should communicate:

- professional;
- focused;
- intelligent;
- trustworthy;
- operational;
- calm.

Avoid:

- excessive animation;
- noisy dashboards;
- unnecessary gradients;
- decorative elements that obscure task status;
- generic chatbot-only layouts.

The visual hierarchy should prioritize **what needs Afzal's attention now**.

---

## 41. Notifications

The shell should eventually support notifications for:

- task completion;
- task failure;
- approval requests;
- important reports;
- integration failures.

Phase 1 can use in-app status indicators before implementing advanced push/email notifications.

---

## 42. Auditability

User actions that matter operationally should be traceable.

Examples:

- task created;
- task cancelled;
- approval approved;
- approval rejected;
- project membership changed;
- critical setting changed.

Where applicable, associate events with:

```text
user_id
project_id
task_id
request_id
timestamp
action
```

---

## 43. Performance Requirements

The shell should feel responsive even when agent execution is slow.

Therefore:

- task creation should return quickly;
- long-running execution should happen asynchronously;
- task status should be observable;
- large result payloads should not unnecessarily block the main dashboard;
- expensive queries should be paginated where appropriate.

The user should never need to keep a browser tab open merely to allow a long-running agent task to finish.

---

## 44. Caching and Data Freshness

Caching may be used for non-sensitive UI performance, but authorization-sensitive data must always be validated against current permissions.

When project context changes:

```text
Old project cache
      ↓
Invalidate
      ↓
New project context
      ↓
Fetch authorized data
```

Avoid displaying stale data from another project while the new project is loading.

---

## 45. Testing Strategy

### Authentication tests

- unauthenticated user is redirected to login;
- authenticated user reaches shell;
- logout removes access.

### Authorization tests

- member cannot access admin controls;
- operator cannot perform admin-only actions;
- unauthorized project access returns forbidden/not-found behavior;
- owner retains full access.

### Project isolation tests

- project A data cannot appear in project B;
- switching projects invalidates prior data;
- task creation uses selected project ID only after server authorization.

### Task tests

- valid task creates successfully;
- invalid task is rejected;
- task status renders correctly;
- failed task shows normalized error;
- completed task shows result.

### End-to-end test

```text
Login
 ↓
Select project
 ↓
Open Command Center
 ↓
Submit research request
 ↓
Task created
 ↓
CEO executes
 ↓
Research executes
 ↓
Result persisted
 ↓
Task completed
 ↓
Dashboard displays result
```

---

## 46. Observability

Every meaningful API request should have a request/correlation ID.

Example:

```text
requestId: req_abc123
projectId: project_xyz
userId: user_xyz
taskId: task_123
agentId: research_agent
```

The browser should not receive internal secrets or sensitive diagnostic data.

---

## 47. Deployment Configuration

The shell should distinguish between public and private environment variables.

### Public/client-safe

Only values intentionally required by browser-side SDK initialization.

### Server-only

- LLM API keys;
- service-role credentials;
- OAuth client secrets;
- integration tokens;
- internal signing secrets.

All secrets must be configured through the deployment environment and excluded from Git.

---

## 48. Repository Implementation Direction

The application may eventually evolve toward:

```text
afzal-ai-hq/
├── docs/
├── supabase/
├── app/
│   ├── routes/
│   ├── components/
│   ├── layouts/
│   ├── providers/
│   └── lib/
├── server/
│   ├── api/
│   ├── auth/
│   ├── orchestration/
│   └── services/
├── agents/
├── tools/
└── tests/
```

Exact framework-specific naming may change. Responsibilities should remain separated.

---

## 49. Phase 1 Implementation Order

Implement in this order:

### Step 1 — Application foundation

- Choose frontend runtime/framework.
- Create application entry point.
- Establish environment configuration.
- Establish shared UI foundation.

### Step 2 — Authentication

- Connect Supabase Auth.
- Build login/session guard.
- Add logout.

### Step 3 — Project context

- Load memberships.
- Build project selector.
- Persist selected project in application state.
- Enforce server authorization.

### Step 4 — App shell

- Sidebar.
- Top bar.
- Profile menu.
- Protected routes.
- Page layout.

### Step 5 — Overview

- Active tasks.
- Recent activity.
- Pending approvals.
- Command Center shortcut.

### Step 6 — Command Center

- Request composer.
- Validation.
- Task creation endpoint.
- Task status navigation.

### Step 7 — Tasks

- Task list.
- Task details.
- Status states.
- Result rendering.

### Step 8 — Agent directory

- Agent cards.
- Availability.
- Capability summaries.

### Step 9 — Approval foundation

- Pending approval list.
- Detail view.
- Approve/reject controls.
- Server-side authorization.

### Step 10 — First AI vertical slice

Connect:

```text
Command Center
   ↓
CEO Agent
   ↓
Research Agent
   ↓
Supabase
   ↓
Task result
   ↓
Dashboard
```

---

## 50. Definition of Done

Phase 1 is complete when Afzal can:

1. Open AI HQ.
2. Authenticate securely.
3. See only projects he is authorized to access.
4. Select a project.
5. View the Overview dashboard.
6. Open the Command Center.
7. Submit a request.
8. Receive a durable task ID.
9. Monitor task status.
10. Open task details.
11. View the resulting output.
12. See source/reference information when provided.
13. View available agents.
14. See pending approvals when applicable.
15. Navigate the application without encountering broken protected routes.
16. Confirm that project data remains isolated.

For the first AI vertical slice, the request must successfully travel through:

```text
Afzal
 → Command Center
 → CEO Agent
 → Research Agent
 → Supabase
 → Task Result
 → Dashboard
```

---

## 51. Acceptance Criteria

### Security

- [ ] Authentication is required for protected application pages.
- [ ] Project membership is validated.
- [ ] Role permissions are enforced server-side.
- [ ] RLS remains active.
- [ ] Service-role credentials are never exposed to the client.
- [ ] External content is treated as untrusted.

### UX

- [ ] Navigation is consistent.
- [ ] Project context is always visible.
- [ ] Loading states exist.
- [ ] Empty states exist.
- [ ] Error states exist.
- [ ] Mobile/responsive behavior is usable.
- [ ] Keyboard navigation works for primary actions.

### Data

- [ ] Project-scoped queries use the selected project context.
- [ ] Cross-project data cannot leak.
- [ ] Task state is persisted.
- [ ] Important actions can be audited.

### AI foundation

- [ ] Command Center can create a task.
- [ ] Task can be routed to CEO/Router.
- [ ] CEO can create/delegate a Research task.
- [ ] Research result can be persisted.
- [ ] Dashboard can display the result.

---

## 52. Architectural Guardrails

The following rules should remain true as the product grows:

### Guardrail 1

**The browser is an interface, not the authority.**

### Guardrail 2

**Supabase RLS is a security boundary, not an optional optimization.**

### Guardrail 3

**Agents operate through explicit contracts and tools.**

### Guardrail 4

**Long-running work is represented by durable tasks.**

### Guardrail 5

**High-impact external actions require explicit approval unless a deliberate policy says otherwise.**

### Guardrail 6

**Project context must follow every project-scoped operation.**

### Guardrail 7

**Secrets stay server-side.**

### Guardrail 8

**The first working vertical slice is more valuable than prematurely implementing every agent.**

---

## 53. Future Expansion

Once the shell and first vertical slice are stable, the same application foundation can support:

```text
CEO Agent
├── Research Agent
├── Content Strategy Agent
├── SEO Agent
├── GEO Agent
├── LinkedIn Agent
├── Blog Agent
├── Newsletter Agent
├── Competitor Intelligence Agent
├── Analytics Agent
├── Memory Agent
└── Reporting Agent
```

Each new capability should plug into the existing task, authorization, tool, approval, and observability architecture rather than creating an independent mini-application.

---

## 54. Related Documents

- `docs/01_Vision.md`
- `docs/06_Architecture/APPLICATION_ARCHITECTURE.md`
- `docs/06_Architecture/SUPABASE_DATABASE_ARCHITECTURE.md`
- `docs/06_Architecture/RLS_AUTHENTICATION_ARCHITECTURE.md`
- `docs/06_Architecture/RLS_SECURITY_REVIEW.md`
- `docs/06_Architecture/SUPABASE_DEPLOYMENT_PREFLIGHT.md`
- `docs/03_Agents/CEO_AGENT.md`
- `docs/03_Agents/RESEARCH_AGENT.md`

---

## 55. Next Action

After this specification is accepted, the implementation should begin with:

> **Build the authenticated application shell and project context first. Then implement the Command Center and connect it to the first durable task endpoint.**

Only after that foundation is working should the CEO → Research execution path be connected.

---

**Document owner:** Afzal Ahmad  
**Status:** Approved for Phase 1 implementation