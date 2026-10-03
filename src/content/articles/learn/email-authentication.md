---
title: Email authentication
description: Understand what SPF, DKIM and DMARC each prove and why they work better together.
section: Learn
tags: [SPF, DKIM, DMARC]
---
Email authentication is a set of controls used to make domain impersonation harder and give receivers better evidence when evaluating messages.

## SPF

SPF publishes which systems are authorized to send using a domain in the SMTP envelope. It is useful, but forwarding can break the path SPF evaluates.

## DKIM

DKIM adds a cryptographic signature to a message. The receiver retrieves the public key from DNS and verifies that the signed portions of the message have not been modified.

## DMARC

DMARC connects authentication to the domain visible to the user in the From header. It checks alignment with SPF and/or DKIM and lets the domain owner publish handling policy and request reports.

A mature deployment treats the three as related controls rather than three unrelated DNS records.