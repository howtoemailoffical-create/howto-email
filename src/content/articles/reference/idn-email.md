---
title: Internationalized domains and email
description: Unicode domain names, Punycode and internationalized email considerations.
section: Reference
tags: [Internationalization, DNS]
---

Internationalized domain names are represented in DNS using ASCII-compatible encoding, commonly visible as `xn--` labels. User interfaces may display Unicode forms.

Internationalized mailbox local parts require additional protocol support such as SMTPUTF8. Security tooling should account for visually similar Unicode characters when displaying identities.
