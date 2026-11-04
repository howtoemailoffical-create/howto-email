# HowToEmail assessment Worker (development)
This Worker is **not deployed**. The existing Astro site is static; assessment routes require a separate Cloudflare Worker route or domain. Keep this code separate from the public practice questions.

## Setup
1. Create a Cloudflare KV namespace and bind it as `QUESTION_BANK` to the Worker.
2. Upload a **private**, reviewed array of at least 200 unique questions to KV key `assessment-v1`. Never commit this data to the public repository. Each entry: `{"id":"unique-id","category":"Authentication","question":"...","choices":["...","...","...","..."],"correct":0}`.
3. Set a strong random secret as the Worker secret `SIGNING_SECRET`; do not commit it.
4. Route `/api/assessment/*` to the Worker and add rate limits to start/submit endpoints.
5. Test malformed inputs, expiry, signing verification, invalid scores, origin restrictions, and browser integration before enabling credentials.

## Security and privacy limits
No recipient names or email addresses are sent to the API. The signed credential is bearer-verifiable and does not prove identity. Tokens contain score, date, and random ID; anyone with the token can view those values. The assessment session is stateless, so replay within its 60-minute lifetime is possible; production needs replay protection or a deliberate decision to accept that risk. Origin checks do not prevent non-browser clients. HMAC verification requires keeping the signing key secret; rotating it invalidates old credentials unless key versions are retained. Cloudflare may retain operational request logs independently of application storage. Never claim zero data processing.
