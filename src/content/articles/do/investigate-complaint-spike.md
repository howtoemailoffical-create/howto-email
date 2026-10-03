---
title: Investigate a spam-complaint spike
description: Find the campaign or acquisition problem before reputation damage spreads.
section: Do
tags: [Deliverability, Complaints, Troubleshooting]
---

Start with **when** the complaint rate changed and **which traffic** changed with it.

Break the stream down by sending domain, campaign, list source, template, audience, and provider where data is available.

Then ask:

- Was a new list imported?
- Did send frequency jump?
- Did branding or From identity change?
- Is unsubscribe working?
- Was an old or inactive segment contacted?
- Did an account or sending platform get compromised?

Pause the problematic source when appropriate instead of moving the same behavior to another domain.

## Reference material

- [Google — Email sender guidelines](https://support.google.com/mail/answer/81126)
- [RFC 5965 — Email Feedback Reports](https://www.rfc-editor.org/rfc/rfc5965)
