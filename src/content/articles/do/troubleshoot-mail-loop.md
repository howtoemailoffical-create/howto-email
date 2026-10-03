---
title: Troubleshoot an email loop
description: Find the repeated hop or automation instead of deleting copies one mailbox at a time.
section: Do
tags: [Routing, Troubleshooting, Automation]
---

Take one looped message and compare its repeated `Received` headers.

Identify the systems that appear over and over. Then inspect routing rules, connectors, forwarding and automatic responses between those systems.

If the loop is actively generating volume, contain the responsible rule or route according to your change process before cleaning queues.

Check whether duplicate messages already exist in downstream queues after the cause is fixed.

## Reference material

- [RFC 5321 — SMTP trace information](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 3834 — Automatic Responses](https://www.rfc-editor.org/rfc/rfc3834)
