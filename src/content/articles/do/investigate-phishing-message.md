---
title: Investigate a suspected phishing email
description: A header-first workflow that preserves evidence and separates spoofing from account compromise.
section: Do
tags: [Security, Phishing, Incident Response]
---

Preserve the original message or raw source before forwarding or editing it.

## Identity

Record the visible From, Reply-To, Return-Path and relevant authentication results. Check whether SPF/DKIM passed and whether DMARC aligned.

## Route

Read trusted Received headers backward to understand how the message entered the environment.

## Content

Inspect links, attachment metadata, requested actions and impersonated brands or people using your approved security tooling. Do not detonate unknown attachments on a normal workstation.

## Scope

Search mail/security telemetry for the same sender, domains, URLs, attachment hashes, subject patterns or message identifiers.

## Do not overread authentication

A fully authenticated message can still be phishing, particularly when a legitimate account or attacker-controlled domain was used.

## Reference material

- [NIST — Phishing guidance](https://www.nist.gov/itl/smallbusinesscyber/guidance-topic/phishing)
- [NIST SP 800-177 Rev. 1 — Trustworthy Email](https://csrc.nist.gov/pubs/sp/800/177/r1/final)
