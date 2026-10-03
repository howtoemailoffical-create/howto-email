---
title: Troubleshoot SPF failures
description: Trace the evaluated domain, source IP and DNS mechanisms behind an SPF result.
section: Do
tags: [SPF, Troubleshooting]
---

Identify the actual SPF identity from the SMTP transaction or trusted Authentication-Results, then identify the connecting source IP. Query that exact domain's SPF record.

Follow includes and redirect behavior, count DNS-triggering mechanisms, and look for missing sources, syntax errors or multiple SPF records. Do not troubleshoot SPF against the visible From address unless it is also the evaluated SPF identity.
