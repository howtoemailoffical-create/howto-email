---
title: Open relay
description: What makes an SMTP relay open and why it is dangerous.
section: Reference
tags: [SMTP, Security]
---

An open relay allows unauthorized clients to submit mail for arbitrary external recipients. Attackers abuse open relays for spam and phishing, quickly damaging reputation and creating operational load.

A relay should authorize sending through authentication, tightly controlled network sources, connector identity or another explicit trust mechanism.
