---
title: Envelope vs header addresses
description: The SMTP MAIL FROM/RCPT TO envelope versus message From/To headers.
section: Reference
tags: [SMTP, Headers]
---

SMTP transports an envelope containing a sender and one or more recipients. The message inside that envelope has its own From, To and Cc headers.

They can legitimately differ. Bcc works partly because an envelope recipient need not appear in the visible recipient headers. SPF evaluates an envelope identity while DMARC centers on the visible From domain.
