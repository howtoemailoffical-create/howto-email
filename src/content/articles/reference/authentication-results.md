---
title: Authentication-Results
description: How receivers record SPF, DKIM and DMARC evaluation results.
section: Reference
tags: [Headers, Authentication]
---

`Authentication-Results` records authentication conclusions made by a receiving authentication service. Results may include SPF, DKIM, DMARC and other mechanisms plus the identities evaluated.

A header copied in from an untrusted sender is not automatically authoritative. Use results added inside the receiver's trusted processing boundary.
