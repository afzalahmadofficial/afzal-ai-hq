# Database Migration Plan

**Version:** 1.0  
**Project:** Afzal Ahmad AI HQ  
**Status:** Approved for Planning  
**Priority:** Critical

## 1. Objective

Define a safe, repeatable process for turning the approved Supabase database architecture into production PostgreSQL schema changes.

The migration process must prioritize data safety, security, traceability, testing, and rollback/recovery.

## 2. Migration Principles

- Never apply untested production migrations.
- Keep migrations versioned and ordered.
- Make each migration understandable and focused.
- Prefer additive changes before destructive changes.
- Review RLS policies as part of schema changes.
- Back up important production data before high-risk changes.
- Verify the result after every production migration.
- Never place secrets in SQL files or GitHub.

## 3. Migration Lifecycle

```text
Architecture
    ↓
Migration Design
    ↓
SQL / Schema Change
    ↓
Local or Safe Test
    ↓
Review
    ↓
Staging / Controlled Test
    ↓
Backup / Recovery Check
    ↓
Production Migration
    ↓
Verification
    ↓
Monitor
    ↓
Close / Roll Back
```

## 4. Migration Naming

Use deterministic, ordered migration identifiers.

Recommended pattern:

```text
YYYYMMDDHHMMSS_short_description.sql
```

Example:

```text
20260812_create_core_ai_hq_tables.sql
```

Migration names should describe the change clearly.

## 5. Initial Migration Sequence

The first implementation should follow the approved architecture order:

1. Extensions and shared database prerequisites
2. `projects`
3. `agents`
4. `workflows`
5. `agent_tasks`
6. `research`
7. `sources`
8. `content`
9. `content_versions`
10. `decisions`
11. `approvals`
12. `knowledge_memory`
13. `analytics`
14. `system_events`
15. Supporting indexes
16. RLS policies
17. Required triggers/functions
18. Seed data where appropriate

Do not create optional tables until a real implementation requirement exists.

## 6. Schema Design Requirements

Each table migration should explicitly consider:

- Primary key
- Foreign keys
- Nullability
- Defaults
- Unique constraints
- Check constraints
- Indexes
- Delete/update behavior
- Timestamps
- RLS exposure

## 7. Foreign Keys

Foreign keys should enforce important relationships at the database level.

For every foreign key, decide intentionally whether deletion should:

- `RESTRICT`
- `CASCADE`
- `SET NULL`

Do not use cascading deletion by default for historical or audit records.

## 8. Status Constraints

Where a table has a controlled state machine, enforce valid states through appropriate database constraints or a documented enum strategy.

Example task lifecycle:

```text
QUEUED → RUNNING → SUCCEEDED
                  ↘ FAILED
                  ↘ CANCELLED
```

Application logic and database constraints should remain consistent.

## 9. Indexing

Create indexes for demonstrated query patterns, especially:

- Foreign keys
- Task status + timestamps
- Scheduled content
- Approval queues
- Research relationships
- Analytics lookups
- Memory retrieval
- System-event queries

Avoid excessive indexes because they increase write cost and storage.

## 10. RLS Implementation

RLS is a required security layer for tables exposed through Supabase APIs.

Baseline model:

```text
Authenticated User
       ↓
Project Membership
       ↓
Project-scoped Row Access
```

Policies must be tested for both permitted and denied access.

Privileged server-side operations must not depend on insecure client-side checks.

## 11. Functions and Triggers

Use database functions/triggers only when they provide a clear consistency or automation benefit.

Document:

- Purpose
- Inputs
- Outputs
- Security context
- Tables affected
- Failure behavior

Avoid hiding major business logic inside opaque triggers when application-level orchestration is clearer.

## 12. Seed Data

Seed only safe, non-secret configuration data required for development or initial operation.

Examples:

- Initial project record
- Approved agent registry
- Workflow definitions
- Non-sensitive default statuses/configuration

Never seed real credentials or private tokens.

## 13. Development Testing

Before production:

1. Apply migrations to a clean test database.
2. Apply them again from the complete migration history.
3. Verify schema matches expectations.
4. Test foreign keys and constraints.
5. Test RLS policies.
6. Test representative queries.
7. Test application/agent integration.

The full migration history should be reproducible from an empty database.

## 14. Migration Safety Tests

For every meaningful migration, verify:

