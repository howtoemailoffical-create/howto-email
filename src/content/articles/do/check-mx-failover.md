---
title: Test MX failover
description: Verify backup mail paths without creating a production outage.
section: Do
tags: [MX, Operations, Resilience]
---

Before testing, document every MX target and preference. Confirm each target resolves and presents the expected SMTP service.

For a controlled test, verify that lower-priority backup hosts can accept mail for the domain under the conditions they are intended to handle, and that accepted mail can reach the final mailbox system.

Also verify the backup path applies equivalent anti-abuse and relay controls. A backup MX that accepts everything is not resilience; it is another attack surface.

## Reference material

- [RFC 5321 — MX routing and delivery attempts](https://www.rfc-editor.org/rfc/rfc5321)
