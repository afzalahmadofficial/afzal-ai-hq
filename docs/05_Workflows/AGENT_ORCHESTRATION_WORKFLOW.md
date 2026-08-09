# Agent Orchestration Workflow

**Version:** 1.0

**Project:** Afzal Ahmad AI HQ

**Workflow:** Multi-Agent Coordination & Execution

**Status:** Approved

**Priority:** Critical

---

# 1. Objective

Define how the AI HQ coordinates specialized agents so that each agent performs a clear responsibility while a central orchestrator controls sequence, dependencies, status, failures, and final delivery.

The architecture must avoid a collection of disconnected agents operating independently without shared context or accountability.

---

# 2. Core Architecture

```text
                    CEO / Orchestrator Agent
                              │
          ┌───────────────────┼───────────────────┐
          ↓                   ↓                   ↓
     Research Agent     Content Strategy      Analytics
          │                   │                   │
     Competitor              │              Performance
          │                   │                   │
     SEO Agent ───────── GEO Agent ───────────────┘
          │                   │
          └──────────┬────────┘
                     ↓
              Content Agents
          ┌──────────┼──────────┐
          ↓          ↓          ↓
       YouTube    LinkedIn     Blog
          │          │          │
          └──────────┼──────────┘
                     ↓
              Human Approval
                     ↓
                 Publishing
                     ↓
              Analytics/Memory
```

---

# 3. Orchestrator Responsibilities

The Orchestrator is responsible for:

- Receiving the objective.
- Breaking work into tasks.
- Selecting the appropriate agents/tools.
- Passing only relevant context between stages.
- Tracking workflow state.
- Handling dependencies.
- Detecting failures.
- Requesting human approval when required.
- Producing the final workflow result.

The Orchestrator should coordinate rather than perform every specialized task itself.

---

# 4. Agent Responsibilities

## Research Agent

Finds, evaluates, and structures relevant evidence.

## Competitor Agent

Analyzes approved competitor activity and identifies patterns and gaps.

## SEO Agent

Analyzes search intent, topic opportunities, and search optimization.

## GEO Agent

Improves content clarity and information structure for generative/answer systems.

## Content Strategy Agent

Turns intelligence into prioritized content opportunities.

## YouTube Agent

Handles YouTube research, concepts, scripts, and publishing preparation where authorized.

## LinkedIn Agent

Handles LinkedIn research, post preparation, and authorized publishing workflows.

## Blog Agent

Creates and optimizes long-form web content.

## Analytics Agent

Measures content performance and creates evidence-backed learning.

## Memory Agent

Maintains approved long-term knowledge and historical context.

## Report Agent

Combines validated outputs into executive reports.

---

# 5. Task Lifecycle

```text
REQUESTED
   ↓
PLANNED
   ↓
QUEUED
   ↓
RUNNING
   ↓
VALIDATING
   ↓
COMPLETED
```

Possible alternate states:

- BLOCKED
- FAILED
- AWAITING_HUMAN_REVIEW
- CANCELLED

---

# 6. Dependency Management

An agent should run only when its required inputs are available.

Example:

```text
Research
   ↓
SEO + GEO + Competitor
   ↓
Content Strategy
   ↓
Platform Content Agents
```

Independent research tasks may run in parallel when doing so improves speed and does not create conflicting writes.

---

# 7. Context Passing

Agents should receive structured context rather than the entire history of the system.

A task context may contain:

- Task ID
- Objective
- Relevant inputs
- Source references
- Previous agent outputs
- Constraints
- Expected output format

This reduces unnecessary model usage and improves consistency.

---

# 8. Agent Output Contract

Every agent should return a predictable result containing, where applicable:

- Status
- Task ID
- Summary
- Structured output
- Sources
- Warnings
- Errors
- Confidence or uncertainty notes
- Next recommended action

An agent must not claim that a downstream action occurred unless it actually received confirmation.

---

# 9. Shared State

Supabase is the persistent data layer for workflow state and approved shared information.

GitHub stores specifications and implementation code.

AI models provide generation/reasoning.

External tools provide research, platform, analytics, and other services.

The Orchestrator connects these layers.

---

# 10. Model Routing

Agents must use the AI Model Tool instead of hard-coding a single AI provider.

The Orchestrator may select models based on:

- Task complexity
- Cost
- Availability
- Required context size
- Output requirements

Free/low-cost models should be preferred for suitable routine tasks.

---

# 11. Parallel Execution

The Orchestrator may run independent tasks concurrently.

For example:

```text
Research
 ├── SEO analysis
 ├── GEO analysis
 └── Competitor analysis
          ↓
    Content Strategy
```

Parallel execution must not cause conflicting writes or inconsistent versions.

---

# 12. Failure Handling

If an agent fails:

1. Record the error.
2. Preserve successful upstream outputs.
3. Retry only when safe.
4. Use an approved fallback when appropriate.
5. Continue independent tasks where possible.
6. Mark dependent tasks as blocked when necessary.
7. Notify the appropriate human when the workflow cannot safely continue.

The system must never fill missing agent output with invented information.

---

# 13. Human Approval Gate

The Orchestrator must stop before consequential public actions when human approval is required.

```text
AI Preparation
     ↓
Quality Checks
     ↓
Human Approval
     ↓
Authorized Action
```

The exact approved version must be passed to the publishing tool.

---

# 14. Daily Intelligence Orchestration

At the configured 2:00 PM PKT schedule:

1. Start workflow.
2. Collect fresh research.
3. Process research.
4. Run competitor analysis.
5. Run SEO analysis.
6. Run GEO analysis.
7. Generate content opportunities.
8. Generate report.
9. Store report and important findings.
10. Deliver report for human review/action.

The schedule is only active after an actual scheduler/orchestration runtime is configured.

---

# 15. Content Production Orchestration

```text
Content Opportunity
        ↓
Master Brief
        ↓
Research Validation
        ↓
Draft
        ↓
SEO + GEO
        ↓
Quality Review
        ↓
Human Approval
        ↓
Publishing Tool
        ↓
Analytics
```

---

# 16. Observability

The system should record:

- Workflow ID
- Task IDs
- Agent used
- Model/provider used where available
- Start/end timestamps
- Status
- Errors
- Retry count
- Output references

This allows troubleshooting and cost/performance analysis.

---

# 17. Security

Agents receive only the permissions necessary for their tasks.

Secrets must never be passed through prompts, GitHub files, public logs, or content outputs.

External account actions require an authorized tool connection.

---

# 18. Anti-Loop Protection

The Orchestrator must prevent agents from repeatedly triggering one another without a meaningful state change.

Each workflow should have:

- Maximum retry count
- Task status
- Clear completion criteria
- Timeout handling where supported

---

# 19. Success Criteria

The orchestration system succeeds when specialized agents work as one coordinated pipeline, dependencies are respected, failures are visible, human approval is enforced where required, and every important action has a traceable state.

---

# Related Documents

- DAILY_INTELLIGENCE_WORKFLOW.md
- CONTENT_PRODUCTION_WORKFLOW.md
- CONTENT_REPURPOSING_WORKFLOW.md
- HUMAN_APPROVAL_WORKFLOW.md
- ANALYTICS_FEEDBACK_WORKFLOW.md
- AI_MODEL_TOOL.md
- SUPABASE_TOOL.md

---

# Status

Approved

Version 1.0
