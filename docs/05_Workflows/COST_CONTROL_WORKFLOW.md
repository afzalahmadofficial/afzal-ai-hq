# Cost Control Workflow

**Version:** 1.0

**Project:** Afzal Ahmad AI HQ

**Workflow:** Free-First AI Usage, Token Efficiency & Cost Protection

**Status:** Approved

**Priority:** Critical

---

# 1. Objective

Keep Afzal AI HQ operational with a **$0-first strategy**, minimizing unnecessary AI/API usage and avoiding unexpected paid charges.

The system should use free or locally available options for suitable tasks and require explicit authorization before any paid service is used.

---

# 2. Core Principle

```text
Free option available?
      ↓
     YES → Use free option
      ↓ NO
Low-cost option available?
      ↓
     YES → Check authorization
      ↓ NO / NOT AUTHORIZED
Safe fallback or human decision
```

**No automatic paid usage.**

---

# 3. Cost Tiers

## Tier 0 — Free

Preferred for routine work whenever quality is sufficient.

Examples may include:

- Free AI plans
- Free web research tools
- GitHub repository features available on the current plan
- Supabase features available on the current plan
- Open-source/local tools where practical

Availability and limits must be checked at implementation time.

## Tier 1 — Low Cost

Allowed only after checking the user's current budget and explicit authorization.

## Tier 2 — Paid / Higher Cost

Never activate automatically.

Requires explicit human approval before use.

---

# 4. Model Routing Strategy

The AI Model Tool should select an appropriate model based on task complexity and current availability.

### Routine Tasks

Use an available free/low-cost model for:

- Formatting
- Classification
- Simple transformations
- Basic summarization
- Metadata preparation

### Complex Tasks

Use a stronger model only when the task genuinely requires it and an authorized option exists.

The system must not claim that GPT-5.5 or another paid model is available unless an authorized connection actually provides it.

---

# 5. Claude Free / Free-Plan Strategy

When a suitable free Claude plan or another free model is available through the user's authorized setup, it may be used for appropriate tasks.

The system must respect the provider's current usage limits and must not attempt to bypass them.

If a free quota is exhausted, use an approved alternative or wait for reset rather than silently switching to a paid service.

---

# 6. Prompt Efficiency

Reduce unnecessary token usage by:

- Sending only relevant context.
- Reusing structured summaries.
- Avoiding repeated long instructions.
- Breaking large tasks into efficient stages.
- Caching stable information where appropriate.
- Avoiding duplicate research.
- Asking models for the required output format only.

Do not sacrifice factual accuracy merely to reduce token usage.

---

# 7. Context Management

Agents should not receive the entire project history for every task.

Instead:

```text
Task
 ↓
Relevant Memory
 ↓
Relevant Sources
 ↓
Required Instructions
 ↓
Model
```

This reduces both cost and unnecessary context noise.

---

# 8. Research Cost Control

Avoid repeatedly researching the same information during one workflow.

Use source references and validated research records when appropriate.

Fresh research should be performed when information is time-sensitive or the existing evidence is outdated.

---

# 9. Content Generation Cost Control

Generate the minimum useful artifact first.

Example:

```text
Idea
 ↓
Brief
 ↓
Outline
 ↓
Draft
 ↓
Review
```

Do not generate five complete scripts when only one approved concept is required.

---

# 10. Repurposing Cost Control

Use the master content brief as the source for derivative content rather than repeatedly researching the same topic.

Where possible, reuse validated facts and source references while generating platform-specific versions.

---

# 11. Workflow Scheduling

Scheduled workflows should run only when they provide meaningful value.

The Daily Intelligence workflow is targeted for **2:00 PM PKT**, but the schedule must only be activated through an actual scheduler/orchestration system.

A documented schedule does not itself create a running job.

---

# 12. Usage Monitoring

Track available usage information such as:

- Model/provider
- Task
- Approximate tokens where available
- API calls
- Tool calls
- Estimated cost where available
- Failure/retry count

Do not invent cost data when a provider does not expose it.

---

# 13. Budget Guardrails

Recommended controls:

- Paid usage disabled by default.
- Per-task budget where supported.
- Daily/monthly spending threshold where supported.
- Maximum retry count.
- Alert before paid usage.
- Automatic stop when the authorized budget is reached.

Exact implementation depends on the selected providers and runtime.

---

# 14. Credit Exhaustion

If a provider's free credits/quota are exhausted:

1. Record the exhaustion event.
2. Do not bypass provider limits.
3. Try an approved free alternative when available.
4. Reduce or defer non-critical work.
5. Ask for human authorization before paid usage.

---

# 15. Paid-Service Authorization

A paid service may be used only when:

- The service is actually connected.
- The price/usage model is understood sufficiently.
- The action is necessary or materially beneficial.
- Explicit authorization exists.

The system must never infer payment authorization from the existence of a connected account.

---

# 16. Failure & Fallback

If the preferred free model fails:

```text
Free Model A
     ↓ fail
Free Model B / approved free tool
     ↓ fail
Defer or Human Decision
```

Do not automatically escalate to a paid model.

---

# 17. Cost vs Quality Rule

Cost optimization must not create misleading or low-quality outputs.

For important factual, strategic, or public-facing content, quality requirements remain mandatory even when using free tools.

---

# 18. Supabase & Infrastructure Costs

Monitor plan limits for database storage, API usage, bandwidth, and other infrastructure resources where relevant.

Avoid unnecessary polling, duplicate writes, and excessive storage.

The system should use the current free-tier capabilities where they are sufficient.

---

# 19. Human Control

The human owner should be able to:

- Enable/disable paid providers.
- Set budget limits.
- Select preferred free models.
- Pause scheduled workflows.
- Review usage.

---

# 20. Success Criteria

The cost-control workflow succeeds when AI HQ completes useful work primarily through free resources, avoids unnecessary model/tool calls, respects provider limits, never silently creates paid usage, and keeps quality high enough for the intended task.

---

# Related Documents

- AI_MODEL_TOOL.md
- AGENT_ORCHESTRATION_WORKFLOW.md
- ERROR_RECOVERY_WORKFLOW.md
- DAILY_INTELLIGENCE_WORKFLOW.md
- CONTENT_PRODUCTION_WORKFLOW.md
- SECURITY_WORKFLOW.md

---

# Status

Approved

Version 1.0
