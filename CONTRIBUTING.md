# Contributing to howto.email

Thanks for helping improve howto.email. The project favors technically accurate, vendor-neutral documentation that explains observable email behavior rather than hiding it behind a score.

## Local development

```bash
npm ci
npm run validate
npm run build
npm run dev
```

## Articles

Articles live under `src/content/articles/{learn,reference,do}/`.

Required frontmatter:

```yaml
---
title: "Article title"
description: "A concise description."
section: Reference
tags: [DNS, SPF]
---
```

Quote YAML values containing colons. Use simple, natural technical writing. Distinguish protocol requirements from provider-specific behavior.

Prefer primary references: RFC Editor, IANA, standards bodies, official vendor documentation, NIST, CISA, and primary regulatory sources.

Finish technical articles with:

```md
## Reference material

- [Source](https://example.com)
```

Do not publish credentials, private infrastructure details, customer data, secrets, or instructions that require testing systems without authorization.

## Before opening a pull request

Run `npm run validate` and `npm run build`. Fix blocking errors and review warnings for missing references or internal links.
