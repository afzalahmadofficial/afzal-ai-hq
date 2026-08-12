# RLS Security Review

**Version:** 1.0  
**Project:** Afzal Ahmad AI HQ  
**Status:** Pre-Deployment Review  
**Priority:** Critical

## 1. Purpose

Review the current Supabase membership and RLS design before deployment and identify issues that must be resolved in a controlled test environment.

## 2. Key Findings

### Finding 1 — Membership policy recursion risk

The `project_members` management policy calls a helper that queries `project_members`. Depending on PostgreSQL RLS evaluation, this can cause recursive policy evaluation or unexpected denial.

**Required action:** Use a narrowly scoped security-definer membership helper, with a fixed `search_path`, carefully controlled execution permissions, or another proven pattern that avoids recursive RLS evaluation.

### Finding 2 — Membership self-escalation

An admin/owner policy must not accidentally allow a normal member to modify their own membership role/status through a broad `FOR ALL` policy.

**Required action:** Separate membership administration operations and explicitly prevent unauthorized role escalation.

### Finding 3 — Project creation/initial ownership

The current policy intentionally does not permit arbitrary project creation through the public authenticated API.

**Required action:** Define a trusted project-creation workflow that creates the project and initial owner membership atomically or through a controlled server-side transaction.

### Finding 4 — Policy coverage must match table relationships

Tables such as `sources` and `content_versions` do not contain `project_id` directly and therefore require relationship-based policies.

**Required action:** Test these policies independently for both positive access and cross-project isolation.

### Finding 5 — Audit-event writes

`system_events` should not receive unrestricted client writes merely because a user is a project member.

**Required action:** Keep audit-event creation behind trusted server-side/application paths or tightly constrained database functions.

## 3. Required Security Tests

Before deployment, verify:

- Unauthenticated users cannot access protected rows.
- Users can access only projects with active membership.
- Viewer cannot modify protected operational data.
- Operator cannot administer agents/workflows/members.
- Admin cannot delete projects unless explicitly permitted by policy.
- Only owner/admin can manage memberships.
- A member cannot promote themselves.
- Suspended/removed members lose access.
- Project A users cannot access Project B.
- Relationship-based tables preserve project isolation.
- Approval operations follow the human-approval boundary.
- Service-side audit events cannot be forged through ordinary client writes.

## 4. Deployment Gate

**Do not deploy the current RLS migration to production until Findings 1–5 are reviewed and tested.**

Required sequence:

```text
Review
 ↓
Corrective migration
 ↓
Disposable/test database
 ↓
RLS tests
 ↓
Security review
 ↓
Production approval
 ↓
Supabase deployment
```

## 5. Security Principles

- Deny by default.
- Enforce project isolation in PostgreSQL.
- Never rely only on frontend checks.
- Keep privileged credentials server-side.
- Avoid broad `FOR ALL` policies where narrower policies are safer.
- Prefer explicit ownership and role transitions.
- Keep audit records append-oriented.
- Do not log secrets.

## 6. Status

**Pre-Deployment Review — Production deployment blocked pending corrective validation.**
