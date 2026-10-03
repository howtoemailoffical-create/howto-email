---
title: MIME
description: How Internet email represents HTML, attachments and multipart content.
section: Reference
tags: [MIME, Message Format]
---

MIME extends Internet message format so email can carry different media types, character sets, multipart bodies and attachments.

A message may contain `multipart/alternative` text and HTML versions, `multipart/mixed` attachments, transfer encodings such as base64, and content-disposition metadata.

MIME structure matters to security scanners and clients because the displayed message can differ from a simplistic reading of the raw body.
