---
title: Backscatter
description: Unwanted non-delivery reports generated for forged sender addresses.
section: Reference
tags: [Abuse, Bounces]
---

Backscatter occurs when a system accepts a message and later sends a bounce to a forged envelope sender. The innocent forged address receives the unwanted notification.

Where possible, reject clearly unacceptable mail during the SMTP transaction instead of accepting it and generating a later DSN to an unverified sender.
