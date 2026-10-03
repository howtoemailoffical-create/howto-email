---
title: Rotate an SMTP application credential
description: Change application mail credentials without creating an avoidable outage.
section: Do
tags: [SMTP, Security, Applications]
---

First determine whether the service supports overlapping credentials or tokens.

If it does, create the new credential, deploy it to the application, verify successful authenticated submissions, then revoke the old credential.

If it does not, plan a controlled change and rollback.

## After rotation

Check for authentication failures from forgotten instances, scheduled jobs, disaster-recovery systems and old devices. A credential that is still being used after you thought it was retired is an inventory problem worth fixing.

Prefer scoped application identities or modern token-based methods where the platform supports them.

## Reference material

- [RFC 4954 — SMTP Authentication](https://www.rfc-editor.org/rfc/rfc4954)
- [RFC 7628 — SASL OAuth](https://www.rfc-editor.org/rfc/rfc7628)
