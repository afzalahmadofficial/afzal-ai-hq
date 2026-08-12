# Supabase Database Architecture

**Version:** 1.0  
**Project:** Afzal Ahmad AI HQ  
**Status:** Draft Architecture  
**Priority:** Critical

## 1. Purpose

Define the logical PostgreSQL/Supabase data architecture for AI HQ before implementation.

The database should provide a reliable source of truth for agents, workflows, tasks, research, content, approvals, analytics, memory, and system events.

## 2. Architecture Principles

- PostgreSQL is the system of record for structured application state.
- Keep entities normalized where practical.
- Use explicit status fields and timestamps.
- Prefer immutable event/audit records for important history.
- Apply least-privilege access through Row Level Security (RLS).
- Never store API keys, passwords, or access tokens in ordinary tables.
- Use UUID primary keys for application entities unless a stronger project-specific reason exists.
- Store timestamps in UTC.
- Separate durable knowledge from temporary task state.

## 3. Logical Entity Model

```text
PROJECTS
   ├── AGENTS
   ├── WORKFLOWS
   ├── CONTENT
   ├── RESEARCH
   ├── DECISIONS
   ├── APPROVALS
   ├── ANALYTICS
   └── KNOWLEDGE_MEMORY

AGENTS
   └── AGENT_TASKS
          └── SYSTEM_EVENTS

RESEARCH
   └── SOURCES

CONTENT
   └── CONTENT_VERSIONS

DECISIONS
   └── APPROVALS

ALL IMPORTANT ENTITIES
   └── AUDIT / SYSTEM EVENTS
```

## 4. Core Tables

### 4.1 `projects`

Represents an AI HQ project/workspace.

Suggested fields:

- `id` UUID PK
- `name`
- `slug` unique
- `description`
- `status`
- `created_at`
- `updated_at`

### 4.2 `agents`

Registry of AI agents.

Suggested fields:

- `id` UUID PK
- `project_id` FK → `projects.id`
- `name`
- `slug`
- `description`
- `agent_type`
- `status`
- `configuration` JSONB
- `created_at`
- `updated_at`

### 4.3 `workflows`

Defines registered workflows and their current configuration.

Suggested fields:

- `id` UUID PK
- `project_id` FK
- `name`
- `slug`
- `description`
- `status`
- `configuration` JSONB
- `version`
- `created_at`
- `updated_at`

### 4.4 `agent_tasks`

Tracks execution requests and task state.

Suggested fields:

- `id` UUID PK
- `project_id` FK
- `agent_id` FK
- `workflow_id` FK nullable
- `parent_task_id` FK nullable
- `task_type`
- `status`
- `priority`
- `input` JSONB
- `output` JSONB
- `error` JSONB nullable
- `started_at`
- `completed_at`
- `created_at`
- `updated_at`

Recommended states:

`QUEUED → RUNNING → SUCCEEDED / FAILED / CANCELLED`

## 5. Research Domain

### 5.1 `research`

Stores research briefs and synthesized findings.

Suggested fields:

- `id` UUID PK
- `project_id` FK
- `task_id` FK nullable
- `question`
- `scope`
- `summary`
- `findings` JSONB
- `confidence`
- `status`
- `researched_at`
- `created_at`
- `updated_at`

### 5.2 `sources`

Stores source metadata used by research.

Suggested fields:

- `id` UUID PK
- `research_id` FK
- `url`
- `title`
- `publisher`
- `published_at` nullable
- `accessed_at`
- `source_type`
- `authority_score` nullable
- `notes`
- `created_at`

Do not use this table to store copyrighted articles in full.

## 6. Content Domain

### 6.1 `content`

Canonical content records.

Suggested fields:

- `id` UUID PK
- `project_id` FK
- `content_type`
- `title`
- `slug` nullable
- `status`
- `platform`
- `content_pillar`
- `topic`
- `body` nullable
- `metadata` JSONB
- `scheduled_at` nullable
- `published_at` nullable
- `created_at`
- `updated_at`

### 6.2 `content_versions`

Keeps meaningful content revisions.

Suggested fields:

- `id` UUID PK
- `content_id` FK
- `version_number`
- `body`
- `change_summary`
- `created_by`
- `created_at`

## 7. Decision Domain

### 7.1 `decisions`

Stores significant decision records.

Suggested fields:

- `id` UUID PK
- `project_id` FK
- `question`
- `recommendation`
- `final_decision`
- `confidence`
- `risk_level`
- `status`
- `decision_maker`
- `decided_at`
- `created_at`
- `updated_at`

### 7.2 `approvals`

Controls actions requiring human authorization.

Suggested fields:

- `id` UUID PK
- `project_id` FK
- `decision_id` FK nullable
- `task_id` FK nullable
- `action_type`
- `action_payload` JSONB
- `risk_level`
- `status`
- `requested_at`
- `reviewed_at`
- `reviewer`
- `review_notes`
- `expires_at` nullable

Recommended states:

`PENDING / APPROVED / REJECTED / EXPIRED / CANCELLED / EXECUTED / FAILED`

## 8. Analytics Domain

### 8.1 `analytics`

Stores normalized performance observations.

Suggested fields:

- `id` UUID PK
- `project_id` FK
- `content_id` FK nullable
- `agent_id` FK nullable
- `metric_name`
- `metric_value`
- `metric_unit` nullable
- `platform` nullable
- `period_start` nullable
- `period_end` nullable
- `source`
- `metadata` JSONB
- `recorded_at`

