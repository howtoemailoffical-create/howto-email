---
title: Troubleshoot message-too-large failures
description: Account for MIME expansion and every hop's size limit.
section: Do
tags: [SMTP, Attachments, Troubleshooting]
---

Capture the rejection and determine which system enforced the limit.

Check:

- original attachment size;
- final MIME message size;
- sender submission limit;
- gateways;
- recipient service limit;
- transport rules/policies.

Binary attachments encoded with Base64 become larger in transit, so comparing only the source file size with a nominal message limit can be misleading.

For very large content, use an approved file-sharing mechanism rather than repeatedly increasing email limits.

## Reference material

- [RFC 1870 — SMTP SIZE](https://www.rfc-editor.org/rfc/rfc1870)
- [RFC 2045 — MIME](https://www.rfc-editor.org/rfc/rfc2045)
