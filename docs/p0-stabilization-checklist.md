# P0 stabilization and accessibility acceptance checklist

This branch is the staging area for critical fixes. Do not merge until the items below are verified against the Cloudflare Pages preview.

## Domain Analyzer
- [ ] Reproduce failing domain lookups using valid, NXDOMAIN, timeout and malformed responses.
- [ ] Distinguish absent records from unavailable/failed checks; do not mark untested controls as failed.
- [ ] Ensure submit, copy records, copy link, download and JSON actions work with keyboard and touch.
- [ ] Escape untrusted response content and avoid exposing raw error internals.

## Email Header Analyzer
- [ ] Verify pasted headers and sample input produce correctly grouped findings.
- [ ] Fix overflowing evidence, long tokens, tables and nested disclosures.
- [ ] Keep all parsing in-browser; never send raw headers to telemetry.
- [ ] Check copy and print output for clipping and overlapping sections.

## Responsive and accessibility verification
- [ ] Test widths 320, 375, 768 and 1280 CSS pixels, plus 200% zoom and text resize.
- [ ] Confirm no page-level horizontal overflow; allow scrolling within long code/evidence regions.
- [ ] Check keyboard tab order, visible focus, disclosure controls and live error/status messages.
- [ ] Run automated axe checks and manual WCAG 2.2 AA review; document remaining exceptions.

## Release gate
- [ ] Astro build passes.
- [ ] Validate both analyzers with realistic and failure-case fixtures.
- [ ] Review Cloudflare Pages preview on mobile and desktop.
- [ ] Keep main unchanged until checks pass and the PR is approved.
