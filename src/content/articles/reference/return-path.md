---
title: Return-Path and envelope sender
description: How SMTP envelope identity differs from the visible From header.
section: Reference
tags: [SMTP, SPF]
---

The SMTP envelope sender, commonly reflected in `Return-Path` after delivery, is used for delivery-status handling and is the identity SPF normally evaluates.

It can differ from the visible RFC 5322 From address shown to users. DMARC bridges this gap by requiring alignment between an authenticated SPF or DKIM identity and the visible From domain.
