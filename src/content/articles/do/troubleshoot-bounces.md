---
title: Troubleshoot email bounces
description: Use SMTP and DSN evidence to identify the actual failure class.
section: Do
tags: [SMTP, Troubleshooting]
---

Capture the recipient domain, timestamp, sending system, remote host, SMTP reply, enhanced status code and DSN details.

A 4xx response is normally temporary; a 5xx response is normally permanent for that attempt. Then classify the issue: recipient/addressing, policy, authentication, reputation, content, size, rate limiting or infrastructure.

Do not diagnose from the bounce subject line alone.
