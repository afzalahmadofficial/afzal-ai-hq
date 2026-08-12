# RLS & Authentication Architecture

**Version:** 1.0  
**Project:** Afzal Ahmad AI HQ  
**Status:** Approved Architecture  
**Priority:** Critical

## 1. Purpose

Define how Supabase Auth, project membership, roles, and PostgreSQL Row Level Security (RLS) work together to protect AI HQ data.

## 2. Security Model

```text
Supabase Auth
      ↓
auth.uid()
      ↓
Project Membership
      ↓
Role / Permission
      ↓
RLS Policy
      ↓
Project-Scoped Data
```

Authentication answers **who the user is**. Authorization answers **what that user may access or change**.

## 3. Security Principles

- Deny access by default.
- Scope application data to a project/workspace.
- Use RLS for database-level enforcement.
- Do not rely only on frontend authorization checks.
- Keep privileged service credentials server-side.
- Separate human permissions from agent/service permissions.
- Log material security-sensitive actions.

## 4. Supabase Auth

Supabase Auth is the identity layer.

The database should reference the authenticated user's UUID rather than storing duplicate passwords or authentication secrets.

Use `auth.uid()` inside RLS policies to identify the current authenticated user.

## 5. Project Membership

AI HQ requires a project-membership relationship so users can belong to one or more projects.

Recommended logical table:

### `project_members`

- `id` UUID PK
- `project_id` FK → `projects.id`
- `user_id` UUID → `auth.users.id`
- `role`
- `status`
- `created_at`
- `updated_at`

Recommended unique constraint:

```text
(project_id, user_id)
```

## 6. Roles

Initial roles:

| Role | Purpose |
|---|---|
| `owner` | Full project control |
| `admin` | Configuration and operational management |
| `operator` | Execute workflows, tasks and content operations |
| `viewer` | Read-only access |

Role names should remain centralized and constrained rather than being arbitrary strings.

## 7. Permission Matrix

| Capability | Owner | Admin | Operator | Viewer |
|---|---:|---:|---:|---:|
| View project data | Yes | Yes | Yes | Yes |
| Manage agents | Yes | Yes | No | No |
| Manage workflows | Yes | Yes | Limited | No |
| Run tasks | Yes | Yes | Yes | No |
| Manage content | Yes | Yes | Yes | Read |
| Request approvals | Yes | Yes | Yes | No |
| Approve sensitive actions | Yes | Yes | No | No |
| Manage members | Yes | Yes | No | No |
| Change security policy | Yes | Limited | No | No |

High-risk operations may require explicit human approval regardless of role.

## 8. RLS Baseline

All application tables exposed through Supabase APIs should have RLS enabled.

Default posture:

```text
No matching policy
       ↓
Access denied
```

Policies should normally verify project membership before granting access.

## 9. Project Membership Policy Pattern

Conceptually:

```sql
exists (
  select 1
  from project_members pm
  where pm.project_id = <row>.project_id
    and pm.user_id = auth.uid()
    and pm.status = 'active'
)
```

Actual SQL should use the correct table aliases and policy operation for each table.

## 10. Read Policies

Users may read rows only when they have active membership in the associated project.

Viewer, operator, admin, and owner roles may generally read project-scoped operational data, subject to additional sensitivity restrictions.

## 11. Write Policies

Write permissions should be role-specific.

Examples:

- Viewer: no writes
- Operator: operational/content/task writes
- Admin: configuration and membership administration
- Owner: full project administration

Avoid broad policies such as `authenticated users can update`.

## 12. Sensitive Tables

Additional restrictions should apply to sensitive records such as:

- Approvals
- Security events
- System events
- Agent configuration
- Integration configuration
- Internal operational metadata

Do not expose secrets even if the user has project membership.

## 13. Service / Agent Access

AI agents are application actors, not human users.

Agent execution should occur through trusted server-side infrastructure or narrowly scoped database functions/API endpoints.

Never place a Supabase service-role key in:

- Browser JavaScript
- Public repositories
- Client-side environment variables
- User-visible prompts

## 14. Service Role Boundary

The Supabase service role can bypass RLS and is therefore highly privileged.

