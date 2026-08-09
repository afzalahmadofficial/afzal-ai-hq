# Web Research Tool Specification

**Version:** 1.0

**Project:** Afzal AI Headquarters

**Tool Name:** Web Research Tool

**Tool Type:** External Web Intelligence

**Status:** Approved

**Priority:** Critical

---

# Executive Summary

The Web Research Tool provides authorized agents with current web information required for research, trend discovery, competitor intelligence, fact verification, SEO/GEO research, and daily intelligence reporting.

The tool must prioritize reliable sources and preserve source references so downstream agents can distinguish verified information from assumptions.

---

# Purpose

Enable the AI HQ to research current information instead of relying only on model memory.

---

# Primary Users

The tool may be used by:

- Research Agent
- Competitor Agent
- Content Strategy Agent
- SEO Agent
- GEO Agent
- Analytics Agent, when external context is required
- Report Agent
- CEO Agent, when explicitly requested

---

# Core Capabilities

The tool should support, where the connected provider allows:

- Web search
- Source discovery
- Page retrieval
- Source comparison
- Fact verification
- Recent-news research
- Industry research
- Competitor research
- Trend research

---

# Research Workflow

Define research question

↓

Search authoritative sources

↓

Open relevant sources

↓

Compare information

↓

Verify important claims

↓

Capture source references

↓

Return concise findings

---

# Source Priority

Prefer sources in this order when appropriate:

1. Official documentation and primary sources
2. Original research and first-party announcements
3. Reputable news and industry publications
4. Expert analysis
5. Community discussions for qualitative signals

Lower-quality sources should not be treated as authoritative without verification.

---

# Freshness Rules

For time-sensitive research, prioritize recent sources.

Examples include:

- AI product launches
- Platform policy changes
- Current pricing
- Breaking news
- Current trends
- Search trends
- Competitor activity

The report should state the relevant date or time period when freshness matters.

---

# Source Integrity

The tool must preserve:

- Source title
- Publisher/domain
- Publication date when available
- URL/reference
- Relevant evidence

Agents must not fabricate citations or claim that a source was checked when it was not.

---

# Research Output Format

A standard result should contain:

### Finding
A concise statement of what was discovered.

### Evidence
The relevant supporting information.

### Source
The source reference.

### Confidence
High, Medium, or Low based on evidence quality.

### Implication
Why the finding matters to Afzal Ahmad.

---

# Safety and Access

The tool may access only publicly available or explicitly authorized information.

It must not bypass authentication, paywalls, access controls, or technical restrictions.

Secrets, credentials, private personal information, and restricted data must not be collected or exposed.

---

# Failure Handling

If research cannot be verified, the tool should report the limitation clearly instead of inventing an answer.

If sources disagree, preserve the disagreement and identify the strongest evidence.

---

# Success Metrics

The tool succeeds when:

- Current information can be retrieved reliably.
- Sources are traceable.
- Important claims are verifiable.
- Research is concise and actionable.
- Agents can reuse the findings.

---

# Related Documents

- RESEARCH_AGENT.md
- COMPETITOR_AGENT.md
- REPORT_AGENT.md
- SEO_AGENT.md
- GEO_AGENT.md
- MEMORY_AGENT.md

---

# Status

Approved

Version 1.0
