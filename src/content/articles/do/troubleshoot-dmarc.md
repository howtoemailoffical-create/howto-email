---
title: Troubleshoot DMARC failures
description: Determine why an authenticated message still fails DMARC.
section: Do
tags: [DMARC, Troubleshooting]
---

A DMARC failure does not necessarily mean SPF and DKIM both failed. DMARC requires **at least one authentication mechanism to pass and align** with the domain in the visible `From:` header.

## On this page

- [Check the message headers](#check-the-message-headers)
- [Compare authenticated domains](#compare-authenticated-domains)
- [Check the published DMARC policy](#check-the-published-dmarc-policy)
- [Fix common failures](#fix-common-failures)
- [Retest safely](#retest-safely)
- [Related guides and references](#related-guides-and-references)

## Check the message headers

1. Send a representative message from the affected application to a mailbox you control.
2. Open the **original message** or **view source** option in your mail client. For Gmail, see [View full headers](https://support.google.com/mail/answer/29436). For Microsoft 365, see [View internet message headers](https://support.microsoft.com/en-us/office/view-internet-message-headers-in-outlook-cd039382-dc6e-4264-ac74-c048563d212c).
3. Locate the visible `From:` address and the receiving system's `Authentication-Results:` header.
4. Record the SPF result and `smtp.mailfrom` domain, plus each DKIM result and its `header.d` domain.
5. Record `dmarc=pass` or `dmarc=fail` if reported by the receiver. Treat headers added by untrusted intermediaries cautiously.

Example:

```text
From: Alerts <alerts@example.com>
Authentication-Results: mx.receiver.example;
  spf=pass smtp.mailfrom=bounces.vendor.example;
  dkim=pass header.d=vendor.example;
  dmarc=fail header.from=example.com
```

Here both mechanisms pass authentication, but neither authenticated domain aligns with `example.com`.

## Compare authenticated domains

For each mechanism, compare its authenticated domain with the visible `From:` domain:

| Mechanism | Domain to compare | Common issue |
| --- | --- | --- |
| SPF | Envelope sender / `smtp.mailfrom` domain | Vendor uses its own bounce domain |
| DKIM | Signing domain in `header.d` | Vendor signs with its own domain |

Under relaxed alignment, subdomains of the same organizational domain can align. Strict alignment requires exact domain equality. A message passes DMARC when **either** aligned SPF **or** aligned DKIM passes; both are not required.

Read [DMARC alignment](/reference/dmarc-alignment/) for examples.

## Check the published DMARC policy

Query the TXT record at `_dmarc.example.com`, replacing the example domain with your own:

```bash
nslookup -type=TXT _dmarc.example.com
```

Expect a record beginning with `v=DMARC1`. For example:

```text
v=DMARC1; p=none; rua=mailto:dmarc@example.com
```

If no record appears, check the exact DNS name and whether the domain inherits policy from its organizational domain. Multiple DMARC records at the same name are an error; consolidate them rather than publishing duplicates. DNS lookups alone cannot prove message alignment.

## Fix common failures

| Symptom | What to investigate | Typical correction |
| --- | --- | --- |
| SPF passes, DMARC fails | `smtp.mailfrom` is not aligned | Configure a supported custom return-path domain or aligned DKIM |
| DKIM passes, DMARC fails | `header.d` belongs to the vendor | Configure domain-specific DKIM signing |
| SPF fails after forwarding | Forwarder changes the sending IP | Prefer a surviving aligned DKIM signature; assess forwarding and ARC behavior |
| Both fail | Sender configuration, DNS, signing and message modification | Verify authorized senders, DNS and signatures |
| Only some messages fail | Different mail streams or subdomains | Compare headers for each source separately |

Do not add arbitrary third-party IP addresses to SPF merely to silence DMARC failures. First identify the actual sending path and alignment requirement.

## Retest safely

1. Correct the sender configuration or DNS record.
2. Allow for DNS caching and any vendor-side configuration delay.
3. Send a new test message through the same workflow that failed.
4. Recheck the receiving system's `Authentication-Results:` and visible `From:`.
5. Confirm `dmarc=pass` and check aggregate reports for other affected sources before tightening policy.

Changing `p=reject` to `p=none` is not a substitute for fixing alignment. A policy change may reduce rejection while troubleshooting, but it also reduces protection.

## Related guides and references

- [DMARC overview](/reference/dmarc/)
- [Publish a DMARC record](/do/publish-dmarc/)
- [DMARC fails even though SPF passes](/do/investigate-dmarc-fail-spf-pass/)
- [DMARC fails even though DKIM passes](/do/investigate-dmarc-fail-dkim-pass/)
- [RFC 7489 — DMARC](https://www.rfc-editor.org/rfc/rfc7489)
