---
title: Authentication-Results
description: The standard header used to record message authentication evaluations.
section: Reference
tags: [Headers, Authentication]
---

`Authentication-Results` lets an authentication service record results such as SPF, DKIM and DMARC in a structured header.

A simplified example:

```text
Authentication-Results: mx.example.net;
  spf=pass smtp.mailfrom=sender.example;
  dkim=pass header.d=example.com;
  dmarc=pass header.from=example.com
```

This is extremely useful during troubleshooting because it shows both the result and the identity evaluated.

## Do not trust every copy

A sender can inject a fake Authentication-Results field before transmission. Receivers need a defined trust boundary and should remove or distinguish untrusted copies.

## Reference material

- [RFC 8601 — Message Header Field for Indicating Message Authentication Status](https://www.rfc-editor.org/rfc/rfc8601)
