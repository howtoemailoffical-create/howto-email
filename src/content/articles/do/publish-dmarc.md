---
title: Publish a DMARC record
description: Deploy DMARC deliberately, collect reporting data and progress toward enforcement without breaking legitimate senders.
section: Do
tags: [DMARC, DNS, Security]
---
Publishing DMARC is easy. Reaching enforcement safely takes more work.

## 1. Inventory your senders

Identify systems that send mail using your domain: Microsoft 365 or Google Workspace, marketing platforms, ticketing systems, applications, scanners and third-party vendors.

## 2. Validate SPF and DKIM

Make sure legitimate senders authenticate and align with the visible From domain where practical.

## 3. Start with visibility

A basic monitoring record might look like:

```text
v=DMARC1; p=none; rua=mailto:dmarc@example.com
```

Use a reporting mailbox or DMARC reporting service capable of processing aggregate XML reports.

## 4. Review the data

Do not classify every unfamiliar source as malicious. Confirm whether it belongs to a business system or vendor before changing policy.

## 5. Move toward enforcement

Once legitimate traffic is understood and aligned, progress deliberately toward `quarantine` and ultimately `reject` where appropriate. Continue monitoring after enforcement because sending environments change.