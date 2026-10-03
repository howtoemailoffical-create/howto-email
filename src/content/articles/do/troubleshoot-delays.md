---
title: Troubleshoot delayed email
description: Find where a message waited by correlating headers, queues and SMTP responses.
section: Do
tags: [SMTP, Troubleshooting]
---

Use timestamps in trusted Received headers to identify the hop where delay occurred. Then correlate that period with sending queues and SMTP logs.

Common causes include temporary 4xx deferrals, rate limits, DNS failures, unreachable destinations, TLS problems, overloaded queues and greylisting.

A message arriving late does not necessarily mean the final receiving server caused the delay.
