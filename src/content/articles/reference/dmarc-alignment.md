---
title: DMARC alignment
description: Relaxed and strict alignment for SPF and DKIM.
section: Reference
tags: [DMARC, Authentication]
---

DMARC passes when at least one supported authentication mechanism both passes and aligns with the visible From domain.

With relaxed alignment, organizational-domain relationships can qualify. Strict alignment requires an exact domain match. SPF alignment considers the authenticated SPF domain; DKIM alignment considers the signing domain in the `d=` tag.
