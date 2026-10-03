---
title: Common enhanced status code families
description: A field guide to 4.x.x and 5.x.x delivery classifications.
section: Reference
tags: [SMTP, Bounces]
---

Enhanced status codes are structured as **class.subject.detail**.

Common subjects include:

| Subject | General area |
| --- | --- |
| X.1.x | Addressing |
| X.2.x | Mailbox |
| X.3.x | Mail system |
| X.4.x | Network/routing |
| X.5.x | Mail delivery protocol |
| X.6.x | Message content/media |
| X.7.x | Security or policy |

The exact detail matters. Do not treat every `5.7.x` response as the same reputation block.

## Reference material

- [RFC 3463 — Enhanced Mail System Status Codes](https://www.rfc-editor.org/rfc/rfc3463)
- [IANA — SMTP Enhanced Status Codes](https://www.iana.org/assignments/smtp-enhanced-status-codes/smtp-enhanced-status-codes.xhtml)
