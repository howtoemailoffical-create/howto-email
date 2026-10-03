---
title: Secure an SMTP relay
description: Prevent open relay while supporting applications and trusted senders.
section: Do
tags: [SMTP, Security]
---

Define exactly who may relay and how they prove authorization. Prefer authenticated submission or tightly scoped network trust. Require TLS where appropriate, restrict sender identities when feasible, rate-limit abuse and log accepted/rejected relay attempts.

Test from an untrusted network to confirm the service cannot relay arbitrary external-to-external mail.
