---
title: S/MIME
description: Certificate-based signing and encryption for message content.
section: Reference
tags: [S-MIME, Encryption, Certificates]
---

S/MIME applies cryptographic protection to MIME message content. It can provide digital signatures, encryption, or both.

A signature can provide integrity and identify the certificate used to sign. Encryption protects content for intended recipients who possess the corresponding private keys.

## Operational reality

The cryptography is only part of deployment. Organizations also need certificate issuance, trust, renewal, private-key protection, recovery, directory/discovery strategy, and client compatibility.

Losing an encryption private key can mean losing access to historical encrypted content unless recovery was designed in advance.

## Reference material

- [RFC 8551 — S/MIME 4.0 Message Specification](https://www.rfc-editor.org/rfc/rfc8551)
- [RFC 8550 — S/MIME 4.0 Certificate Handling](https://www.rfc-editor.org/rfc/rfc8550)
- [NIST SP 800-177 Rev. 1 — Trustworthy Email](https://csrc.nist.gov/pubs/sp/800/177/r1/final)
