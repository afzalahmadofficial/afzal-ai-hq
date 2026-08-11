# Publishing Workflow

**Version:** 1.0  
**Project:** Afzal Ahmad AI HQ  
**Workflow:** Draft → QA → Approval → Publish → Verify → Track → Learn  
**Status:** Approved  
**Priority:** High

---

# 1. Objective

Provide a safe and repeatable process for publishing approved content to supported platforms such as YouTube, LinkedIn, and the website/blog.

The workflow separates content creation from external publishing and ensures that public content is accurate, approved, correctly formatted, and traceable.

---

# 2. Core Principle

```text
Approved Content
      ↓
Final QA
      ↓
Human Approval When Required
      ↓
Platform Preparation
      ↓
Publish
      ↓
Verify
      ↓
Record Publication
      ↓
Analytics
```

Never claim that content was published without a reliable confirmation.

---

# 3. Supported Publishing Destinations

Potential destinations include:

- YouTube
- LinkedIn
- Website / Blog
- Shorts / Reels where supported

The active tool documentation defines the capabilities and limitations of each integration.

---

# 4. Pre-Publishing QA

Before publishing, verify:

- Correct content version
- Accurate claims
- Spelling and grammar
- SEO requirements where applicable
- GEO requirements where applicable
- Title and description
- Links
- Media/assets
- Required metadata
- Platform-specific formatting
- No accidental private information

---

# 5. Human Approval

Human approval is required before important external publishing unless the exact automated publishing workflow has been explicitly authorized and tested.

Approval should confirm:

- Content is ready
- Destination is correct
- Timing is appropriate
- Public claims are acceptable
- Assets are correct

---

# 6. YouTube Publishing

For YouTube, prepare and verify as applicable:

- Video file
- Title
- Description
- Thumbnail
- Tags/metadata where relevant
- Playlist
- Visibility
- Scheduled publication time

The system should verify the resulting YouTube publication state after publishing.

---

# 7. LinkedIn Publishing

For LinkedIn, verify:

- Post text
- Media
- Links
- Mentions
- Formatting
- Target account/profile
- Publication timing

Follow platform rules and avoid spammy or misleading behavior.

---

# 8. Website / Blog Publishing

Verify:

- Article body
- Title
- URL slug
- Featured image
- Internal links
- External links
- SEO metadata
- GEO optimization
- Categories/tags
- Author information
- Publication status

Check the live page after publication.

---

# 9. Scheduling

Scheduled content should include:

- Content ID
- Destination
- Planned date/time
- Time zone
- Approval status
- Current publishing state

The scheduling workflow controls recurring jobs and should prevent duplicate publication.

---

# 10. Publication Record

After successful publication, store:

- Content ID
- Platform
- Publication ID/URL where available
- Published date/time
- Version
- Status
- Relevant metadata

Do not store authentication secrets in publication records.

---

# 11. Verification

After publication, verify:

- Content is publicly available at the intended visibility level
- Correct version was published
- Media rendered correctly
- Links work
- Metadata is correct
- No duplicate publication occurred

If verification fails, follow `ERROR_RECOVERY_WORKFLOW.md` or `INCIDENT_RESPONSE_WORKFLOW.md` as appropriate.

---

# 12. Failed Publication

If publishing fails:

1. Preserve the approved content.
2. Record the error.
3. Determine whether the platform accepted the request partially.
4. Check for an existing publication before retrying.
5. Retry only when safe.
6. Escalate when the publication state is uncertain.

Never blindly retry external publishing when duplication is possible.

---

# 13. Content Versioning

Every publication should be traceable to an approved content version.

If content changes after approval, the changed version should pass the required QA/approval process again.

---

# 14. Analytics Handoff

Once publication is verified, send the content record to the analytics workflow for performance tracking.

Track where appropriate:

- Views/impressions
- Engagement
- Clicks
- Watch time
- Retention
- Leads/conversions
- Search/GEO visibility signals

Metrics should be interpreted in context rather than optimized in isolation.

---

# 15. Repurposing Integration

Published content may enter `CONTENT_REPURPOSING_WORKFLOW.md` to generate approved derivatives for other channels.

Repurposed content should not automatically inherit approval if substantial changes are made.

---

# 16. Security

Publishing integrations must use appropriate authentication and least-privilege access.

Never place API keys, OAuth secrets, passwords, or access tokens inside content files, GitHub commits, prompts, or publication records.

Follow `SECURITY_WORKFLOW.md`.

---

# 17. Cost Control

Avoid unnecessary upload attempts, duplicate processing, and repeated API calls.

Follow `COST_CONTROL_WORKFLOW.md` for usage limits and retry controls.

---

# 18. Success Criteria

The publishing workflow succeeds when approved content is published to the correct destination, at the intended time and format, with no unauthorized or duplicate publication, reliable verification, traceable publication records, and analytics available for future optimization.

---

# Related Documents

- CONTENT_PRODUCTION_WORKFLOW.md
- CONTENT_REPURPOSING_WORKFLOW.md
- YOUTUBE_TOOL.md
- LINKEDIN_TOOL.md
- SEO_WORKFLOW.md
- GEO_WORKFLOW.md
- SCHEDULING_WORKFLOW.md
- QUALITY_ASSURANCE_WORKFLOW.md
- ERROR_RECOVERY_WORKFLOW.md
- INCIDENT_RESPONSE_WORKFLOW.md
- SECURITY_WORKFLOW.md
- COST_CONTROL_WORKFLOW.md
- ANALYTICS_FEEDBACK_WORKFLOW.md

---

# Status

Approved

Version 1.0