It must only be used in trusted server-side environments.

Every operation using privileged access should have a clear purpose and should not be exposed directly to arbitrary user input.

## 15. Agent Identity

Where agent actions need attribution, use an application-level agent identity such as:

- `agent_id`
- `actor_type = 'agent'`
- `actor_id`

Do not pretend an AI agent is a human Supabase Auth user unless there is a deliberate, documented reason.

## 16. Human Approval Boundary

Sensitive external actions should pass through the approval system even if an operator or agent has technical permission to request them.

```text
Agent
 ↓
Action Proposal
 ↓
Risk Check
 ↓
Human Approval
 ↓
Execution
 ↓
Audit Event
```

See `HUMAN_APPROVAL_WORKFLOW.md`.

## 17. Ownership Rules

Project ownership should be explicit through the membership model.

There should be a controlled mechanism for:

- Initial owner assignment
- Owner transfer
- Admin assignment
- Member removal

Avoid allowing arbitrary clients to promote themselves to owner/admin.

## 18. Account Lifecycle

Handle:

- Sign-up
- Email verification where enabled
- Login
- Logout
- Account disablement
- Membership removal
- Project deletion/archival

Removing a user from a project should immediately prevent further project-scoped access.

## 19. RLS Testing

Every policy should have positive and negative tests.

Test cases should include:

1. Owner can access own project.
2. Admin can access permitted administrative rows.
3. Operator can perform allowed operations.
4. Viewer cannot modify protected rows.
5. User from another project cannot access rows.
6. Removed member loses access.
7. Unauthenticated user cannot access protected data.
8. Sensitive records remain protected.

## 20. Cross-Project Isolation

A user belonging to Project A must not automatically access Project B.

Every project-scoped table should enforce the project boundary directly or through a safe relationship.

## 21. Public Data

AI HQ should not assume that authenticated data is public.

If a future table is intentionally public, create an explicit public-read policy for that table and document why it is safe.

## 22. Database Functions

Security-sensitive helper functions should use deliberate execution privileges and search-path controls.

Avoid security-definer functions that accidentally expose unrestricted data.

Review function ownership and permissions as part of security changes.

## 23. API Exposure

Only required tables/functions should be exposed through the Supabase Data API.

For sensitive operations, prefer controlled server-side functions or application APIs rather than exposing unrestricted table writes.

## 24. Audit Logging

Material security actions should produce system/audit events, including:

- Member added/removed
- Role changed
- Approval granted/rejected
- Security configuration changed
- Sensitive operation executed
- Authentication/security incident

Never log passwords, tokens, API keys, or equivalent secrets.

## 25. Migration Sequence

RLS implementation should follow this order:

1. Create `project_members`.
2. Add required user/project relationships.
3. Define role/status constraints.
4. Create membership helper logic where needed.
5. Enable RLS on application tables.
6. Add SELECT policies.
7. Add INSERT/UPDATE/DELETE policies by role.
8. Add sensitive-table restrictions.
9. Test cross-project isolation.
10. Test all role combinations.
11. Record security review.

## 26. Failure-Safe Behavior

If authorization information cannot be verified, the safe default is **deny**.

Do not fall back to broad access because a membership lookup failed.

## 27. Future Expansion

Potential future controls:

- Fine-grained permissions
- Team-level roles
- Temporary access
- Approval-specific permissions
- API/service identities
- Audit dashboards
- Security alerts

Do not introduce complex RBAC until MVP requirements justify it.

## 28. Success Criteria

The architecture succeeds when authenticated users can access only the projects and actions permitted by their role, cross-project data is isolated, agents cannot expose privileged credentials, sensitive operations have appropriate approval controls, and database security remains enforced even if frontend checks are bypassed.

## Related Documents

- SUPABASE_DATABASE_ARCHITECTURE.md
- DATABASE_MIGRATION_PLAN.md
- SECURITY_WORKFLOW.md
- HUMAN_APPROVAL_WORKFLOW.md
- CHANGE_MANAGEMENT_WORKFLOW.md
- INCIDENT_RESPONSE_WORKFLOW.md

## Status

Approved Architecture

Version 1.0
