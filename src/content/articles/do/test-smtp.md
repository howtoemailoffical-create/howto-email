---
title: Test an SMTP service safely
description: Validate connectivity, capabilities and relay policy without sending arbitrary mail.
section: Do
tags: [SMTP, Troubleshooting]
---

Resolve the intended host and confirm TCP reachability on the appropriate port. Inspect the SMTP banner, issue EHLO and record advertised extensions. If testing STARTTLS, negotiate TLS and inspect the certificate and post-TLS EHLO capabilities.

For relay testing, use domains and recipients you control. Confirm unauthorized relay is rejected rather than attempting delivery through third-party systems.
