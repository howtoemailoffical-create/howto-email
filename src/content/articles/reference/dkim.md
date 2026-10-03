---
title: DKIM
description: DomainKeys Identified Mail signing, selectors, DNS keys and verification.
section: Reference
tags: [DKIM, DNS, Authentication]
---
DKIM allows a sending system to cryptographically sign selected message headers and the message body.

The signature identifies a signing domain and selector. A receiver uses those values to locate the corresponding public key in DNS and verify the signature.

## DNS location

A selector named `selector1` for `example.com` is normally published beneath:

```text
selector1._domainkey.example.com
```

Private keys belong on the signing system, not in DNS. DNS contains the public key used by receivers.