---
title: Respond to outbound spam from your environment
description: Contain the sending identity first, then repair reputation and configuration.
section: Do
tags: [Incident Response, Abuse, Deliverability]
---

If your infrastructure is actively sending abusive mail, stop or restrict the affected account, credential, application or relay path according to your incident process.

Then determine:

- which identity was compromised;
- when sending began;
- recipients/volume;
- source IP or application;
- authentication method;
- whether other credentials were exposed.

Reset or revoke affected credentials/tokens, remove persistence and fix the initial access.

Only after containment should you focus on blocklist/reputation recovery. Otherwise the abuse simply continues while you request delisting.

## Reference material

- [NIST SP 800-61 Rev. 2 — Incident Handling](https://csrc.nist.gov/pubs/sp/800/61/r2/final)
- [RFC 6409 — Message Submission](https://www.rfc-editor.org/rfc/rfc6409)
