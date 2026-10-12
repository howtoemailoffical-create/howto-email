---
title: Publish a DMARC record
description: Deploy DMARC deliberately, collect reporting data and progress toward enforcement without breaking legitimate senders.
section: Do
tags: [DMARC, DNS, Security]
---

Publishing a DMARC record takes minutes. **Enforcing it safely** requires an inventory of every legitimate sender that uses your domain.

## On this page

- [Before you begin](#before-you-begin)
- [Step 1: Inventory your senders](#step-1-inventory-your-senders)
- [Step 2: Check SPF and DKIM alignment](#step-2-check-spf-and-dkim-alignment)
- [Step 3: Publish a monitoring record](#step-3-publish-a-monitoring-record)
- [Step 4: Verify the DNS record](#step-4-verify-the-dns-record)
- [Step 5: Review reports and enforce gradually](#step-5-review-reports-and-enforce-gradually)
- [Troubleshooting](#troubleshooting)
- [Related guides and references](#related-guides-and-references)

## Before you begin

You need access to the authoritative DNS management interface for your domain and a mailbox or reporting service that can receive and process DMARC aggregate XML reports. If you use a third-party reporting destination on another domain, confirm the provider's required external-reporting authorization.

This guide uses `example.com` and `dmarc@example.com` as placeholders. Replace them with values you control.

## Step 1: Inventory your senders

1. List every system that sends mail with your domain in the visible `From:` address.
2. Include primary mail platforms, CRM and marketing tools, ticketing systems, applications, printers and vendors.
3. Send test messages from each system and inspect their authentication results.
4. Identify owners for each sending service so configuration changes can be coordinated.

Do not assume your primary mail platform is your only sender.

## Step 2: Check SPF and DKIM alignment

DMARC passes when at least one of the following is true:

- SPF passes **and** its authenticated envelope sender domain aligns with the visible From domain.
- DKIM passes **and** the signing `d=` domain aligns with the visible From domain.

Use [DMARC alignment](/reference/dmarc-alignment/) to distinguish an authentication pass from an aligned pass. Follow your sender provider's instructions to configure a custom return path or domain-specific DKIM signing where supported.

## Step 3: Publish a monitoring record

In your DNS provider's interface, add a **TXT** record:

| DNS field | Example value |
| --- | --- |
| Name / Host | `_dmarc` (or `_dmarc.example.com`, depending on the provider) |
| Type | `TXT` |
| Value | `v=DMARC1; p=none; rua=mailto:dmarc@example.com` |
| TTL | Provider default is usually acceptable |

```text
v=DMARC1; p=none; rua=mailto:dmarc@example.com
```

The `p=none` policy requests monitoring rather than DMARC-based rejection. It does **not** guarantee that receiving systems will accept messages for other reasons. Confirm the report mailbox exists and can handle compressed XML attachments.

For provider-specific DNS instructions, use your DNS provider's official TXT-record guide. For Microsoft 365 deployments, see [Microsoft's DMARC configuration instructions](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-dmarc-configure).

## Step 4: Verify the DNS record

From a terminal, query the published name:

```bash
nslookup -type=TXT _dmarc.example.com
```

You should see exactly one DMARC TXT record starting with `v=DMARC1`. If it is missing, confirm the record name, DNS zone and propagation. If two DMARC TXT records exist at the same name, combine them into one valid record.

Next, send representative test messages and confirm the receiver reports `dmarc=pass` for correctly configured sources. A valid DNS record alone does not prove alignment.

## Step 5: Review reports and enforce gradually

1. Collect aggregate reports over a period that covers regular and infrequent mail flows.
2. Separate authorized senders from unknown sources; verify unfamiliar systems before classifying them as abuse.
3. Correct SPF or DKIM alignment for legitimate mail streams.
4. When legitimate sources consistently pass, consider `p=quarantine`, then `p=reject` according to your risk tolerance.
5. Continue reviewing reports after enforcement and whenever sending services change.

Example enforcement policy **after validation**:

```text
v=DMARC1; p=reject; rua=mailto:dmarc@example.com
```

Do not copy this enforcement record into production until you have validated all legitimate senders.

## Troubleshooting

| Problem | First check |
| --- | --- |
| No aggregate reports arrive | Report mailbox, destination authorization, receiver reporting behavior and elapsed time |
| DMARC fails despite SPF passing | SPF envelope domain alignment |
| DMARC fails despite DKIM passing | DKIM `d=` domain alignment |
| Mail fails after enabling enforcement | Headers and authentication for the affected sending service |
| TXT lookup returns no record | DNS name, zone, provider host formatting and caching |

For a repeatable diagnostic process, follow [Troubleshoot DMARC failures](/do/troubleshoot-dmarc/).

## Related guides and references

- [DMARC overview](/reference/dmarc/)
- [DMARC tags](/reference/dmarc-tags/)
- [Analyze a DMARC aggregate report](/do/analyze-dmarc-report/)
- [RFC 7489 — DMARC](https://www.rfc-editor.org/rfc/rfc7489)
- [Google email sender guidelines](https://support.google.com/a/answer/81126)
