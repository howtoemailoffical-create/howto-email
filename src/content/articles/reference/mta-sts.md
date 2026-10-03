---
title: MTA-STS
description: Policy-based enforcement of authenticated TLS for inbound SMTP.
section: Reference
tags: [TLS, MTA-STS]
---

MTA-STS lets a receiving domain tell supporting senders to require authenticated TLS when delivering to designated MX hosts. Deployment combines a DNS discovery record with an HTTPS-hosted policy.

Enforcement should follow testing. Certificate, HTTPS or MX-policy mistakes can interfere with delivery from senders that honor the policy.