Keep raw platform-specific data separate if its schema is too variable.

## 9. Knowledge Memory

### 9.1 `knowledge_memory`

Stores validated, reusable knowledge.

Suggested fields:

- `id` UUID PK
- `project_id` FK
- `category`
- `statement`
- `source`
- `confidence`
- `status`
- `created_at`
- `last_verified_at`
- `review_at` nullable
- `metadata` JSONB

Memory should never override current explicit instructions or verified system state.

## 10. System Events

### 10.1 `system_events`

Append-oriented operational/audit events.

Suggested fields:

- `id` UUID PK
- `project_id` FK
- `event_type`
- `severity`
- `actor_type`
- `actor_id` nullable
- `entity_type`
- `entity_id` nullable
- `payload` JSONB
- `created_at`

Examples:

- `TASK_CREATED`
- `TASK_COMPLETED`
- `TASK_FAILED`
- `APPROVAL_REQUESTED`
- `APPROVAL_GRANTED`
- `CONTENT_PUBLISHED`
- `WORKFLOW_CHANGED`
- `SECURITY_EVENT`

## 11. Optional Supporting Tables

These can be introduced when implementation requires them:

- `users`
- `project_members`
- `agent_runs`
- `workflow_runs`
- `scheduled_jobs`
- `notifications`
- `content_metrics`
- `integrations`
- `agent_memory`
- `prompt_versions`
- `model_usage`

Do not create every optional table prematurely.

## 12. Relationships

Core relationships:

```text
projects 1 ─── N agents
projects 1 ─── N workflows
projects 1 ─── N agent_tasks
agents   1 ─── N agent_tasks
workflows 1 ── N agent_tasks
research 1 ─── N sources
content  1 ─── N content_versions
projects 1 ─── N content
projects 1 ─── N research
projects 1 ─── N decisions
decisions 1 ── N approvals
projects 1 ─── N analytics
projects 1 ─── N knowledge_memory
projects 1 ─── N system_events
```

## 13. Indexing Strategy

Initial indexes should prioritize common access patterns:

- Foreign keys such as `project_id`
- Status + created timestamp on task tables
- Agent/task relationships
- Content status + scheduled time
- Research/project relationships
- Approval status + expiration time
- Analytics entity + period
- Memory category + verification status
- Event type + created timestamp

Indexes should be added based on actual query patterns rather than speculation.

## 14. JSONB Usage

Use JSONB for genuinely variable metadata, configuration, and event payloads.

Do not place frequently queried relational fields into JSONB simply to avoid schema design.

## 15. Row Level Security

RLS should be enabled for application tables exposed through Supabase APIs.

Baseline principle:

```text
Authenticated User
      ↓
Project Membership
      ↓
Allowed Project Rows
```

Agents/services should use appropriately scoped server-side credentials where required.

Never expose privileged service credentials to browser/client code.

## 16. Security Boundaries

Never store in ordinary application tables:

- Passwords
- API keys
- Access tokens
- OAuth client secrets
- Private credentials

Use Supabase Auth and approved secret-management mechanisms for credentials.

## 17. Auditability

Important state changes should generate system events or equivalent audit records.

Examples:

- Approval decision
- Publication
- Agent configuration change
- Database/security change
- Major workflow change
- Incident

Audit records should be append-oriented and should not be casually overwritten.

## 18. Data Lifecycle

Recommended lifecycle:

```text
Create
 ↓
Validate
 ↓
Use
 ↓
Update
 ↓
Archive / Retain
 ↓
Delete according to policy
```

Retention rules should be defined before deleting historical operational data.

## 19. Backup and Recovery

Production data must follow the project's backup and recovery controls.

Database migrations should be tested before production execution.

See `BACKUP_RECOVERY_WORKFLOW.md` and `CHANGE_MANAGEMENT_WORKFLOW.md`.

## 20. Implementation Sequence

Do not build every table simultaneously.

Recommended order:

1. `projects`
2. `agents`
3. `workflows`
4. `agent_tasks`
5. `research`
6. `sources`
7. `content`
8. `content_versions`
9. `decisions`
10. `approvals`
11. `knowledge_memory`
12. `analytics`
13. `system_events`
14. Optional supporting tables as required

## 21. Validation Before Supabase Migration

Before implementation:

- Review field names
- Confirm relationships
- Confirm required vs nullable fields
- Confirm status enums/constraints
- Review RLS policies
- Review indexes
- Confirm retention needs
- Confirm which tables are actually required for MVP

## 22. Success Criteria

The architecture succeeds when AI HQ has a clear, secure, traceable data model that can support agent orchestration, research, content production, approvals, analytics, memory, and future dashboard functionality without unnecessary complexity.

## Related Documents

- AGENT_ORCHESTRATION_WORKFLOW.md
- KNOWLEDGE_MEMORY_WORKFLOW.md
- DECISION_MAKING_WORKFLOW.md
- HUMAN_APPROVAL_WORKFLOW.md
- CHANGE_MANAGEMENT_WORKFLOW.md
- SECURITY_WORKFLOW.md
- BACKUP_RECOVERY_WORKFLOW.md
- ANALYTICS_FEEDBACK_WORKFLOW.md

## Status

Draft Architecture

Version 1.0
