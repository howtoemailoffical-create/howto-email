---
title: Enhanced SMTP status codes
description: The x.y.z code carries more diagnostic structure than the basic three-digit reply alone.
section: Reference
tags: [SMTP, Bounces, Troubleshooting]
---

Enhanced status codes look like:

```text
5.1.1
4.2.2
5.7.1
```

The first digit indicates success, persistent temporary failure or permanent failure. The following components identify a subject area and more specific condition.

Providers can add human-readable diagnostics around these codes.

For troubleshooting, preserve the complete SMTP response rather than keeping only `550` or `554`.

## Reference material

- [RFC 3463 — Enhanced Mail System Status Codes](https://www.rfc-editor.org/rfc/rfc3463)
- [IANA — SMTP Enhanced Status Codes registry](https://www.iana.org/assignments/smtp-enhanced-status-codes/smtp-enhanced-status-codes.xhtml)
