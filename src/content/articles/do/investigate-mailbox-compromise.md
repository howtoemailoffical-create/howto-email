---
title: Investigate a compromised mailbox
description: Scope identity, mailbox persistence and malicious mail activity together.
section: Do
tags: [Incident Response, Mailbox, Security]
---

Contain the identity according to your incident process, then preserve evidence before it ages out.

Review:

- sign-in activity;
- sessions/tokens;
- MFA/authentication changes;
- inbox rules;
- external forwarding;
- delegates;
- OAuth/application grants;
- messages sent by the attacker;
- deleted or hidden messages;
- phishing replies and payment conversations.

Search for other recipients or accounts targeted by the compromised mailbox.

Do not stop after changing the password. Existing sessions, application grants or forwarding can preserve attacker access or visibility.

## Reference material

- [NIST SP 800-61 Rev. 2 — Incident Handling Guide](https://csrc.nist.gov/pubs/sp/800/61/r2/final)
- [CISA — Recognize and Report Phishing](https://www.cisa.gov/secure-our-world/recognize-and-report-phishing)
