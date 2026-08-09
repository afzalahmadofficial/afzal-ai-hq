# Content Production Workflow

**Version:** 1.0

**Project:** Afzal Ahmad AI HQ

**Workflow:** Intelligence-to-Content Production Pipeline

**Status:** Approved

**Priority:** Critical

---

# 1. Objective

Convert validated intelligence and approved opportunities into original, useful, platform-specific content for Afzal Ahmad.

The workflow covers LinkedIn, YouTube, Blog, and Newsletter content while keeping research, creation, review, publishing, and analytics as separate stages.

---

# 2. High-Level Flow

```text
Daily Intelligence
        ↓
Content Opportunity
        ↓
Prioritization
        ↓
Content Brief
        ↓
Draft
        ↓
SEO + GEO Optimization
        ↓
Quality Review
        ↓
Human Approval
        ↓
Platform Publishing
        ↓
Analytics
        ↓
Memory + Learning
```

---

# 3. Stage 1 — Select Opportunity

The Content Strategy Agent selects opportunities using:

- Audience relevance
- Timeliness
- Evidence quality
- Strategic value
- Originality
- Platform fit
- Production effort

Not every discovered topic should become content.

---

# 4. Stage 2 — Create Content Brief

Every selected idea should receive a structured brief containing:

- Working title
- Target audience
- Audience problem
- Core promise
- Key points
- Evidence/source requirements
- Original angle
- Platform
- Format
- Call to action, when appropriate

---

# 5. Stage 3 — Research & Evidence

The Research Agent supplies relevant evidence and source references.

Current or factual claims should be checked against reliable sources before publication.

The system must distinguish facts, interpretations, opinions, and recommendations.

---

# 6. Stage 4 — Drafting

The appropriate content agent creates the first draft.

### LinkedIn

Create concise professional posts focused on one clear idea, useful insight, lesson, framework, or discussion.

### YouTube

Create a video concept, title options, hook, outline/script, description, and supporting metadata.

### Blog

Create a structured article designed around user intent, useful explanations, evidence, and natural search optimization.

### Newsletter

Create a concise digest or original analysis based on validated intelligence.

---

# 7. Stage 5 — SEO Optimization

The SEO Agent checks:

- Search intent
- Topic coverage
- Natural keyword use
- Headings
- Internal-link opportunities
- Metadata where relevant
- Content gaps

Optimization must never reduce readability or encourage keyword stuffing.

---

# 8. Stage 6 — GEO Optimization

The GEO Agent improves the content's clarity and structure for generative/answer systems.

It may improve:

- Direct answers
- Definitions
- Clear headings
- Factual statements
- Source attribution
- Entity context
- Question-answer sections
- Original insights

GEO optimization must never promise that an AI system will cite or recommend the content.

---

# 9. Stage 7 — Quality Review

Before approval, verify:

- Accuracy
- Source quality
- Originality
- Clarity
- Brand alignment
- Audience usefulness
- Platform fit
- SEO quality
- GEO clarity
- No unsupported claims
- No copied competitor material

---

# 10. Stage 8 — Human Approval

Content intended for public publication should normally require human approval before publishing.

The reviewer should be able to:

- Approve
- Request edits
- Reject
- Save for later

The system must preserve the review status.

---

# 11. Stage 9 — Publishing

After approval, the appropriate platform tool may prepare or perform publishing when an authorized integration exists.

Publishing must be confirmed by the platform/API before the system records the content as published.

No tool may claim successful publication without confirmation.

---

# 12. Stage 10 — Analytics

After publication, the Analytics Agent records available performance information.

Examples:

- Views
- Impressions
- Engagement
- Watch time
- Clicks
- Follower/subscriber changes
- Traffic sources

Metrics must include their source and measurement time where available.

---

# 13. Stage 11 — Learning Loop

Analytics and audience feedback should influence future content decisions.

```text
Content
  ↓
Performance
  ↓
Analysis
  ↓
Learning
  ↓
New Content Opportunities
```

Past performance is evidence, not a guarantee of future performance.

---

# 14. Content Repurposing

A strong original idea may be adapted into multiple formats.

Example:

```text
Research Insight
      ↓
Long-form Blog
   ↙        ↘
YouTube    LinkedIn
   ↓          ↓
Short Clips / Discussion
```

Repurposed content must be adapted to each platform rather than mechanically duplicated.

---

# 15. Content Status Lifecycle

```text
idea
↓
selected
↓
briefed
↓
drafting
↓
review
↓
revision
↓
approved
↓
published
↓
measured
↓
archived / repurposed
```

---

# 16. Storage

Supabase should store structured records such as:

- Content idea
- Brief
- Draft status
- Approval status
- Publication metadata
- Source references
- Analytics references
- Repurposing relationships

Full credentials or secrets must never be stored in content records.

---

# 17. AI Model Strategy

The workflow uses the AI Model Tool and remains independent of any single provider.

Free or low-cost models should handle suitable routine tasks when available. More capable models may be used for complex reasoning or final review when available and justified.

---

# 18. Failure Handling

If research, generation, optimization, publishing, or analytics fails:

- Record the failure.
- Do not fabricate missing information.
- Preserve the last valid state.
- Retry only when safe.
- Allow human intervention when required.

---

# 19. Success Criteria

The workflow succeeds when it consistently converts high-quality intelligence into original, useful, reviewed, platform-appropriate content and then learns from real performance data.

---

# Related Documents

- DAILY_INTELLIGENCE_WORKFLOW.md
- CONTENT_STRATEGY_AGENT.md
- RESEARCH_AGENT.md
- SEO_AGENT.md
- GEO_AGENT.md
- YOUTUBE_TOOL.md
- LINKEDIN_TOOL.md
- SUPABASE_TOOL.md
- AI_MODEL_TOOL.md

---

# Status

Approved

Version 1.0
