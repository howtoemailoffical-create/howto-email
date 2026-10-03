---
title: Sender Rewriting Scheme
description: Why forwarders may rewrite envelope senders to preserve SPF behavior.
section: Reference
tags: [SPF, Forwarding]
---

Traditional forwarding can cause SPF to fail because the forwarder's IP is evaluated against the original envelope sender's SPF policy. Sender Rewriting Scheme (SRS) rewrites the envelope sender into a forwarder-controlled domain while encoding information needed for bounce handling.

SRS addresses an SPF forwarding problem; it does not by itself solve DKIM breakage or DMARC alignment.
