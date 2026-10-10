---
title: Analyze an email header
description: Step-by-step guide to tracing email delivery hops, authentication results, delays and suspicious sender identities.
section: Do
tags: [Headers, Security, Troubleshooting]
---

Full email headers provide a record of how a message was handled, including server handoffs, timestamps and reported authentication checks. They are useful for investigating delayed delivery, spoofing, forwarding and unexpected filtering.

**Start with the [Email Header Analyzer](/tools/header-analyzer)** to view a delivery timeline and Message Flow diagram. The analyzer processes pasted headers in your browser; it does not independently authenticate their contents.

## 1. Preserve the original evidence

Export or copy **full message headers** from the recipient's mailbox. If investigating an incident, retain the original message and record where and when it was collected. Headers may contain personal email addresses, IP addresses and internal hostnames, so avoid posting them publicly.

A screenshot of the sender name is not enough to reconstruct the delivery path.

## 2. Identify the message's identities

Locate these fields:

| Header | What it tells you |
| --- | --- |
| `From:` | The address displayed to the recipient; it can be spoofed. |
| `Reply-To:` | Where replies may be directed; differences are worth investigating in context. |
| `Return-Path:` | The final-delivery record of the envelope sender, often used for bounces. |
| `Message-ID:` | An identifier useful for correlating logs, but not inherently trustworthy. |
| `Date:` | A sender-supplied date, which may differ from actual receipt time. |

Differences between these identities are not automatically malicious: legitimate bulk senders and delegated services often use different envelope domains.

## 3. Trace the Received chain

Each receiving mail server commonly prepends a `Received:` field. Consequently, the newest entry is usually at the top, and reading from **bottom to top** gives the apparent oldest-to-newest path.

Example (illustrative addresses):

```text
Received: from relay.example.net (relay.example.net [192.0.2.20])
 by inbox.example.org with ESMTPS; Wed, 07 Oct 2026 15:03:10 +0000
Received: from sender.example.com (sender.example.com [192.0.2.10])
 by relay.example.net with ESMTPS; Wed, 07 Oct 2026 15:03:04 +0000
```

This suggests a six-second interval between the recorded relay and recipient handoffs. It **does not** establish end-to-end transit time: earlier hops may be missing, and clocks can differ.

The Message Flow tab makes the reported sequence easier to follow, but does not infer undocumented servers. Treat hops before your trusted receiving infrastructure as unverified claims.

## 4. Read authentication results

Look for `Authentication-Results:` added by the receiving system you trust. Example:

```text
Authentication-Results: inbox.example.org;
 spf=pass smtp.mailfrom=example.com;
 dkim=pass header.d=example.com;
 dmarc=pass header.from=example.com
```

- `spf=pass`: the receiver reports SPF authorization for the evaluated SMTP identity.
- `dkim=pass`: the receiver reports that a DKIM signature validated.
- `dmarc=pass`: the receiver reports a passing, aligned authentication mechanism.

A `DKIM-Signature:` header by itself **does not** prove DKIM passed. Likewise, an attacker can insert fake `Authentication-Results` text before the message reaches your system.

For domain alignment examples, read [Email authentication explained](/learn/email-authentication).

## 5. Investigate delays and anomalies

Compare adjacent trusted `Received` timestamps and look for large gaps, repeated deferrals, unexpected relays or negative intervals. A delay can indicate queueing, filtering, DNS problems or retry behavior; a negative interval may simply reflect clock skew.

Correlate the findings with server logs or [Microsoft 365 message trace](/do/m365-message-trace) where available. A header alone rarely identifies the precise reason for a delay.

## 6. Record a defensible conclusion

Separate **observations** from **inferences**. For example:

- Observation: the recipient's trusted server reported `dmarc=fail`.
- Observation: a five-minute interval appears between two reported hops.
- Inference to investigate: forwarding may have affected authentication.
- Not established: that the message is malicious, or that a particular server caused the delay.

If the issue is ongoing, preserve the raw header, timestamps with time zones, relevant message identifiers and any matching gateway logs.

## Related resources

- [Email Header Analyzer](/tools/header-analyzer)
- [Build a mail-flow diagram](/do/build-mail-flow-diagram)
- [Email authentication explained](/learn/email-authentication)
- [Received header reference](/reference/received-header)
- [Authentication-Results reference](/reference/authentication-results)
- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 8601 — Authentication-Results](https://www.rfc-editor.org/rfc/rfc8601)
