---
title: BIMI
description: Brand Indicators for Message Identification adds a domain-controlled brand indicator on supporting mailbox providers.
section: Reference
tags: [BIMI, DMARC, Branding]
---

BIMI is a branding layer built on top of authenticated mail. Supporting mailbox providers may display a brand-controlled logo when the sender meets their requirements.

BIMI should come **after** the authentication work. A domain needs strong DMARC deployment, and mailbox providers can impose additional requirements such as reputation and an eligible mark certificate.

It is not an anti-phishing replacement. SPF, DKIM, DMARC, account security and filtering still do the security work.

Provider support and certificate requirements change, so verify current mailbox-provider requirements before buying a certificate or planning a rollout.

## Reference material

- [BIMI Group — BIMI specification and implementation resources](https://bimigroup.org/)
- [Google — Set up BIMI](https://support.google.com/a/answer/10911320)
