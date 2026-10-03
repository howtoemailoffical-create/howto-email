---
title: Troubleshoot DMARC failures
description: Determine why an authenticated message still fails DMARC.
section: Do
tags: [DMARC, Troubleshooting]
---

Start with the visible From domain. Inspect SPF and DKIM separately, including the domains each mechanism authenticated.

DMARC can fail even when SPF passes if the SPF identity is not aligned, and it can fail even when DKIM passes if the signing domain is not aligned. Forwarding commonly breaks SPF, making aligned DKIM especially important.
