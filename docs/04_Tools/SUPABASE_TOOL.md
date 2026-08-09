# Supabase Tool Specification

**Version:** 1.0

**Project:** Afzal AI Headquarters

**Tool Name:** Supabase Tool

**Tool Type:** Database, Storage & Backend Data Management

**Status:** Approved

**Priority:** Critical

---

# Executive Summary

The Supabase Tool provides the backend data layer for Afzal AI Headquarters. It is responsible for securely storing and retrieving structured system data such as research records, content ideas, reports, analytics, agent outputs, workflows, and approved knowledge.

Supabase is the database/backend layer. It is not the AI model itself and should not be treated as a replacement for the agent orchestration layer.

---

# Purpose

Provide a reliable central database that allows the AI HQ agents to share structured information and maintain continuity across workflows.

---

# Primary Users

- CEO Agent
- Research Agent
- Content Strategy Agent
- Analytics Agent
- Memory Agent
- Report Agent
- SEO Agent
- GEO Agent
- YouTube Agent
- LinkedIn Agent

---

# Core Capabilities

Where configured and authorized, the tool should support:

- Database reads
- Database writes
- Structured record management
- Report storage
- Research storage
- Content-record storage
- Analytics storage
- Agent-output storage
- Memory retrieval
- Workflow-state storage

---

# Recommended Data Domains

The initial database architecture should be able to support tables or equivalent structures for:

- `brand_settings`
- `content_ideas`
- `content_items`
- `research_items`
- `competitor_items`
- `intelligence_reports`
- `analytics_records`
- `agent_runs`
- `knowledge_items`
- `workflow_runs`
- `sources`

Exact schema implementation should be finalized before production deployment.

---

# Data Flow

Agent produces structured output

↓

Validate output

↓

Supabase Tool

↓

Apply access rules

↓

Store record

↓

Return record ID/status

↓

Memory / Analytics / Report workflows use the record

---

# Security

Supabase Row Level Security (RLS) should be used for protected data.

The implementation must follow least-privilege access principles.

Database passwords, API keys, service-role keys, and other secrets must never be committed to GitHub or placed inside public documentation.

Secrets must be stored using the secure secrets mechanism of the eventual runtime environment.

---

# Data API Rules

If the Supabase Data API is enabled, only required tables and operations should be exposed.

Automatic exposure of every newly created table should be avoided for sensitive or internal data unless explicitly required and protected by appropriate policies.

---

# RLS Rules

Protected tables should have RLS enabled before production use.

Each policy should define:

- Who can read the data
- Who can insert data
- Who can update data
- Who can delete data

No production table should rely on accidental or overly broad access.

---

# Memory Integration

The Memory Agent may use Supabase as the structured persistence layer for approved long-term knowledge.

Memory records should retain useful metadata such as:

- Source
- Created date
- Updated date
- Category
- Status
- Confidence
- Related records

---

# Intelligence Report Storage

Daily Intelligence Reports should be stored with:

- Report date
- Report time
- Time zone
- Report content or structured sections
- Source references
- Key priorities
- Content opportunities
- Processing status

This allows historical reports to be searched and compared later.

---

# Analytics Storage

Performance data may be stored with:

- Platform
- Content ID
- Metric name
- Metric value
- Measurement period
- Source
- Collection timestamp

The schema should support historical comparison without overwriting previous measurements unnecessarily.

---

# Workflow State

The database may track workflow status such as:

- queued
- running
- completed
- failed
- awaiting_review
- approved
- rejected

A workflow record should contain enough information to identify what happened without storing unnecessary secrets.

---

# Data Integrity

The tool must:

- Validate required fields.
- Use stable identifiers where appropriate.
- Avoid accidental duplicate records.
- Preserve important historical data.
- Record timestamps consistently.
- Handle failed writes safely.

---

# Backup & Recovery

Production deployment should include an appropriate backup and recovery strategy based on the Supabase plan and architecture being used.

Critical records should not depend on a single temporary runtime process.

---

# Failure Handling

If a database operation fails:

- Return a clear error state.
- Do not pretend the record was saved.
- Avoid uncontrolled retry loops.
- Retry only when the operation is safe and appropriate.
- Preserve enough diagnostic information for troubleshooting.

---

# Success Metrics

The tool succeeds when:

- Agent data can be stored reliably.
- Reports remain available historically.
- Memory can be retrieved consistently.
- Analytics can be compared over time.
- Access is properly controlled.
- Database operations are auditable.

---

# Failure Conditions

The tool fails if:

- Secrets are exposed.
- Protected data is publicly accessible.
- RLS is incorrectly configured.
- The system claims a write succeeded when it failed.
- Important historical records are silently overwritten.

---

# Implementation Principle

Supabase should remain the **data layer**.

The future architecture should keep these responsibilities separate:

**AI Models** → reasoning/generation

**Agents** → specialized responsibilities

**Orchestrator** → workflow execution

**Supabase** → persistent data

**Tools/APIs** → external services

**GitHub** → source-controlled specifications and implementation code

---

# Related Documents

- MEMORY_AGENT.md
- ANALYTICS_AGENT.md
- REPORT_AGENT.md
- WEB_RESEARCH_TOOL.md
- AI_MODEL_TOOL.md
- PRODUCT_REQUIREMENTS_DOCUMENT.md

---

# Status

Approved

Version 1.0
