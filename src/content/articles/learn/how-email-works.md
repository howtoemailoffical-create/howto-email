---
title: How email works
description: Follow an email from composition through DNS, SMTP transport, filtering and final mailbox delivery.
section: Learn
tags: [SMTP, DNS, Delivery]
---
Email looks simple from the inbox, but a normal message crosses several systems before it arrives.

## The basic path

A sender writes a message in a mail client or application. That system submits the message to an outbound mail server. The sending infrastructure determines where the recipient domain accepts mail by looking up its **MX records in DNS**.

The sending server then opens an SMTP connection to the receiving environment. The recipient can evaluate the connecting IP, envelope sender, message headers, SPF, DKIM, DMARC, reputation and content before accepting the message.

After acceptance, the message is routed to the recipient mailbox. A user normally reads it through a web client or a protocol such as IMAP.

## Why this matters

Troubleshooting email is much easier when you identify which stage failed. A DNS problem, SMTP rejection, authentication failure and mailbox filtering decision are different problems even when the user reports all of them as "email isn't working."