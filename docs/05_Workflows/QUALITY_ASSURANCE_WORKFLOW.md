# Quality Assurance Workflow

**Version:** 1.0

**Project:** Afzal Ahmad AI HQ

**Workflow:** Fact-Checking, SEO, GEO, Originality, Formatting & Publication Quality

**Status:** Approved

**Priority:** Critical

---

# 1. Objective

Ensure that AI HQ outputs are accurate, useful, clear, properly sourced, search-optimized, generative-engine-friendly, and ready for human review before publication or delivery.

Quality assurance is a validation layer, not a replacement for human judgment.

---

# 2. Core Principle

```text
Generate
  ↓
Validate
  ↓
Improve
  ↓
Validate Again
  ↓
Human Approval
  ↓
Publish / Deliver
```

The system must never mark an output as fully approved simply because generation completed successfully.

---

# 3. QA Gates

Every applicable content workflow should pass these gates:

1. Requirement check
2. Factual check
3. Source check
4. Relevance check
5. SEO check
6. GEO check
7. Originality / duplication check
8. Readability and structure check
9. Brand consistency check
10. Safety and policy check
11. Final human approval where required

---

# 4. Requirement Validation

Confirm that the output satisfies the original brief.

Check:

- Correct platform
- Correct topic
- Correct audience
- Correct format
- Required sections included
- Requested length or limits respected
- Call-to-action requirements respected

Missing requirements should be flagged rather than silently ignored.

---

# 5. Factual Validation

Important factual claims should be checked against reliable sources when the workflow requires current or evidence-based information.

The QA agent should distinguish:

- Verified fact
- Reasonable interpretation
- Opinion
- Uncertain claim
- Unsupported claim

Unsupported claims should be removed, qualified, or researched further.

---

# 6. Source Validation

For research-based content, record relevant source references.

Prefer authoritative and primary sources where appropriate.

Do not invent citations, URLs, statistics, studies, quotations, or source names.

If a source cannot be verified, the system must not present it as verified.

---

# 7. SEO Quality Gate

The SEO Agent should review applicable content for:

- Search intent alignment
- Topic coverage
- Useful title
- Clear headings
- Natural keyword usage
- Semantic relevance
- Internal-link opportunities where applicable
- Metadata recommendations where applicable
- Search-result usefulness

Avoid keyword stuffing and manipulative optimization.

SEO recommendations must serve the reader first.

---

# 8. GEO Quality Gate

The GEO Agent should optimize content for generative and answer-oriented discovery by improving:

- Clear definitions
- Direct answers
- Logical structure
- Entity/context clarity
- Evidence and attribution
- Concise factual statements
- Useful headings and question-answer sections where appropriate
- Consistent terminology

GEO optimization must not mean writing unnatural text solely for AI systems.

---

# 9. Originality & Duplication Check

Before publication, check whether the output unnecessarily duplicates existing content in the project's content library.

Look for:

- Repeated topics
- Near-identical outlines
- Reused claims without added value
- Duplicate titles
- Excessive repetition across platforms

Repurposing is allowed when it provides a meaningful platform-specific transformation.

---

# 10. Readability & Structure

Review for:

- Clear opening
- Logical flow
- Short, useful sections
- Appropriate headings
- Natural language
- Grammar and spelling
- Unnecessary repetition
- Clear conclusion or next step

The output should be understandable to the intended audience without unnecessary complexity.

---

# 11. Brand Consistency

Check against approved brand memory:

- Afzal Ahmad positioning
- Target audience
- Content pillars
- Tone
- Language
- Strategic goals

If a draft conflicts with an approved brand decision, flag it for review.

---

# 12. Platform-Specific QA

## YouTube

Check:

- Topic/title alignment
- Viewer value
- Hook clarity
- Script structure
- Description quality
- Metadata
- Claims and sources

## LinkedIn

Check:

- Professional relevance
- Clear opening
- Useful insight
- Readability
- Appropriate CTA
- No unsupported claims

## Blog / SEO Content

Check:

- Search intent
- Heading hierarchy
- Source quality
- Internal-link opportunities
- Metadata
- Helpful structure

---

# 13. Safety & Policy Check

Before public delivery, identify content that may violate applicable platform rules, privacy requirements, or project safety policies.

The QA layer must not help conceal harmful, deceptive, or unauthorized activity.

When uncertain, escalate to human review.

---

# 14. Quality Scoring

The implementation may use a structured score such as:

```text
Requirements     0–100
Facts            0–100
Sources          0–100
SEO              0–100
GEO              0–100
Originality      0–100
Readability      0–100
Brand Fit        0–100
```

Scores are decision-support signals, not proof of quality.

A high numerical score must not override a critical factual or safety failure.

---

# 15. Critical Failure Rules

An output must fail QA when it contains, where applicable:

- Fabricated facts
- Fabricated sources
- Materially incorrect claims
- Missing required evidence
- Exposed secrets or private credentials
- Unauthorized external instructions
- Major requirement failures
- Unresolved high-risk uncertainty

---

# 16. Revision Loop

```text
Draft
 ↓
QA
 ↓
Issues Found?
 ├── No → Human Approval
 └── Yes
       ↓
    Revision
       ↓
      QA
```

The system should limit revision loops to avoid wasting model usage.

---

# 17. Human Approval

For public-facing content, the final approval gate should identify:

- Content version
- QA status
- Important warnings
- Sources
- Recommended changes

The approved version must be the version sent to a publishing tool.

---

# 18. QA Record

Store where appropriate:

- Content ID
- Version
- QA timestamp
- Checks performed
- Failed checks
- Warnings
- Sources reviewed
- Final QA status
- Reviewer / approval state

---

# 19. Cost Control

QA should be efficient.

Use lightweight checks for routine formatting and structure, and reserve stronger model/research passes for claims or tasks that genuinely need them.

Do not run the same QA check repeatedly without a meaningful revision.

---

# 20. Success Criteria

The QA workflow succeeds when content is systematically checked for requirements, facts, sources, SEO, GEO, originality, readability, brand consistency, and safety before the appropriate approval or publishing stage, with failures clearly identified rather than hidden.

---

# Related Documents

- CONTENT_PRODUCTION_WORKFLOW.md
- HUMAN_APPROVAL_WORKFLOW.md
- AGENT_ORCHESTRATION_WORKFLOW.md
- SEO_AGENT.md
- GEO_AGENT.md
- ANALYTICS_FEEDBACK_WORKFLOW.md
- COST_CONTROL_WORKFLOW.md
- SECURITY_WORKFLOW.md

---

# Status

Approved

Version 1.0
