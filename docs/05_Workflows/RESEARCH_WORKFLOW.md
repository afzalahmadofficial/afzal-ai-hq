# Research Workflow

**Version:** 1.0

**Project:** Afzal Ahmad AI HQ

**Workflow:** Topic Discovery, Source Research, Verification, Synthesis & Handoff

**Status:** Approved

**Priority:** Critical

---

# 1. Objective

Create a repeatable research pipeline that turns a topic or intelligence signal into a reliable, source-backed research brief for the SEO, GEO, Content, YouTube, LinkedIn, and Analytics workflows.

The research system prioritizes **accuracy, source quality, freshness, traceability, and useful synthesis** over simply collecting large numbers of links.

---

# 2. Core Principle

```text
Question
  ↓
Discover
  ↓
Collect Sources
  ↓
Evaluate Sources
  ↓
Extract Evidence
  ↓
Verify Claims
  ↓
Synthesize
  ↓
Research Brief
  ↓
Agent Handoff
```

A research result is not considered complete merely because sources were found.

---

# 3. Research Inputs

Research may begin from:

- Daily Intelligence signals
- User-requested topics
- Audience questions
- Search trends
- YouTube opportunities
- Competitor activity
- Existing content gaps
- Content performance data
- New developments requiring verification

Every research task should have a clear question or objective.

---

# 4. Research Question

Before searching, define:

- Topic
- Primary question
- Target audience
- Geographic context when relevant
- Freshness requirement
- Intended content format
- Required evidence level

This prevents unfocused research and unnecessary tool calls.

---

# 5. Source Discovery

Discover multiple relevant sources when the topic requires verification.

Potential source types include:

- Government agencies
- Academic institutions
- Peer-reviewed research
- Professional organizations
- Official company/platform documentation
- Reputable news organizations
- Primary datasets
- Expert sources

Search results are leads, not automatically verified facts.

---

# 6. Source Quality

Evaluate sources using factors such as:

- Authority
- Relevance
- Primary-source status
- Publication date
- Evidence quality
- Methodology
- Transparency
- Potential conflicts of interest

Prefer primary and authoritative sources for important claims.

---

# 7. Source Freshness

Freshness requirements depend on the subject.

High-freshness topics include:

- Current platform features
- AI product updates
- Current policies
- Trends
- Current statistics
- Competitor activity
- Breaking developments

For evergreen educational topics, established high-quality sources may remain useful longer.

Always distinguish historical information from current information.

---

# 8. Evidence Extraction

For each important source, extract only information relevant to the research question.

A research record may contain:

- Source title
- Publisher
- URL/reference
- Publication date
- Key finding
- Supporting evidence
- Relevant quote or data point when permitted
- Reliability assessment
- Freshness status

Do not copy large portions of source material.

---

# 9. Claim Verification

Important claims should be verified against appropriate evidence.

```text
Claim
 ↓
Source Evidence?
 ├─ Yes → Verify / Record
 └─ No  → Search Further
```

If reliable evidence cannot be found, mark the claim as uncertain rather than presenting it as fact.

---

# 10. Cross-Checking

For significant or potentially disputed claims, compare more than one credible source when practical.

Pay special attention to:

- Conflicting statistics
- Different publication dates
- Different definitions
- Correlation vs. causation
- Preliminary vs. established findings

When sources disagree, preserve the disagreement and explain the evidence basis rather than silently selecting the preferred claim.

---

# 11. Research Bias Control

Research agents should actively avoid:

- Confirmation bias
- Over-reliance on one source
- Treating headlines as evidence
- Assuming correlation proves causation
- Presenting speculation as fact
- Using outdated evidence for current claims

The agent should search for evidence that could challenge the initial hypothesis when appropriate.

---

# 12. Research Synthesis

After collecting evidence, organize it into:

1. What is known.
2. What the strongest evidence shows.
3. What remains uncertain.
4. Why it matters to the target audience.
5. Practical implications.
6. Potential content angles.

Synthesis should add understanding rather than merely repeat source summaries.

---

# 13. Research Brief

The final research brief should contain:

- Research ID
- Topic
- Research question
- Executive summary
- Key findings
- Important evidence
- Source list
- Contradictions/limitations
- Freshness notes
- Content opportunities
- SEO opportunities
- GEO opportunities
- Recommended next actions

---

# 14. SEO Handoff

The SEO Agent may receive the validated research brief to identify:

- Search intent
- Keyword/topic opportunities
- Content gaps
- SERP opportunities
- Recommended structure

SEO recommendations must not introduce unsupported factual claims.

---

# 15. GEO Handoff

The GEO Agent may use the research brief to improve content for generative-answer systems through:

- Clear definitions
- Direct answers
- Entity/context clarity
- Evidence and attribution
- Structured explanations
- Explicit relationships between concepts

GEO optimization must preserve factual accuracy.

---

# 16. YouTube Handoff

For YouTube research, the brief may provide:

- Topic opportunity
- Audience problem
- Evidence-backed talking points
- Competitor/content gaps
- Video angles
- Potential hooks
- Source references

A compelling hook must not exaggerate the evidence.

---

# 17. Competitor Research

Competitor research should analyze publicly available information such as:

- Topics
- Content formats
- Publishing patterns
- Positioning
- Audience questions
- Visible engagement signals
- Content gaps

Do not copy competitors' content. Use competitor analysis to identify opportunities for original, more useful content.

---

# 18. Research-to-Content Handoff

```text
Validated Research
       ↓
Master Brief
       ↓
SEO + GEO Analysis
       ↓
Content Strategy
       ↓
Drafting
```

Downstream agents should receive the research ID and source references so claims remain traceable.

---

# 19. Research Memory

Reusable validated findings may be stored in the knowledge/memory system with:

- Source
- Date
- Confidence/status
- Freshness policy
- Related topics
- Related content IDs

Time-sensitive research must not be treated as permanently current.

---

# 20. Failure Handling

If research tools fail:

1. Preserve completed valid research.
2. Record the failed source/tool.
3. Retry only when appropriate.
4. Use approved alternative sources when available.
5. Mark missing evidence clearly.
6. Do not fabricate the missing information.

---

# 21. Quality Gate

Research is ready for downstream content production only when:

- The research question is answered sufficiently.
- Important claims have evidence.
- Sources are identifiable.
- Freshness requirements are satisfied.
- Major contradictions are documented.
- Uncertainty is clearly marked.
- The brief is understandable to downstream agents.

---

# 22. Success Criteria

The research workflow succeeds when AI HQ consistently produces focused, source-backed, current where necessary, traceable, and actionable research that downstream agents can safely transform into original SEO, GEO, YouTube, LinkedIn, and other content opportunities.

---

# Related Documents

- DAILY_INTELLIGENCE_WORKFLOW.md
- SEO_AGENT.md
- GEO_AGENT.md
- YOUTUBE_TOOL.md
- CONTENT_PRODUCTION_WORKFLOW.md
- KNOWLEDGE_MEMORY_WORKFLOW.md
- QUALITY_ASSURANCE_WORKFLOW.md
- CONTENT_REPURPOSING_WORKFLOW.md

---

# Status

Approved

Version 1.0
