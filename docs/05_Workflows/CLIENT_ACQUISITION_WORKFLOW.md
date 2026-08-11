# Client Acquisition Workflow

**Version:** 1.0  
**Project:** Afzal Ahmad AI HQ  
**Workflow:** Intelligence → Prospecting → Personalization → Outreach → Follow-up → Qualification → Client Handoff  
**Status:** Approved  
**Priority:** High

---

# 1. Objective

Turn relevant market intelligence and qualified opportunities into ethical, personalized client-acquisition actions without spam, deception, or unauthorized automation.

The system should help identify good-fit prospects, understand their needs, create useful personalized outreach, track responses, and hand qualified opportunities to the appropriate human process.

---

# 2. Core Principle

```text
Market Intelligence
      ↓
Opportunity Detection
      ↓
Prospect Research
      ↓
Fit Qualification
      ↓
Personalized Value Proposition
      ↓
Human Review
      ↓
Outreach
      ↓
Follow-up
      ↓
Qualification
      ↓
Human Client Handoff
      ↓
Outcome + Learning
```

Automation should increase relevance and consistency, not increase spam volume.

---

# 3. Target Client Profile

The active project specification should define the current ideal client profile.

Potential criteria may include:

- Industry
- Company size
- Geographic market
- Business problem
- Content maturity
- AI/automation needs
- SEO/GEO needs
- Budget suitability
- Decision-maker relevance

Do not assume every prospect is a good fit.

---

# 4. Lead Sources

Potential sources include:

- LinkedIn research
- Company websites
- Public job postings
- Public company announcements
- Industry news
- Existing network
- Content engagement
- Referrals
- Inbound inquiries

Only use information that is publicly available or appropriately authorized.

---

# 5. Prospect Research

Before outreach, collect only information relevant to the business conversation.

Research may include:

- Company positioning
- Recent public developments
- Relevant content
- Visible business problem
- Potential service fit
- Decision-maker role

Avoid collecting unnecessary personal information.

---

# 6. Lead Qualification

A prospect may be scored on:

| Factor | Question |
|---|---|
| Fit | Does the prospect match the target profile? |
| Need | Is there a relevant problem? |
| Timing | Is there a visible reason to act now? |
| Authority | Is this person relevant to the decision? |
| Value | Can the service provide meaningful value? |
| Evidence | Is the opportunity based on real information? |

Scores are prioritization aids, not guarantees.

---

# 7. Personalization

Each outreach message should have a legitimate reason for being sent.

Useful personalization can reference:

- A relevant company development
- A specific public content gap
- A professional topic the prospect discusses
- A concrete business problem
- A useful observation

Do not fabricate familiarity or pretend to have used a service that was never used.

---

# 8. Value Proposition

The message should communicate:

- What was observed
- Why it may matter
- What useful improvement is possible
- What the next low-pressure step could be

Avoid exaggerated promises or guaranteed outcomes.

---

# 9. Human Review

Human review should be required before automated external outreach unless a platform and workflow explicitly authorize the specific automation.

Review should check:

- Correct prospect
- Correct company
- Accurate personalization
- Professional tone
- No sensitive information
- No misleading claims
- Appropriate frequency
- Platform rules

---

# 10. Outreach Rules

Outreach must respect applicable platform policies and anti-spam requirements.

The system should never:

- Send mass unsolicited messages merely to increase volume
- Evade platform limits
- Create fake identities
- Misrepresent the sender
- Scrape or use restricted data improperly
- Continue contacting people who clearly opt out

Quality and relevance take priority over volume.

---

# 11. Follow-up

Follow-ups should be limited, useful, and context-aware.

A follow-up should add value or clarify the previous message rather than repeatedly saying “just checking in.”

Stop follow-up when:

- The prospect declines
- The prospect asks not to be contacted
- The opportunity is clearly irrelevant
- The contact becomes inappropriate or uncertain

---

# 12. Lead States

Use clear states such as:

- `RESEARCHED`
- `QUALIFIED`
- `READY_FOR_REVIEW`
- `OUTREACH_SENT`
- `RESPONDED`
- `FOLLOW_UP`
- `QUALIFIED_OPPORTUNITY`
- `MEETING_REQUESTED`
- `CONVERTED`
- `NOT_A_FIT`
- `DO_NOT_CONTACT`

---

# 13. Response Handling

When a prospect responds, classify the response:

- Positive interest
- Question
- Objection
- Not now
- Referral
- Not a fit
- Do not contact

High-value conversations should be handed to the human owner promptly.

---

# 14. Qualification Handoff

When a prospect becomes a qualified opportunity:

```text
Qualified Lead
    ↓
Human Review
    ↓
Discovery / Conversation
    ↓
Needs Assessment
    ↓
Proposal if appropriate
```

AI should support preparation but should not invent commitments, pricing, contracts, or guarantees unless explicitly authorized.

---

# 15. Content-Assisted Acquisition

AI HQ may use useful content to support acquisition through:

- LinkedIn posts
- YouTube videos
- Case-study-style educational content
- SEO articles
- GEO-optimized educational resources
- Research reports

Content should build trust rather than disguise advertising as independent research.

---

# 16. Intelligence Integration

Daily Intelligence can surface client-acquisition signals such as:

- Companies entering a relevant market
- Publicly visible content problems
- New AI adoption initiatives
- Hiring signals
- New product launches
- Industry changes creating content/SEO opportunities

Signals must be validated before becoming outreach reasons.

---

# 17. Analytics

Track where appropriate:

- Qualified leads
- Outreach volume
- Response rate
- Positive response rate
- Meetings
- Opportunities
- Conversions
- Source of lead
- Content-assisted conversions

Do not optimize solely for reply rate if low-quality outreach increases replies but damages trust.

---

# 18. Learning Loop

```text
Outreach
   ↓
Response
   ↓
Qualification
   ↓
Outcome
   ↓
Analytics
   ↓
Learning
   ↓
Better Targeting + Better Messaging
```

Store useful lessons in the appropriate memory system.

---

# 19. Privacy & Security

Protect prospect information appropriately.

Do not store unnecessary sensitive personal data.

Never store passwords, private authentication credentials, or unrelated personal information in lead records.

Follow `SECURITY_WORKFLOW.md` for access and credential controls.

---

# 20. Failure Handling

If prospect data cannot be verified:

1. Do not invent missing information.
2. Mark the field as unknown.
3. Research further if justified.
4. Skip personalization that cannot be supported.

If an outreach integration fails, do not blindly retry in a way that could create duplicate messages.

---

# 21. Success Criteria

The workflow succeeds when AI HQ consistently identifies relevant prospects, creates accurate and useful personalization, respects platform and anti-spam rules, routes important conversations to a human, tracks acquisition outcomes, and improves future targeting and messaging from real results.

---

# Related Documents

- DAILY_INTELLIGENCE_WORKFLOW.md
- DECISION_MAKING_WORKFLOW.md
- HUMAN_APPROVAL_WORKFLOW.md
- LINKEDIN_TOOL.md
- CONTENT_PRODUCTION_WORKFLOW.md
- ANALYTICS_FEEDBACK_WORKFLOW.md
- SECURITY_WORKFLOW.md
- KNOWLEDGE_MEMORY_WORKFLOW.md

---

# Status

Approved

Version 1.0
