---
title: TNEF and winmail.dat
description: Why some Outlook-originated messages expose a winmail.dat attachment.
section: Reference
tags: [MIME, Outlook, Interoperability]
---

Transport Neutral Encapsulation Format (TNEF) is a Microsoft format that can carry MAPI properties and rich Outlook information.

Recipients using clients that do not interpret TNEF may see a `winmail.dat` attachment instead of the intended rich content or attachments.

When troubleshooting, inspect the sender's message format and the mail-flow transformations rather than assuming the attachment was corrupted in transit.

## Reference material

- [Microsoft — TNEF conversion options in Exchange Online](https://learn.microsoft.com/en-us/exchange/mail-flow/content-conversion/tnef-conversion)
