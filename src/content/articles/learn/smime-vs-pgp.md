---
title: S/MIME vs OpenPGP for email
description: Two message-level security approaches with different trust and deployment models.
section: Learn
tags: [S-MIME, OpenPGP, Encryption]
---

S/MIME and OpenPGP can both sign and encrypt message content, but they commonly use different trust and key-management models.

S/MIME is certificate-oriented and often fits organizations that already operate PKI or managed certificate services.

OpenPGP uses OpenPGP keys and has historically relied on different key-distribution and verification practices.

## Choose for the environment

The algorithm list is not the whole decision. Consider client support, external recipients, key recovery, revocation, identity proofing, automation and administrative overhead.

## Reference material

- [RFC 8551 — S/MIME 4.0](https://www.rfc-editor.org/rfc/rfc8551)
- [RFC 9580 — OpenPGP](https://www.rfc-editor.org/rfc/rfc9580)
- [RFC 3156 — OpenPGP/MIME](https://www.rfc-editor.org/rfc/rfc3156)
