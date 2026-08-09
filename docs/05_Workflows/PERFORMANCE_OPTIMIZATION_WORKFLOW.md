# Performance Optimization Workflow

**Version:** 1.0

**Project:** Afzal Ahmad AI HQ

**Workflow:** Speed, Efficiency, Token Usage, Caching & Resource Optimization

**Status:** Approved

**Priority:** High

---

# 1. Objective

Keep AI HQ fast, efficient, reliable, and economical without reducing factual accuracy, security, or output quality.

Optimization should improve the system rather than simply making it do less work.

---

# 2. Core Principle

```text
Measure
  ↓
Identify Bottleneck
  ↓
Optimize
  ↓
Validate Quality
  ↓
Measure Again
```

Do not optimize based only on assumptions.

---

# 3. Performance Areas

Monitor and optimize where useful:

- Workflow execution time
- Agent latency
- AI model calls
- Token/context size
- Research requests
- Database queries
- External tool calls
- Repeated computations
- Scheduling overhead
- Publishing verification

---

# 4. Parallel Execution

Independent tasks should run in parallel when the selected runtime supports it safely.

Example:

```text
             ┌─ Research
Orchestrator ├─ SEO
             ├─ GEO
             └─ Competitor Analysis
                    ↓
                 Synthesis
```

Do not parallelize tasks that depend on the output of another task.

---

# 5. Sequential Dependencies

Dependent work should remain sequential.

Example:

```text
Research
   ↓
Content Brief
   ↓
Draft
   ↓
QA
```

Trying to parallelize these steps can create incorrect or incomplete inputs.

---

# 6. Token Efficiency

Reduce unnecessary model context by:

- Sending only relevant records.
- Using structured summaries.
- Reusing validated research.
- Avoiding repeated instructions.
- Limiting unnecessary output length.
- Splitting large tasks into logical stages.

Do not remove information that is necessary for factual accuracy or safety.

---

# 7. Context Compression

When a long history is not required, provide a concise validated summary instead.

```text
Large History
     ↓
Relevant Facts
     ↓
Structured Summary
     ↓
Next Agent
```

The summary should preserve important constraints, decisions, sources, and unresolved issues.

---

# 8. Caching

Cache stable and reusable information where appropriate.

Potential candidates:

- Research results
- Source metadata
- Content briefs
- Brand configuration
- Repeated calculations
- Stable system configuration

Time-sensitive information must have an appropriate freshness policy.

---

# 9. Cache Invalidation

A cached result should not be treated as current forever.

Invalidate or refresh when:

- The source changes.
- The freshness window expires.
- The user requests fresh research.
- The underlying configuration changes.
- The result becomes unreliable.

---

# 10. Duplicate Work Prevention

Before starting expensive work, check whether a valid result already exists.

```text
Need Result
   ↓
Existing Valid Result?
 ├─ Yes → Reuse
 └─ No  → Execute
```

Do not reuse outdated or contextually incompatible results merely to save resources.

---

# 11. Database Efficiency

Use efficient database operations where supported:

- Fetch only required columns/records.
- Avoid unnecessary repeated queries.
- Batch compatible operations.
- Use appropriate indexes when needed.
- Avoid excessive polling.
- Keep temporary data separate from long-term memory.

Database optimization must preserve data integrity and authorization rules.

---

# 12. Tool Call Efficiency

Before calling an external tool, determine whether the result is actually needed.

Avoid:

- Duplicate searches
- Repeated identical API calls
- Unnecessary status polling
- Excessive retries

Use retry limits defined by the error-recovery workflow.

---

# 13. Agent Efficiency

Agents should have narrow responsibilities.

A specialized agent should receive:

- Clear objective
- Relevant context
- Required tools
- Expected output schema

Avoid sending every task through every agent.

---

# 14. Model Routing

Use a lightweight suitable model for simple tasks and a stronger authorized model for tasks that genuinely require additional reasoning or quality.

Model routing must respect the project's **$0-first cost policy**.

Never switch to a paid model silently.

---

# 15. Retry Efficiency

Retries should address transient failures rather than repeat permanent failures.

Example:

```text
Transient error → limited retry
Permanent error → fallback/escalation
```

Every retry consumes resources and should have a clear reason.

---

# 16. Scheduling Efficiency

Scheduled workflows should avoid unnecessary overlapping runs.

The scheduler should use duplicate-run protection and should not start a second Daily Intelligence run while an equivalent run is already active unless explicitly requested.

---

# 17. Quality Protection

Performance optimization must never bypass:

- Fact checking
- Security checks
- Human approval requirements
- Required source validation
- Publishing verification

A faster incorrect output is not an optimization.

---

# 18. Performance Metrics

Where measurable, track:

- End-to-end workflow duration
- Agent duration
- Tool latency
- Model latency
- Token usage
- Retry rate
- Cache hit rate
- Database query duration
- Failure rate

Metrics that are unavailable should be marked unavailable rather than estimated without evidence.

---

# 19. Optimization Review

When a workflow becomes slow or expensive:

1. Inspect monitoring data.
2. Identify the slowest or most expensive component.
3. Confirm the bottleneck.
4. Apply the smallest useful optimization.
5. Run QA.
6. Compare before/after measurements.

---

# 20. Success Criteria

The performance optimization workflow succeeds when AI HQ completes useful work efficiently, avoids unnecessary calls and duplicate processing, maintains acceptable latency, respects the $0-first policy, and preserves quality, security, and approval controls.

---

# Related Documents

- COST_CONTROL_WORKFLOW.md
- MONITORING_OBSERVABILITY_WORKFLOW.md
- DATA_FLOW_WORKFLOW.md
- AGENT_ORCHESTRATION_WORKFLOW.md
- ERROR_RECOVERY_WORKFLOW.md
- QUALITY_ASSURANCE_WORKFLOW.md
- SCHEDULING_WORKFLOW.md

---

# Status

Approved

Version 1.0
