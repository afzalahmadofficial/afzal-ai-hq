# Daily Intelligence Workflow

**Version:** 1.0

**Project:** Afzal Ahmad AI HQ

**Workflow:** Daily Intelligence & Content Opportunity Pipeline

**Schedule:** 2:00 PM PKT daily

**Status:** Approved

## Objective

Create a repeatable workflow that collects fresh intelligence, verifies important information, identifies opportunities, and produces an executive report for Afzal Ahmad.

## High-Level Flow

```text
Web Research + RSS
        ↓
Research Agent
        ↓
Competitor Agent
        ↓
SEO + GEO
        ↓
Content Strategy
        ↓
YouTube / LinkedIn / Blog
        ↓
Report Agent
        ↓
Daily Report — 2 PM PKT
        ↓
Human Review / Action
        ↓
Memory + Analytics
```

## Workflow Steps

### 1. Collect Fresh Intelligence

Web Research and RSS tools collect current information from approved sources, including AI news, product launches, research, industry developments, SEO developments, and relevant audience questions.

### 2. Research Processing

The Research Agent removes duplication, evaluates source quality, summarizes findings, and records source, date, topic, evidence, confidence, and relevance.

### 3. Competitor Intelligence

The Competitor Agent reviews approved competitor activity, including new content, recurring themes, formats, positioning, audience problems, and potential gaps. Competitor content is used for learning only and must not be copied.

### 4. SEO Analysis

The SEO Agent evaluates search intent, topic clusters, related questions, content gaps, article opportunities, and YouTube search opportunities. Metrics must never be fabricated.

### 5. GEO Analysis

The GEO Agent improves opportunities for clarity and usefulness in generative and answer engines through direct answers, clear definitions, logical structure, evidence, useful entities, concise factual sections, and original insights. No AI citation or visibility guarantees are allowed.

### 6. Content Strategy

The Content Strategy Agent combines research, competitor intelligence, SEO, and GEO findings into prioritized opportunities for LinkedIn, YouTube, Blog, and Newsletter.

Each recommendation includes topic, platform, format, audience problem, why now, and original angle.

### 7. Platform Planning

**YouTube:** Identify relevant videos, emerging topics, competitor patterns, and original video concepts.

**LinkedIn:** Identify relevant discussions and content opportunities while respecting platform rules.

**Blog:** Convert SEO/GEO findings into article opportunities and outlines.

No content is automatically published at this stage.

### 8. Report Generation

The Report Agent produces:

1. Executive Summary
2. AI News
3. Trending Topics
4. Competitor Intelligence
5. Content Opportunities
6. YouTube Opportunities
7. LinkedIn Opportunities
8. Blog Opportunities
9. SEO Intelligence
10. GEO Intelligence
11. Tools & Automation
12. Recommended Actions

## 2:00 PM PKT Delivery

The target schedule is **2:00 PM Pakistan Standard Time every day**.

This becomes an actual automated delivery only after an orchestration/scheduling system is connected. Documentation of the schedule must not be confused with an active scheduled job.

## Decision Layer

Every report ends with:

- **Top 3 Priorities** — highest-value actions.
- **Top 3 Content Opportunities** — strongest evidence-backed ideas.
- **One Strategic Insight** — an observation that may affect longer-term strategy.

## Human Approval

The system provides intelligence and recommendations. Public publishing, account actions, major strategic decisions, and external communications require human approval unless an explicit future automation policy authorizes them.

## Memory Storage

After finalization, important structured information should be stored through the Supabase/Memory layer, including reports, research findings, important sources, decisions, actions, content ideas, and competitor observations.

## Analytics Feedback Loop

```text
Published Content
      ↓
   Analytics
      ↓
Performance Insights
      ↓
Content Strategy
      ↓
Next Opportunities
```

This creates continuous improvement.

## AI Model Routing

Use the AI Model Tool rather than hard-coding a single provider. Routine tasks should use suitable free/low-cost models where available. Complex reasoning may use a stronger authorized model. If no suitable model is available, report the limitation rather than fabricate output.

## Failure Handling

If a component fails, record the failure, do not fabricate missing results, continue independent stages where possible, mark affected sections unavailable, and retry only when safe. A failed source is not evidence that no relevant information exists.

## Quality Gate

Before finalization verify:

- Important claims have sources.
- Current information is sufficiently current.
- Competitor content has not been copied.
- Recommendations are specific.
- SEO/GEO claims are not guarantees.
- Metrics are not fabricated.
- Missing information is clearly marked.
- The report contains actionable priorities.

## Success Criteria

The workflow succeeds when it consistently produces a concise, source-backed, actionable intelligence report and prioritized original content opportunities, with the feedback loop improving decisions over time.

## Related Documents

- REPORT_AGENT.md
- RESEARCH_AGENT.md
- COMPETITOR_AGENT.md
- CONTENT_STRATEGY_AGENT.md
- SEO_AGENT.md
- GEO_AGENT.md
- YOUTUBE_TOOL.md
- LINKEDIN_TOOL.md
- WEB_RESEARCH_TOOL.md
- RSS_FEED_TOOL.md
- SUPABASE_TOOL.md
- AI_MODEL_TOOL.md

## Status

Approved

Version 1.0
