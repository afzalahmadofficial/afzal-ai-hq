# Supabase Deployment Preflight

**Version:** 1.0  
**Project:** Afzal Ahmad AI HQ  
**Status:** Deployment Gate  
**Priority:** Critical

## Purpose

Define the checks required before applying the version-controlled Supabase migrations to a real environment.

## Deployment Rule

**Do not deploy if any required check fails.**

The current migration set is a candidate for controlled testing, not automatic production approval.

## 1. Migration Inventory

Expected migration order:

```text
20260812000000_create_core_ai_hq_tables.sql
20260812001000_add_auth_memberships.sql
20260812002000_add_project_rls_policies.sql
20260812003000_correct_project_membership_rls.sql
20260812004000_protect_ownership_transitions.sql
20260812005000_lock_direct_owner_role_changes.sql
```

Verify all files exist and are committed before deployment.

## 2. Environment Checks

Confirm:

- Correct Supabase project
- Correct environment
- Database backup/recovery capability appropriate to the change
- Auth is enabled
- No production credentials are stored in Git
- Supabase service-role credentials remain server-side
- No unrelated pending schema changes are present

## 3. Clean-Database Test

Apply the complete migration history to a disposable PostgreSQL/Supabase test database.

Expected result:

```text
Empty database
    ↓
All migrations
    ↓
Schema created successfully
    ↓
RLS enabled
    ↓
Tests pass
```

## 4. Migration Reproducibility

Run the complete migration sequence from an empty database at least once before production.

The final schema must be reproducible without manual SQL intervention.

## 5. Schema Verification

Verify:

- All expected tables exist.
- Foreign keys exist.
- Required constraints exist.
- Required indexes exist.
- Timestamp triggers exist.
- `project_members` references `auth.users`.
- RLS is enabled on protected tables.

## 6. RLS Verification

Test at minimum:

- Anonymous user denied.
- Project member can access their project.
- Cross-project access denied.
- Viewer cannot perform protected writes.
- Operator has only operational permissions.
- Admin cannot directly assign owner.
- Owner can perform permitted administration.
- Removed/suspended member loses access.
- Self-role escalation is denied.

## 7. Ownership Verification

Test:

1. A project starts with exactly one active owner.
2. Owner can transfer ownership to an active member.
3. Admin cannot assign owner directly.
4. Direct membership updates cannot create an owner.
5. Last active owner cannot be removed/demoted.
6. Transfer leaves exactly one active owner.

## 8. Relationship-Based RLS

Explicitly test tables whose project scope is inherited through relationships, including:

- `sources`
- `content_versions`

A Project A user must not obtain Project B data through these relationships.

## 9. Audit/Event Security

Verify ordinary authenticated clients cannot forge unrestricted `system_events` records.

Trusted application/server paths should be used for material audit events.

## 10. Application Compatibility

After schema deployment to a test environment, verify:

- Authentication
- Project creation workflow
- Membership management
- Agent reads/writes
- Workflow reads/writes
- Task execution
- Research/content operations
- Approval flow
- Analytics writes

## 11. Production Approval Gate

Production deployment requires all of the following:

- Migration inventory verified
- Clean migration test passed
- RLS tests passed
- Ownership tests passed
- Cross-project isolation passed
- Application smoke tests passed
- Recovery plan confirmed
- Human approval obtained for production deployment

## 12. Deployment Procedure

```text
Freeze unrelated schema changes
        ↓
Confirm target environment
        ↓
Confirm recovery readiness
        ↓
Apply migrations in order
        ↓
Verify schema
        ↓
Run RLS tests
        ↓
Run application smoke tests
        ↓
Monitor
        ↓
Record deployment result
```

## 13. Failure Procedure

If any migration fails:

1. Stop deployment.
2. Capture the exact error.
3. Determine whether the transaction rolled back.
4. Inspect database state.
5. Do not manually guess corrective SQL in production.
6. Create/review a corrective migration.
7. Re-test from a clean environment.

## 14. Rollback / Recovery

Do not assume every migration has a safe down migration.

For destructive or incompatible changes, use the documented recovery strategy and backups where appropriate.

## 15. Final Status

**Deployment Gate — Pending controlled test execution.**

The next technical step is to run the migration chain against a disposable/test Supabase PostgreSQL environment and record the actual results.
