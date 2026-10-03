---
title: Bulk sender readiness checklist
description: Prepare authentication, DNS, unsubscribe and list operations before increasing volume.
section: Do
tags: [Bulk Email, Deliverability, Operations]
---

Before increasing volume, make sure the basics are boring.

## Identity and infrastructure

Verify SPF and DKIM on real messages, deploy DMARC, maintain valid DNS/rDNS for sending infrastructure where applicable, and use TLS.

## Recipient operations

Know where addresses came from. Process permanent failures, complaints and unsubscribes. Keep promotional/subscription traffic operationally distinct from critical transactional messages where practical.

## Message standards

Generate standards-compliant messages and implement provider-required unsubscribe behavior for applicable mail.

## Monitor before scaling

Watch delivery responses, complaint signals and provider dashboards as volume changes. A large launch is a bad time to discover an old application is sending unauthenticated mail from the same domain.

## Provider rules move

Google currently publishes specific requirements for higher-volume Gmail senders. Other mailbox providers maintain their own policies. Recheck them before major campaigns rather than relying on a years-old checklist.

## Reference material

- [Google — Email sender guidelines](https://support.google.com/mail/answer/81126)
- [Google — Email sender guidelines FAQ](https://support.google.com/mail/answer/14229414)
- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
- [RFC 8058 — One-Click Unsubscribe](https://www.rfc-editor.org/rfc/rfc8058)
