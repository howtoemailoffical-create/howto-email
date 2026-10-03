---
title: What a secure email gateway does
description: Where gateways sit in mail flow and which security decisions they commonly make.
section: Learn
tags: [Security, Gateway, Architecture]
---

A secure email gateway sits in the mail path and applies policy before a message reaches its next destination. It may be a cloud service, an appliance, or functionality built into a hosted mail platform.

Common jobs include spam and phishing detection, malware scanning, attachment inspection, URL analysis, DLP, encryption policy, authentication checks, routing, and message logging.

## The gateway changes the architecture

Once a gateway is inserted, troubleshooting needs to distinguish:

```text
Internet -> Gateway -> Mail platform -> Mailbox
```

from:

```text
Mail platform -> Gateway -> Internet
```

A gateway may also modify headers or message bodies. That can affect DKIM and the authentication results observed downstream.

## Trust boundaries matter

If the mailbox platform trusts a gateway, make sure attackers cannot bypass that gateway and reach the platform through another route. MX records, connectors, IP restrictions, certificates, and platform-specific controls can all be part of that design.

## Reference material

- [NIST SP 800-177 Rev. 1 — Trustworthy Email](https://csrc.nist.gov/pubs/sp/800/177/r1/final)
- [NIST SP 800-45 Version 2 — Guidelines on Electronic Mail Security](https://csrc.nist.gov/pubs/sp/800/45/ver2/final)
