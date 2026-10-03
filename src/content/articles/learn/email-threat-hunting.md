---
title: Threat hunting in email telemetry
description: Use message, identity and infrastructure evidence together instead of searching only for a bad sender.
section: Learn
tags: [Threat Hunting, Security, Incident Response]
---

Email threat hunting starts with an observable: a sender, domain, URL, attachment hash, subject pattern, message identifier, IP address or authentication anomaly.

Search across mail-flow telemetry and identity/security logs to determine scope.

## Pivot carefully

A shared subject can produce false positives. A malicious domain may appear in a rewritten security URL. A compromised legitimate account can authenticate correctly.

Useful pivots include:

- sender and Reply-To;
- sending IP;
- URL/domain;
- attachment hash/name;
- Message-ID patterns;
- authentication results;
- recipients;
- mailbox-rule changes;
- sign-in events.

## Reference material

- [NIST SP 800-61 Rev. 2 — Incident Handling Guide](https://csrc.nist.gov/pubs/sp/800/61/r2/final)
- [CISA — Recognize and Report Phishing](https://www.cisa.gov/secure-our-world/recognize-and-report-phishing)
