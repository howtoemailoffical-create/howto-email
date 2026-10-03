---
title: Email loops
description: How automatic forwarding and responders can create repeated message circulation.
section: Reference
tags: [Routing, Automation, Troubleshooting]
---

A mail loop occurs when routing or automation repeatedly sends a message back into a path that produces another copy.

Common causes include conflicting forwarding rules, bad connector routes and automatic responders that answer one another.

SMTP includes mechanisms such as trace fields and null reverse-path behavior that help, while automatic responders should use loop-prevention signals such as `Auto-Submitted`.

During an incident, stop the generating rule/path first, then clear or control queued copies.

## Reference material

- [RFC 5321 — SMTP trace and routing](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 3834 — Automatic Responses to Electronic Mail](https://www.rfc-editor.org/rfc/rfc3834)
