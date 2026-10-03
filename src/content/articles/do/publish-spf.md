---
title: Publish an SPF record
description: Build SPF from an inventory of legitimate outbound senders.
section: Do
tags: [SPF, DNS]
---

Inventory every service that sends with the relevant envelope domain before writing SPF. Build **one** SPF policy for that DNS name, understand every provider include, and count DNS-triggering mechanisms.

Publish with a deliberate `all` qualifier and test actual messages from each path. Do not copy another organization's SPF record or authorize an entire provider range unless that is actually required.
