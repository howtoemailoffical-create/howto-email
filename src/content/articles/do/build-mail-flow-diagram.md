---
title: Build a useful mail-flow diagram
description: Document systems and trust boundaries so troubleshooting does not start from guesswork.
section: Do
tags: [Architecture, Operations, Documentation]
---

A useful mail-flow diagram shows decisions, not just product logos.

For each path, include:

- sending or receiving system;
- DNS/MX relationship;
- public and private handoff points;
- gateways;
- SMTP connectors or relays;
- TLS requirements;
- where SPF is evaluated;
- where DKIM is signed;
- where messages are modified;
- where logs and queues exist.

Draw inbound, outbound and application-relay paths separately when they differ.

Keep the diagram high enough level to share operationally without publishing credentials, private addressing or unnecessary security-control details.

## Reference material

- [RFC 5598 — Internet Mail Architecture](https://www.rfc-editor.org/rfc/rfc5598)
- [NIST SP 800-177 Rev. 1 — Trustworthy Email](https://csrc.nist.gov/pubs/sp/800/177/r1/final)
