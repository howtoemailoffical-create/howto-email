---
title: Forwarding and email authentication
description: Why forwarding breaks SPF, when DKIM survives, and where ARC or SRS fit.
section: Learn
tags: [Forwarding, Authentication]
---

Forwarding changes the SMTP path. The forwarding host sends from a new IP, so SPF for the original envelope domain may fail. DKIM can survive if the message is not modified in ways that invalidate the signature.

SRS can help forwarders handle SPF identity. ARC can preserve authentication context through intermediaries. DMARC only needs one aligned mechanism to pass, which is why surviving aligned DKIM is valuable.
