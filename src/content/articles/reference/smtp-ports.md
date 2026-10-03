---
title: SMTP ports
description: What ports 25, 465 and 587 are normally used for.
section: Reference
tags: [SMTP, TLS]
---

**25/tcp** is the standard port for server-to-server SMTP transfer. **587/tcp** is the standard message-submission port and commonly uses STARTTLS plus authentication. **465/tcp** is widely used for message submission with implicit TLS.

Do not expose an unauthenticated relay merely because a port is reachable. Submission policy and relay authorization are separate from transport encryption.
