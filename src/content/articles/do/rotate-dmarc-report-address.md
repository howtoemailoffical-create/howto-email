---
title: Change a DMARC report destination
description: Move aggregate reporting without creating a blind spot.
section: Do
tags: [DMARC, Reporting, Operations]
---

Prepare the new report destination first.

If it is in another domain, publish any required external-report authorization.

During migration, you can configure appropriate report destinations according to the current DMARC syntax and your processor's capabilities.

Verify reports arrive and are parsed at the new destination before retiring the old mailbox/service.

Remember that reports arrive on receiver schedules; absence for a few hours does not prove the change failed.

## Reference material

- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
