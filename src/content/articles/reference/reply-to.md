---
title: Reply-To header
description: How Reply-To changes the destination for replies without changing From.
section: Reference
tags: [Headers, Identity]
---

`Reply-To:` tells a mail client where a reply should be addressed when that destination differs from the author address in `From:`.

That can be completely legitimate—for example, a notification may be sent from one address but direct responses to a support queue.

It is also useful during phishing analysis because a message can display a familiar From identity while steering replies somewhere else. SPF/DKIM/DMARC authentication does not make a suspicious Reply-To harmless.

## Reference material

- [RFC 5322 — Originator fields](https://www.rfc-editor.org/rfc/rfc5322)
