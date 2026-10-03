---
title: SMTP status codes
description: Read SMTP replies and enhanced status codes without guessing from a bounce subject line.
section: Reference
tags: [SMTP, Troubleshooting, Bounces]
---

SMTP's first digit gives you the quickest classification:

- **2xx** — success.
- **4xx** — temporary failure; a sending MTA normally retries.
- **5xx** — permanent failure for the attempted operation.

That is only the first layer.

## Enhanced status codes

Replies can include an enhanced code such as:

```text
550 5.1.1 User unknown
451 4.7.1 Try again later
550 5.7.1 Message rejected by policy
```

The enhanced code is structured as class.subject.detail. It gives systems a more consistent classification even when the human-readable wording differs by provider.

## Keep the entire response

Do not reduce an incident to “we got a 550.” Preserve the remote hostname, timestamp, recipient, three-digit code, enhanced code and diagnostic text. A `5.1.1` recipient problem and a `5.7.1` policy problem can both begin with 550 but require completely different work.

## Reference material

- [RFC 5321 — SMTP reply codes](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 3463 — Enhanced Mail System Status Codes](https://www.rfc-editor.org/rfc/rfc3463)
- [IANA — SMTP Enhanced Status Codes registry](https://www.iana.org/assignments/smtp-enhanced-status-codes/smtp-enhanced-status-codes.xhtml)
