# Scheduling Workflow

**Version:** 1.0

**Project:** Afzal Ahmad AI HQ

**Workflow:** Scheduled Intelligence, Content & Maintenance Jobs

**Status:** Approved

**Priority:** High

---

# 1. Objective

Define how AI HQ schedules recurring workflows without confusing a documented schedule with an actually running automation.

The system should support reliable scheduling while respecting free-first cost controls, failures, dependencies, and human approval.

---

# 2. Scheduling Principle

A schedule specification describes **when a workflow should run**.

An actual scheduler/runtime is required to execute it.

```text
Schedule Definition
        ↓
Scheduler / Runtime
        ↓
Workflow Trigger
        ↓
Orchestrator
```

GitHub documentation alone does not create a running scheduled job.

---

# 3. Primary Daily Schedule

## Daily Intelligence Report

**Target time:** 2:00 PM PKT

**Frequency:** Daily

**Purpose:** Deliver a fresh intelligence report covering relevant research, competitors, SEO, GEO, and content opportunities.

```text
2:00 PM PKT
     ↓
Start Daily Intelligence
     ↓
Research
     ↓
Competitor Analysis
     ↓
SEO Analysis
     ↓
GEO Analysis
     ↓
Synthesis
     ↓
Report
     ↓
Store / Deliver
```

The workflow should account for the user's local timezone explicitly rather than assuming the server timezone.

---

# 4. Schedule Registry

Every scheduled workflow should have a registry record containing:

- Schedule ID
- Workflow name
- Frequency
- Timezone
- Enabled/disabled state
- Last run
- Next run
- Owner
- Failure policy

Example:

```text
schedule_id: daily-intelligence
frequency: daily
timezone: Asia/Karachi
time: 14:00
status: active/inactive
```

---

# 5. Trigger Lifecycle

```text
Scheduled Time Reached
        ↓
Create Run ID
        ↓
Check System Availability
        ↓
Check Budget / Free Limits
        ↓
Check Existing Run
        ↓
Trigger Orchestrator
        ↓
Execute Workflow
        ↓
Record Result
```

---

# 6. Duplicate Run Protection

The scheduler must prevent accidental duplicate execution for the same scheduled window.

Before starting a run, check whether an equivalent run is already:

- Running
- Completed
- Awaiting review

If a valid run already exists, do not start another identical run unless explicitly requested.

---

# 7. Missed Schedule Handling

If the scheduler is offline at the scheduled time:

- Record the missed run.
- Decide whether the workflow is still useful.
- Run late only when appropriate.
- Avoid creating multiple catch-up runs unnecessarily.

For time-sensitive intelligence, a late run should clearly show its actual collection time.

---

# 8. Timezone Handling

All schedules must store an explicit timezone.

Primary project schedule:

**Asia/Karachi (PKT)**

The implementation should use a timezone-aware scheduling system rather than relying on a fixed UTC offset because timezone rules can differ between locations and systems.

---

# 9. Daily Intelligence Dependencies

The daily report should run only when the required tools are available.

Independent components may execute in parallel:

```text
Research ──┐
SEO ───────┼──→ Synthesis → Report
GEO ───────┤
Competitor ┘
```

If one component fails, the report may be produced as partial output when safe, with the missing component clearly identified.

---

# 10. Weekly Workflows

Potential weekly workflows include:

- Content performance review
- Competitor trend review
- Content backlog prioritization
- Memory cleanup/review
- SEO opportunity review
- GEO visibility review
- Workflow health review

Exact days and times should be configured during implementation based on actual tool availability and user preference.

---

# 11. Monthly Workflows

Potential monthly workflows include:

- Strategic performance review
- Content pillar review
- Audience/market review
- Cost and usage review
- Memory quality review
- Security review
- System architecture review

These should not run until their requirements are implemented and validated.

---

# 12. Manual Trigger

Every important scheduled workflow should also support a manual trigger where practical.

Example:

```text
Scheduled Run
      OR
Manual Run
      ↓
Same Orchestrator
```

Manual execution should still use the same validation, cost, security, and logging rules.

---

# 13. Cost Protection

Before triggering an expensive workflow, check:

- Free model/tool availability
- Current usage limits
- Authorized budget
- Estimated workload
- Previous failed attempts

If the workflow would require unauthorized paid usage, pause it rather than automatically charging the user.

---

# 14. Failure Handling

If a scheduled run fails:

1. Record the run as failed or partial.
2. Preserve successful outputs.
3. Apply the error recovery workflow.
4. Retry only when safe.
5. Avoid duplicate external actions.
6. Escalate when human action is required.

See `ERROR_RECOVERY_WORKFLOW.md`.

---

# 15. Human Approval

Scheduled content creation does not automatically mean scheduled public publishing.

A scheduled workflow may prepare content and place it into an approval queue.

```text
Schedule
  ↓
Generate
  ↓
Review
  ↓
Human Approval
  ↓
Publish
```

Publishing remains subject to the project's authorization policy.

---

# 16. Run Records

Each run should record:

- Run ID
- Schedule ID
- Workflow ID
- Start time
- End time
- Status
- Trigger type
- Agents used
- Tools used
- Errors
- Output references

This information should be stored in the runtime data layer when implementation begins.

---

# 17. Schedule Changes

Changing a production schedule should be treated as a configuration change.

Record:

- Previous schedule
- New schedule
- Reason
- Date
- Person/system making the change

Do not silently change the 2:00 PM PKT Daily Intelligence schedule through an unrelated workflow.

---

# 18. Schedule Safety

The scheduler must not:

- Bypass human approval.
- Bypass cost controls.
- Expose credentials.
- Run infinite retries.
- Trigger duplicate publishing actions.
- Treat a failed run as successful.

---

# 19. Implementation Options

The final scheduler can be selected during implementation based on cost, reliability, and existing infrastructure.

Possible categories include:

- GitHub Actions schedules for repository-oriented jobs
- Supabase/edge-function scheduling where supported
- Cloud cron/scheduler services
- Application-level job queues

The project should prefer a free option that meets reliability requirements.

---

# 20. Success Criteria

The scheduling system succeeds when recurring workflows start at their intended local times, duplicate runs are prevented, missed runs are handled safely, cost/security rules remain enforced, and every execution has a traceable run state.

---

# Related Documents

- DAILY_INTELLIGENCE_WORKFLOW.md
- AGENT_ORCHESTRATION_WORKFLOW.md
- ERROR_RECOVERY_WORKFLOW.md
- COST_CONTROL_WORKFLOW.md
- SECURITY_WORKFLOW.md
- DATA_FLOW_WORKFLOW.md
- HUMAN_APPROVAL_WORKFLOW.md

---

# Status

Approved

Version 1.0
