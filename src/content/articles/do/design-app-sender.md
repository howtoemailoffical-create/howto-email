---
title: Design an application email sender
description: Choose identity, authentication, retry and telemetry before writing the send-email call.
section: Do
tags: [Applications, SMTP, API]
---

Before integration, decide:

1. visible From domain and address;
2. Reply-To behavior;
3. bounce/return-path domain;
4. DKIM signing ownership;
5. SMTP or API authentication;
6. secret/token rotation;
7. retry and duplicate handling;
8. delivery-event processing;
9. logging/correlation ID;
10. suppression rules.

## Separate transport success from business success

An SMTP `250` or API `202`-style acceptance is not proof the user received or acted on the message. Model later delivery events separately.

## Reference material

- [RFC 6409 — Message Submission](https://www.rfc-editor.org/rfc/rfc6409)
- [RFC 5322 — Internet Message Format](https://www.rfc-editor.org/rfc/rfc5322)
- [RFC 3463 — Enhanced Status Codes](https://www.rfc-editor.org/rfc/rfc3463)
