---
title: SMTP status codes
description: Interpret 2xx, 4xx, 5xx and enhanced SMTP status codes.
section: Reference
tags: [SMTP, Troubleshooting]
---

SMTP replies use three-digit codes. **2xx** indicates success, **4xx** normally indicates a temporary condition, and **5xx** normally indicates a permanent failure for the attempted operation.

Enhanced status codes such as `5.1.1` or `4.7.0` add classification. Preserve the entire remote response: provider-specific diagnostic text often explains more than the numeric code alone.
