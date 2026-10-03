---
title: Email message size limits
description: Why attachment size and encoded message size are not the same.
section: Reference
tags: [MIME, SMTP]
---

Mail systems impose message-size limits at different points. MIME encoding, especially base64, increases the transmitted size beyond the original binary attachment.

The sender, intermediate gateways and recipient can each have different limits. An attachment that fits a web interface's nominal limit can still fail downstream if the resulting encoded message exceeds another system's maximum.
