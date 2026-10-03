---
title: Email tracking pixels
description: What remote-image tracking can observe and why the signal is imperfect.
section: Reference
tags: [Privacy, HTML Email, Deliverability]
---

A tracking pixel is typically a remotely hosted image with a URL tied to a message or recipient. When a client requests it, the sender can record that request.

That does not necessarily mean a human read the message. Image proxies, privacy features, prefetching, blocked images and automated scanners can all change the signal.

Do not build critical business logic around an "open" event as though it were a signed user acknowledgment.

## Reference material

- [RFC 2854 — text/html media type](https://www.rfc-editor.org/rfc/rfc2854)
- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)
