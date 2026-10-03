---
title: Deploy MTA-STS and TLS-RPT
description: Add SMTP transport policy and reporting with a staged rollout.
section: Do
tags: [MTA-STS, TLS-RPT]
---

Verify every legitimate MX host supports valid TLS first. Configure TLS reporting so failures become visible. Publish and serve the MTA-STS policy over HTTPS, test policy retrieval and MX matching, then move to enforcement when the environment is stable.

Keep certificate renewal and policy hosting in operational monitoring. A transport-security control that silently expires becomes an availability problem.
