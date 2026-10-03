---
title: Prevent email loops
description: Design automated responders and forwarding rules to avoid runaway mail.
section: Do
tags: [Automation, Operations]
---

Automated systems should detect auto-generated mail, avoid responding to their own addresses, cap repeated interactions and preserve loop-detection state or identifiers where appropriate.

Test vacation responders, ticketing systems, gateways and forwarding combinations before deployment. Two individually reasonable auto-responders can create a loop when connected together.