- Existing records remain accessible.
- New records can be inserted correctly.
- Existing workflows still work.
- RLS does not unintentionally expose data.
- Required indexes exist.
- Queries do not regress unexpectedly.

## 15. Production Readiness Checklist

Before production:

- Migration reviewed
- Dependencies identified
- Backup/recovery verified where required
- Rollback/recovery plan defined
- Maintenance impact assessed
- RLS reviewed
- Test results recorded
- Approval obtained for high-risk changes
- Monitoring ready

## 16. Production Execution

During deployment:

1. Confirm the exact migration version.
2. Confirm target environment.
3. Confirm backup/recovery readiness where needed.
4. Apply the migration.
5. Capture execution result.
6. Run verification queries/tests.
7. Monitor dependent workflows.

Never assume a successful SQL command means the application is healthy.

## 17. Verification

After migration, verify:

- Tables
- Columns
- Constraints
- Indexes
- RLS policies
- Functions/triggers
- Application connectivity
- Agent task execution
- Content workflows
- Approval workflows
- Analytics writes

Record the migration result.

## 18. Rollback Strategy

Not every migration can safely be reversed with a simple down migration.

For destructive changes, the recovery plan may require:

- Backup restoration
- Data reconstruction
- Compensating migration
- Feature rollback

Never claim a migration is reversible unless the rollback/recovery procedure has been tested.

## 19. Destructive Changes

Destructive operations include:

- Dropping columns
- Dropping tables
- Deleting historical data
- Changing incompatible data types
- Removing constraints relied upon by application logic

Prefer staged migrations:

```text
Add New Structure
      ↓
Backfill / Migrate
      ↓
Update Application
      ↓
Verify
      ↓
Remove Old Structure Later
```

## 20. Zero-Downtime Preference

Where practical, use backward-compatible migrations so the application can continue operating during deployment.

For example:

```text
Add Column
 ↓
Deploy Compatible Code
 ↓
Backfill
 ↓
Switch Reads/Writes
 ↓
Remove Legacy Structure Later
```

## 21. Supabase Integration

Supabase should be treated as the managed PostgreSQL platform for this architecture.

The migration process must account for:

- Supabase Auth
- RLS
- Database functions
- API exposure
- Environment separation
- Migration history

Do not expose service-role credentials in frontend code or GitHub.

## 22. GitHub Integration

Store migration files in version control.

Recommended structure:

```text
supabase/
└── migrations/
    ├── <timestamp>_create_core_tables.sql
    ├── <timestamp>_add_indexes.sql
    └── <timestamp>_add_rls.sql
```

Keep migrations immutable after they have been applied to shared/production environments. If a correction is required, create a new migration.

## 23. Environment Strategy

Where possible, maintain separate environments for:

- Development
- Testing/Staging
- Production

Never use production data casually in development.

## 24. Migration Failure

If a migration fails:

1. Stop further deployment.
2. Capture the error.
3. Determine whether the database was partially changed.
4. Verify transaction/rollback state.
5. Restore or apply a corrective migration as appropriate.
6. Re-test.
7. Record the incident/change.

Use `INCIDENT_RESPONSE_WORKFLOW.md` for material production incidents.

## 25. Schema Drift

Periodically compare the expected migration state with the actual database state.

Investigate changes made outside the migration process.

Do not normalize undocumented manual production changes into the repository without review.

## 26. Documentation Synchronization

When a schema change materially affects architecture, update:

- `SUPABASE_DATABASE_ARCHITECTURE.md`
- Relevant workflow documentation
- Agent/tool documentation
- Application configuration

Documentation should reflect the deployed system.

## 27. Audit Trail

Record significant migrations with:

- Migration ID
- Description
- Environment
- Applied timestamp
- Operator/process
- Result
- Related change/approval ID

## 28. Success Criteria

The migration plan succeeds when the Supabase database can be created reproducibly from version-controlled migrations, changes are tested and secured with RLS, production deployment is controlled, failures are recoverable, and the actual database remains aligned with documented architecture.

## Related Documents

- SUPABASE_DATABASE_ARCHITECTURE.md
- CHANGE_MANAGEMENT_WORKFLOW.md
- BACKUP_RECOVERY_WORKFLOW.md
- SECURITY_WORKFLOW.md
- HUMAN_APPROVAL_WORKFLOW.md
- INCIDENT_RESPONSE_WORKFLOW.md
- QUALITY_ASSURANCE_WORKFLOW.md

## Status

Approved for Planning

Version 1.0
