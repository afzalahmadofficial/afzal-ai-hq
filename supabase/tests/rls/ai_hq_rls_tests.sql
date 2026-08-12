-- Afzal Ahmad AI HQ
-- RLS security test plan
-- These tests are intended to run in a controlled Supabase/Postgres test environment.

-- Test identities should be created only in a disposable test environment.
-- Replace placeholder UUIDs with test auth.users IDs before execution.

begin;

-- -----------------------------------------------------------------------------
-- Test fixture model
-- -----------------------------------------------------------------------------
-- Test users:
--   owner_user
--   admin_user
--   operator_user
--   viewer_user
--   outsider_user
--
-- Test projects:
--   project_a
--   project_b
--
-- Expected membership:
--   owner_user    -> project_a / owner
--   admin_user    -> project_a / admin
--   operator_user -> project_a / operator
--   viewer_user   -> project_a / viewer
--   outsider_user -> project_b / owner
--
-- The actual auth identities must be provisioned by the test harness.

-- -----------------------------------------------------------------------------
-- 1. Owner access
-- -----------------------------------------------------------------------------
-- Expected:
--   SELECT project A: allowed
--   UPDATE project A: allowed
--   DELETE project A: allowed
--   Manage members: allowed

-- -----------------------------------------------------------------------------
-- 2. Admin access
-- -----------------------------------------------------------------------------
-- Expected:
--   SELECT project A: allowed
--   UPDATE project A: allowed
--   DELETE project A: denied
--   Manage members: allowed

-- -----------------------------------------------------------------------------
-- 3. Operator access
-- -----------------------------------------------------------------------------
-- Expected:
--   SELECT project A: allowed
--   Create/update operational tasks: allowed
--   Manage content/research: allowed
--   Manage agents/workflows: denied
--   Manage members: denied

-- -----------------------------------------------------------------------------
-- 4. Viewer access
-- -----------------------------------------------------------------------------
-- Expected:
--   SELECT project A: allowed
--   INSERT/UPDATE/DELETE protected operational rows: denied
--
-- A real test should assert PostgreSQL raises an RLS violation or produces
-- zero affected rows, depending on the operation and policy.

-- -----------------------------------------------------------------------------
-- 5. Cross-project isolation
-- -----------------------------------------------------------------------------
-- Logged-in project-A members must not be able to read or modify project-B rows.
-- This test is mandatory for every project-scoped table.

-- -----------------------------------------------------------------------------
-- 6. Removed/suspended member
-- -----------------------------------------------------------------------------
-- A member whose status is `removed` or `suspended` must fail the active
-- membership check and therefore lose project-scoped access.

-- -----------------------------------------------------------------------------
-- 7. Unauthenticated access
-- -----------------------------------------------------------------------------
-- Anonymous requests must not read or modify protected project data.

-- -----------------------------------------------------------------------------
-- 8. Sensitive approval access
-- -----------------------------------------------------------------------------
-- Operators may request approvals but may not approve/review their own
-- sensitive actions unless a future policy explicitly permits that behavior.
-- Admin/owner review policies must remain project-scoped.

-- -----------------------------------------------------------------------------
-- 9. Membership self-escalation
-- -----------------------------------------------------------------------------
-- A normal authenticated user must not be able to insert/update a membership
-- row to promote themselves to owner/admin through the public API.

-- -----------------------------------------------------------------------------
-- 10. Helper-function behavior
-- -----------------------------------------------------------------------------
-- `is_active_project_member(project_id)` should return true only for an
-- authenticated user with an active membership in that exact project.
-- `has_project_role(project_id, roles)` should return true only when the
-- authenticated user has one of the requested roles in that exact project.

-- -----------------------------------------------------------------------------
-- 11. Policy coverage checklist
-- -----------------------------------------------------------------------------
-- Verify RLS is enabled on:
--   projects
--   project_members
--   agents
--   workflows
--   agent_tasks
--   research
--   sources
--   content
--   content_versions
--   decisions
--   approvals
--   knowledge_memory
--   analytics
--   system_events

-- -----------------------------------------------------------------------------
-- 12. Regression requirement
-- -----------------------------------------------------------------------------
-- Run this suite after every material RLS/schema change.
-- Production deployment is blocked if cross-project isolation or privileged
-- access tests fail.

rollback;
