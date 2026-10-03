---
title: STARTTLS
description: Opportunistic TLS negotiation for SMTP, IMAP and related protocols.
section: Reference
tags: [TLS, SMTP]
---

STARTTLS upgrades an existing plaintext protocol connection to TLS after the server advertises support. In SMTP, a client connects, issues EHLO, sees STARTTLS, negotiates TLS, then normally issues EHLO again.

Opportunistic SMTP TLS improves confidentiality but does not alone guarantee that a sender will refuse delivery when TLS is unavailable or unauthenticated. MTA-STS or DANE can add stronger policy.
