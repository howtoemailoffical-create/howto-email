---
title: REQUIRETLS
description: An SMTP extension for requesting TLS protection across message transport.
section: Reference
tags: [SMTP, TLS]
---

REQUIRETLS lets a sender request that a message be transmitted only over TLS through supporting SMTP infrastructure. It addresses a different problem from a receiving-domain policy such as MTA-STS.

Support is not universal, so operators need to understand how their sending platform behaves when downstream systems do not support the extension.

## Reference material

- [RFC 8689 — SMTP Require TLS Option](https://www.rfc-editor.org/rfc/rfc8689)
