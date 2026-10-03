---
title: DMARC aggregate reports
description: What RUA XML reports contain and how to interpret them.
section: Reference
tags: [DMARC, Reporting]
---

DMARC aggregate reports summarize authentication observations grouped by source and policy evaluation. They commonly include source IP, message counts, disposition, SPF/DKIM outcomes and identifier information.

They are telemetry, not a list of attacks. Legitimate platforms, forwarding and alignment mistakes can all appear as failures. Trend data over time is more useful than reacting to a single row.
