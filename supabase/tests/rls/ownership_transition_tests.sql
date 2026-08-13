-- Afzal Ahmad AI HQ
-- Ownership transition RLS/security regression tests
-- Run only in a disposable test environment.

begin;

-- Test fixture expectations:
--   owner_user    -> project_a / owner
--   admin_user    -> project_a / admin
--   operator_user -> project_a / operator
--   viewer_user   -> project_a / viewer
--
-- The test harness must authenticate each identity before executing the
-- corresponding statements.

-- 1. Owner can transfer ownership to an existing active member.
-- Expected: SUCCESS.
-- select public.transfer_project_ownership('<project_a>', '<admin_user>');

-- 2. Admin cannot directly assign owner role.
-- Expected: DENIED.
-- update public.project_members
-- set role = 'owner'
-- where project_id = '<project_a>' and user_id = '<operator_user>';

-- 3. Operator cannot assign owner role.
-- Expected: DENIED.

-- 4. Viewer cannot change membership roles.
-- Expected: DENIED.

-- 5. A project must retain exactly one active owner.
-- Expected: the database rejects attempts that would leave zero active owners.

-- 6. The last active owner cannot be removed.
-- Expected: DENIED / constraint failure.

-- 7. The last active owner cannot be demoted directly.
-- Expected: DENIED / constraint failure.

-- 8. Ownership transfer must target an existing active project member.
-- Expected: function rejects unknown/inactive target.

-- 9. Ownership transfer must be project-scoped.
-- Expected: owner of project A cannot transfer ownership of project B.

-- 10. Ownership transfer must not create a second active owner.
-- Expected: exactly one active owner after successful transfer.

-- 11. Removed/suspended target cannot become owner.
-- Expected: DENIED.

-- 12. Cross-project ownership isolation.
-- Expected: project-A owner cannot modify project-B membership.

-- 13. Self-escalation regression.
-- Expected: normal authenticated member cannot change their own role to owner/admin.

-- 14. Post-transfer verification.
-- After a successful transfer:
--   old owner -> admin
--   new owner -> owner
--   project -> exactly one active owner

-- Production deployment is blocked until these cases pass in a controlled
-- Supabase/PostgreSQL test environment.

rollback;
