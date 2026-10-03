---
title: Email privacy and metadata
description: Encryption can protect content while routing metadata remains visible to systems handling the message.
section: Learn
tags: [Privacy, Encryption, Architecture]
---

Email necessarily exposes some routing information to systems that need to move and deliver the message.

Transport TLS can protect data from passive observation on a network hop, while message-level encryption can protect content from intermediaries that do not hold the keys.

Neither makes all metadata disappear.

Headers, envelope addresses, timing, message size and routing information can still be available to parts of the delivery system depending on the architecture.

## Reference material

- [RFC 5598 — Internet Mail Architecture](https://www.rfc-editor.org/rfc/rfc5598)
- [RFC 8551 — S/MIME](https://www.rfc-editor.org/rfc/rfc8551)
- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)
