---
title: Troubleshoot 5.7.1 policy rejections
description: Use the receiver's diagnostic to distinguish relay, authentication, reputation and content policy.
section: Do
tags: [Bounces, Troubleshooting, Status Codes]
---

Do not troubleshoot from `5.7.1` alone.

Save the full rejection, including provider URL or diagnostic identifier.

Check whether the message failed because of:

- relay authorization;
- SPF/DKIM/DMARC;
- sending reputation;
- recipient policy;
- content/malware;
- connector/TLS requirements.

Then reproduce with a controlled message if appropriate.

Avoid changing SPF, DKIM and DMARC simultaneously unless evidence shows all three are wrong.

## Reference material

- [RFC 3463 — Enhanced Status Codes](https://www.rfc-editor.org/rfc/rfc3463)
