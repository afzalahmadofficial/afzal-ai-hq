# Human Approval Workflow

**Version:** 1.0

**Project:** Afzal Ahmad AI HQ

**Workflow:** AI Content Review, Approval & Publishing Control

**Status:** Approved

**Priority:** Critical

---

# 1. Objective

Ensure AI-generated content is reviewed, corrected, and explicitly approved before public publishing or other consequential external actions.

The workflow creates a clear boundary between **AI preparation** and **human authorization**.

---

# 2. Core Principle

```text
AI prepares
   ↓
AI checks
   ↓
Human reviews
   ↓
Human approves
   ↓
Authorized tool publishes
```

AI output must not automatically become a public action merely because generation completed successfully.

---

# 3. Content Status Lifecycle

```text
DRAFT
  ↓
AI_REVIEW
  ↓
AWAITING_HUMAN_REVIEW
  ↓
  ├── REVISION_REQUIRED → DRAFT
  ├── REJECTED
  └── APPROVED
          ↓
       PUBLISHING
          ↓
       PUBLISHED
          ↓
       ANALYZING
```

---

# 4. Stage 1 — AI Draft

The relevant content agent creates the draft from an approved content brief and research evidence.

The draft should include source references where factual claims require verification.

---

# 5. Stage 2 — Automated Quality Checks

Before human review, the system should check where applicable:

- Required fields
- Formatting
- Duplicate content
- Unsupported claims
- Source presence
- Brand alignment
- SEO requirements
- GEO structure
- Platform requirements
- Obvious policy concerns

Automated checks are filters, not substitutes for human judgment.

---

# 6. Stage 3 — Human Review

The reviewer should evaluate:

- Accuracy
- Usefulness
- Originality
- Tone
- Clarity
- Audience fit
- Sources
- Platform fit
- Potential misunderstandings
- Final call to action

The reviewer can approve, request revisions, or reject the content.

---

# 7. Approval Actions

### Approve

Moves the content to the publishing queue.

### Request Revision

Returns the content to the appropriate agent with specific feedback.

### Reject

Stops the publication workflow and preserves the record for historical reference.

### Save for Later

Keeps the content without publishing it and allows future review.

---

# 8. Revision Workflow

```text
Human Feedback
      ↓
Content Agent
      ↓
Updated Draft
      ↓
Automated Checks
      ↓
Human Review
```

A revision must not silently overwrite the approved version. Approval should apply to the current version only.

---

# 9. Version Control

Every meaningful revision should have a version identifier.

Example:

```text
Content #102
v1 Draft
v2 Revised
v3 Approved
v4 Published
```

If the published content changes materially, it should return to review before the updated version is published.

---

# 10. Publishing Gate

Publishing is allowed only when:

- Content status is `APPROVED`.
- Required checks have passed.
- Required authorization exists.
- The target platform connection is valid.
- The exact approved version is being published.

The system must not publish a stale draft after a newer revision has been approved.

---

# 11. Publication Confirmation

After a publishing tool executes, the system must verify the result using the platform's response or authorized API.

Only after confirmation should the record change to `PUBLISHED`.

If confirmation is unavailable, the record must remain in an appropriate uncertain/error state rather than falsely claiming success.

---

# 12. High-Risk Actions

Human approval is required for consequential actions including:

- Public content publication
- Account-level changes
- External communications
- Changes to important automation rules
- Actions that could materially affect reputation or access

Additional controls may be added later for specific integrations.

---

# 13. Security

Credentials, access tokens, and private account data must never be placed inside content drafts, GitHub documentation, or approval comments.

Approval records should contain the minimum necessary information.

---

# 14. Audit Trail

The system should retain:

- Content ID
- Version
- Reviewer
- Review timestamp
- Decision
- Feedback
- Approval timestamp
- Publishing result
- Published content ID when available

This creates a reliable history of what was approved and published.

---

# 15. Failure Handling

If an approval, validation, or publishing step fails:

- Preserve the current content version.
- Record the failure.
- Do not assume approval or publication occurred.
- Allow the workflow to resume safely after correction.

---

# 16. Supabase Integration

Approval state and audit metadata should be stored through the Supabase data layer.

Suggested fields include:

- `content_id`
- `version`
- `status`
- `reviewer`
- `review_notes`
- `approved_at`
- `published_at`
- `platform`
- `platform_content_id`

Exact schema will be finalized during implementation.

---

# 17. AI Model Integration

The AI Model Tool may perform automated quality checks and revisions, but it cannot grant human approval unless a future explicit policy changes the control model.

Model-generated confidence scores must not be treated as human authorization.

---

# 18. Success Criteria

The workflow succeeds when every consequential public action has a traceable approval state, the exact approved version is published, and publication is confirmed by the connected platform.

---

# Related Documents

- CONTENT_PRODUCTION_WORKFLOW.md
- CONTENT_REPURPOSING_WORKFLOW.md
- DAILY_INTELLIGENCE_WORKFLOW.md
- SUPABASE_TOOL.md
- AI_MODEL_TOOL.md
- YOUTUBE_TOOL.md
- LINKEDIN_TOOL.md

---

# Status

Approved

Version 1.0
