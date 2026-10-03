---
title: Analyze an email header
description: A practical sequence for tracing a suspicious or failed message.
section: Do
tags: [Headers, Security]
---

Preserve the raw message or full headers. Identify the visible From, Reply-To, Return-Path and Message-ID. Read trusted Received fields backward through the route. Then inspect Authentication-Results and DKIM signatures.

Compare displayed identities with authenticated identities and note any forwarding intermediaries. Treat authentication as one part of the analysis; an authenticated account can still send malicious mail.
