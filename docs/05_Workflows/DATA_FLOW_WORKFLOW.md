# Data Flow Workflow

**Version:** 1.0

**Project:** Afzal Ahmad AI HQ

**Workflow:** Data Movement Across GitHub, Supabase, Agents, Models, Tools & Content

**Status:** Approved

**Priority:** Critical

---

# 1. Objective

Define how information moves through Afzal AI HQ so every component has a clear role, data ownership is understandable, and agents receive only the context required for their task.

---

# 2. System Data Flow

```text
User / Schedule
      ↓
Orchestrator
      ↓
Task + Context
      ↓
Research / Platform Tools
      ↓
Validated Evidence
      ↓
Agents + AI Models
      ↓
Structured Outputs
      ↓
Supabase State / Memory
      ↓
Human Approval
      ↓
Publishing Tools
      ↓
Platform Results
      ↓
Analytics
      ↓
Memory + Strategy Feedback
```

GitHub primarily stores the project's documentation, specifications, configuration examples, and implementation code. Supabase is the planned runtime data and memory layer.

---

# 3. Source of Truth by Data Type

| Data | Primary Location |
|---|---|
| Product/system specifications | GitHub |
| Workflow documentation | GitHub |
| Application code | GitHub |
| Runtime workflow state | Supabase |
| Structured memory | Supabase |
| Research records | Supabase / approved source references |
| Content records | Supabase |
| Published platform IDs | Supabase |
| Secrets | Secure runtime secret storage |

No live secrets belong in GitHub.

---

# 4. Input Layer

Inputs may originate from:

- Human requests
- Scheduled workflows
- Approved research tools
- Connected platform APIs
- Analytics providers
- Existing system memory

Every external input should be treated as untrusted until validated.

---

# 5. Orchestrator Layer

The Orchestrator converts an objective into structured tasks.

A task should contain only relevant information such as:

- Task ID
- Objective
- Required agent
- Inputs
- Constraints
- Expected output
- Dependencies

The Orchestrator should not unnecessarily copy the complete project history into every task.

---

# 6. Research Data Flow

```text
Research Tool
     ↓
Raw Result
     ↓
Source Validation
     ↓
Structured Finding
     ↓
Research Record
```

Raw research should not automatically become long-term memory. Useful validated findings can be promoted according to `MEMORY_WORKFLOW.md`.

---

# 7. AI Model Data Flow

```text
Relevant Context
      ↓
AI Model Tool
      ↓
Generated Result
      ↓
Validation
      ↓
Structured Agent Output
```

The model provider is an execution layer, not the system's permanent source of truth.

Important facts should remain traceable to their sources rather than relying solely on model-generated knowledge.

---

# 8. Agent-to-Agent Flow

Agents communicate through structured task outputs rather than uncontrolled conversational chains.

Example:

```text
Research Agent
      ↓
Research Output
      ↓
SEO Agent + GEO Agent + Competitor Agent
      ↓
Combined Analysis
      ↓
Content Strategy Agent
```

Each downstream agent should know which upstream output it is consuming.

---

# 9. Supabase Data Flow

Supabase stores persistent structured state such as:

- Tasks
- Content records
- Research findings
- Memory
- Approval state
- Analytics
- Platform identifiers
- Error records

Agents should access this data through authorized application interfaces and policies.

---

# 10. Content Data Flow

```text
Research
  ↓
Content Brief
  ↓
Draft
  ↓
SEO + GEO
  ↓
Quality Review
  ↓
Human Approval
  ↓
Approved Version
  ↓
Publishing Tool
```

The approved version must be immutable for the publishing transaction. If it changes materially, it should return to approval.

---

# 11. Publishing Data Flow

Publishing tools receive:

- Approved content
- Target platform
- Required metadata
- Authorized account/connection

After execution, the system records the platform response and verifies publication where possible.

The system must not mark content as published solely because a request was sent.

---

# 12. Analytics Data Flow

```text
Published Content
      ↓
Platform Analytics
      ↓
Metric Collection
      ↓
Validation
      ↓
Analytics Record
      ↓
Insight
```

Analytics records should remain linked to the relevant content and platform.

---

# 13. Memory Data Flow

```text
New Finding / Lesson
       ↓
Relevance Check
       ↓
Validation
       ↓
Memory Candidate
       ↓
Supabase Memory
       ↓
Future Retrieval
```

Memory should be selective and should include source/date/confidence information where appropriate.

---

# 14. Daily Intelligence Flow

At the configured target time of **2:00 PM PKT**, once an actual scheduler is implemented:

```text
Scheduler
   ↓
Orchestrator
   ↓
Research + Competitor + SEO + GEO
   ↓
Validated Intelligence
   ↓
Daily Report
   ↓
Supabase / Delivery
   ↓
Human Action
```

The schedule is a specification until a working scheduler is connected.

---

# 15. Security Boundaries

Sensitive boundaries include:

```text
Secrets ──X──> GitHub / Content / Logs

External Input ──→ Validation ──→ Agent

Agent ──→ Approval ──→ Public Action

Supabase ──→ Authorized Access Only
```

Agents must not expose credentials through prompts, outputs, reports, or logs.

---

# 16. Data Minimization

For every task, ask:

- What data is actually needed?
- Can a summary replace a full document?
- Can an existing validated record be reused?
- Does this data need to persist?

This improves privacy, security, cost, and model efficiency.

---

# 17. Data Validation Gates

Validation should occur at major boundaries:

1. External input → source validation.
2. Research → evidence validation.
3. Agent output → schema/quality validation.
4. Content → human approval.
5. Publishing → platform confirmation.
6. Analytics → metric validation.
7. Memory → relevance and confidence validation.

---

# 18. Error Flow

When a component fails:

```text
Failure
 ↓
Record Error
 ↓
Preserve Last Valid Data
 ↓
Retry / Fallback
 ↓
Verify
 ↓
Continue or Escalate
```

See `ERROR_RECOVERY_WORKFLOW.md` for detailed behavior.

---

# 19. Data Retention

Retention rules should depend on the data type.

- Temporary task data: retain only as needed.
- Research: retain according to usefulness and freshness.
- Published content records: retain for historical and analytics purposes.
- Strategic memory: retain until outdated, superseded, or intentionally removed.
- Secrets: never store in application data when secure secret storage is available.

Exact retention periods will be defined during implementation where required.

---

# 20. Success Criteria

The data-flow architecture succeeds when every major data movement has a defined source, destination, validation boundary, security boundary, and ownership model, while unnecessary duplication and uncontrolled data exposure are minimized.

---

# Related Documents

- AGENT_ORCHESTRATION_WORKFLOW.md
- MEMORY_WORKFLOW.md
- SECURITY_WORKFLOW.md
- ERROR_RECOVERY_WORKFLOW.md
- HUMAN_APPROVAL_WORKFLOW.md
- COST_CONTROL_WORKFLOW.md
- SUPABASE_TOOL.md
- AI_MODEL_TOOL.md

---

# Status

Approved

Version 1.0
