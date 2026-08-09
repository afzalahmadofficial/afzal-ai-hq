# YouTube Tool Specification

**Version:** 1.0

**Project:** Afzal AI Headquarters

**Tool Name:** YouTube Tool

**Tool Type:** Video Research, Discovery, Competitive Intelligence & Publishing Support

**Status:** Approved

**Priority:** Critical

---

# Executive Summary

The YouTube Tool provides the Afzal AI Headquarters with structured YouTube intelligence for discovering videos, researching topics, analyzing competitors, studying content patterns, and preparing future publishing workflows.

The tool supports the YouTube Agent and related agents. It does not automatically publish content unless an authorized publishing integration is explicitly connected.

---

# Purpose

The tool should help the system answer:

1. What is happening on YouTube right now?
2. What content is performing well in Afzal Ahmad's target topics?
3. What are competitors doing differently?
4. What should Afzal Ahmad create next?

---

# Primary Users

- YouTube Agent
- Research Agent
- Competitor Agent
- Content Strategy Agent
- Analytics Agent
- Report Agent
- CEO Agent

---

# Core Capabilities

Where supported by an authorized YouTube/API provider:

- Video search
- Channel discovery
- Video metadata retrieval
- Playlist discovery
- Channel video research
- Topic discovery
- Competitor video analysis
- Publication-date analysis
- Public engagement-metric collection
- Transcript/caption retrieval when legally and technically available
- Publishing support through an authorized API integration

---

# Video Discovery Workflow

Define topic

↓

Search YouTube

↓

Filter by relevance and freshness

↓

Collect useful videos

↓

Analyze titles, topics, formats and available metrics

↓

Identify patterns

↓

Send findings to Research / Content Strategy Agent

---

# Competitor Analysis

The tool may analyze approved competitor channels using publicly available information such as:

- Recent uploads
- Upload frequency
- Video topics
- Titles
- Formats
- Video length
- Public view counts
- Public engagement indicators where available
- Recurring themes
- Content gaps

The objective is to learn from patterns, not copy competitors.

---

# Competitor Intelligence Output

For each meaningful observation, return:

- Channel
- Video title
- Topic
- Format
- Publication date
- Available performance indicators
- Notable hook/title pattern
- Strategic observation
- Possible original opportunity for Afzal Ahmad

---

# Content Pattern Analysis

Identify evidence-based patterns such as:

- Topics gaining momentum
- Frequently repeated topics
- Strong title structures
- Common video formats
- Tutorial demand
- News demand
- Evergreen opportunities
- Content gaps

Patterns are observations, not guarantees of future performance.

---

# Title Research

The tool may compare public video titles to identify:

- Common keywords
- Curiosity patterns
- Problem-focused titles
- Tutorial structures
- News framing
- Audience pain points

The YouTube Agent must create original titles rather than imitate competitor wording.

---

# Transcript / Caption Research

If captions or transcripts are legally and technically available through an authorized source, the tool may use them for research and summarization.

Do not reproduce copyrighted transcripts or substantial portions of them. Use transcripts to identify concepts, structure, topics, arguments, and research leads.

---

# Publishing Workflow

Approved content

↓

Final script / video asset

↓

Title and thumbnail approved

↓

Description and metadata prepared

↓

Human review

↓

Authorized YouTube publishing API

↓

Schedule or publish

↓

Capture resulting video ID and metadata

↓

Analytics Agent monitors performance

---

# Publishing Safety

Publishing requires:

- An authorized YouTube account connection.
- Explicit publishing permissions.
- Human approval unless a clearly defined future automation policy allows automatic publishing.

The tool must never claim that a video was published unless the connected API confirms successful publication.

---

# SEO Integration

The tool may provide YouTube-specific research to the SEO Agent, including:

- Search terms
- Related topics
- Title patterns
- Content gaps
- Audience questions

SEO recommendations must remain natural and must not create keyword stuffing or misleading metadata.

---

# Analytics Integration

After publishing, available performance data should be passed to the Analytics Agent.

Relevant signals may include views, watch time, average view duration, audience retention, impressions, click-through rate, subscribers gained, and traffic sources.

The Analytics Agent should interpret these metrics rather than the YouTube Tool making unsupported causal claims.

---

# Daily Intelligence Integration

The Report Agent may use the YouTube Tool for the daily **2:00 PM PKT Intelligence Report**.

The YouTube section should identify:

- Important new videos
- Emerging topics
- Competitor activity
- Strong content opportunities
- Recommended video ideas

---

# Source Integrity

The tool must preserve available source information and timestamps.

It must distinguish:

- Publicly observed metrics
- Retrieved metadata
- Calculated metrics
- Interpretations
- Recommendations

Never fabricate views, subscribers, rankings, or performance data.

---

# Rate Limits & API Usage

The implementation must respect the connected provider's API limits, quotas, terms, and authentication requirements.

Caching and incremental collection should be preferred where appropriate to avoid unnecessary requests.

---

# Privacy & Security

Only authorized accounts and publicly available information may be accessed.

Credentials, API keys, tokens, and private account information must never be written into normal agent outputs or committed to GitHub.

Secrets must be stored using the project's secure secrets mechanism when implementation begins.

---

# Failure Handling

If the YouTube API or connected service is unavailable:

- Report the failure clearly.
- Do not fabricate results.
- Continue with other available research sources when appropriate.
- Mark unavailable data as unavailable.

---

# Success Metrics

The tool succeeds when:

- Relevant videos are discovered efficiently.
- Competitor activity can be tracked reliably.
- Content opportunities are evidence-based.
- Publishing actions are accurately confirmed.
- Analytics data can flow back into the system.

---

# Failure Conditions

The tool fails if:

- It fabricates metrics.
- It copies competitor content.
- It publishes without authorization.
- It exposes credentials.
- It claims a video was published without API confirmation.
- It ignores platform/API limits.

---

# Related Documents

- YOUTUBE_AGENT.md
- RESEARCH_AGENT.md
- COMPETITOR_AGENT.md
- CONTENT_STRATEGY_AGENT.md
- ANALYTICS_AGENT.md
- REPORT_AGENT.md
- SEO_AGENT.md

---

# Status

Approved

Version 1.0
