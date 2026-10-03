---
title: SMTP AUTH
description: Authentication on message submission services.
section: Reference
tags: [SMTP, Authentication]
---

SMTP AUTH lets a client authenticate to a submission service using an advertised SASL mechanism. It is commonly associated with port 587 or 465 rather than public server-to-server delivery on port 25.

Prefer modern, strongly protected authentication supported by the provider. Legacy basic credentials create additional account-takeover risk and should not be exposed without TLS.
