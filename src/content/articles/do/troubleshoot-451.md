---
title: Investigate SMTP 451 responses
description: Work a temporary local-processing failure without suppressing a valid recipient.
section: Do
tags: [SMTP, Troubleshooting, Bounces]
---

`451` is a temporary failure class. The remote system is telling the sender to try again later.

Do not suppress the recipient as invalid based only on a 451.

Preserve the enhanced status code and diagnostic text. Common causes can involve temporary policy, directory, filtering, storage or processing problems.

Track how long the message has been retrying and whether the response is isolated to a domain or recipient group.

## Reference material

- [RFC 5321 — SMTP reply codes](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 3463 — Enhanced Status Codes](https://www.rfc-editor.org/rfc/rfc3463)
