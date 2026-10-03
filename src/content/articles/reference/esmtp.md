---
title: ESMTP extensions
description: How EHLO advertises SMTP capabilities such as STARTTLS, SIZE and AUTH.
section: Reference
tags: [SMTP]
---

Extended SMTP uses `EHLO` to let a server advertise capabilities. Common extensions include `STARTTLS`, `SIZE`, `8BITMIME`, `PIPELINING`, `SMTPUTF8` and authentication mechanisms on submission services.

Capabilities can change after STARTTLS, so a client normally issues EHLO again after establishing TLS.
