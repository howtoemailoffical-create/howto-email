// Public, stateless, read-only MCP server for howto.email.
// No database, API keys, or paid services required.
const SITE = "https://howto.email";
const VERSION = "2025-03-26";
let sitemapCache = { expires: 0, paths: [] };
const tools = [

  { name: "check_mx", description: "Retrieve a domain's MX hosts and priorities; no SMTP connection is attempted.", inputSchema: { type: "object", properties: { domain: { type: "string" } }, required: ["domain"], additionalProperties: false } },
  { name: "check_dkim", description: "Retrieve a DKIM TXT key at selector._domainkey.domain. Requires a known selector; does not discover all selectors or verify signatures.", inputSchema: { type: "object", properties: { domain: { type: "string" }, selector: { type: "string", description: "Known DKIM selector" } }, required: ["domain", "selector"], additionalProperties: false } },
  { name: "check_mta_sts", description: "Inspect MTA-STS DNS TXT record and published HTTPS policy; no SMTP/TLS handshake.", inputSchema: { type: "object", properties: { domain: { type: "string" } }, required: ["domain"], additionalProperties: false } },
  { name: "check_tls_rpt", description: "Retrieve the SMTP TLS reporting TXT record (_smtp._tls).", inputSchema: { type: "object", properties: { domain: { type: "string" } }, required: ["domain"], additionalProperties: false } },
  { name: "check_bimi", description: "Retrieve BIMI TXT record for a selector (default: default); no logo or certificate validation.", inputSchema: { type: "object", properties: { domain: { type: "string" }, selector: { type: "string", description: "BIMI selector; defaults to default" } }, required: ["domain"], additionalProperties: false } },
  { name: "analyze_domain", description: "Summarize public SPF, DMARC, MX, MTA-STS, TLS-RPT and default BIMI DNS records. DKIM requires a selector and is only checked when supplied. Findings are informational, not an audit.", inputSchema: { type: "object", properties: { domain: { type: "string" }, dkim_selector: { type: "string", description: "Optional known DKIM selector" } }, required: ["domain"], additionalProperties: false } },

  { name: "check_spf", description: "Retrieve SPF TXT records for a public domain. This is a basic lookup, not a complete SPF validation.", inputSchema: { type: "object", properties: { domain: { type: "string", description: "Public domain, e.g. example.com" } }, required: ["domain"], additionalProperties: false } },
  { name: "check_dmarc", description: "Retrieve DMARC TXT records for a public domain. This is a basic lookup, not a complete DMARC validation.", inputSchema: { type: "object", properties: { domain: { type: "string", description: "Public domain, e.g. example.com" } }, required: ["domain"], additionalProperties: false } },
  { name: "search_articles", description: "Find howto.email articles by keywords in their URL paths.", inputSchema: { type: "object", properties: { query: { type: "string", description: "Keywords to search" } }, required: ["query"], additionalProperties: false } },
  { name: "get_article", description: "Read text from a public howto.email article by relative path.", inputSchema: { type: "object", properties: { path: { type: "string", description: "Article path, e.g. /guides/spf/" } }, required: ["path"], additionalProperties: false } }
];
const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers } });
const textResult = text => ({ content: [{ type: "text", text }], isError: false });
const errorResult = message => ({ content: [{ type: "text", text: message }], isError: true });
function domainName(value) {
  if (typeof value !== "string" || value.length > 253) throw Error("Invalid domain");
  const d = value.toLowerCase().trim().replace(/\.$/, "");
  if (!d.includes(".") || !/^[a-z0-9.-]+$/.test(d) || d.split(".").some(p => !p || p.length > 63 || !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(p))) throw Error("Provide a valid public domain");
  const suffix = d.split(".").at(-1);
  if (suffix.length < 2 || ["local", "localhost", "internal", "test", "invalid", "example"].includes(suffix)) throw Error("Provide a public domain");
  return d;
}
async function lookup(domain, type) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const url = new URL("https://cloudflare-dns.com/dns-query");
    url.searchParams.set("name", domain);
    url.searchParams.set("type", type);
    const r = await fetch(url, { headers: { accept: "application/dns-json" }, signal: controller.signal });
    if (!r.ok) throw Error("DNS lookup unavailable");
    const data = await r.json();
    return (data.Answer || []).filter(a => a.type === 16).map(a => String(a.data || "").replace(/^"|"$/g, "").replace(/"\s+"/g, ""));
  } finally { clearTimeout(timer); }
}

function selectorName(value) {
  if (typeof value !== "string" || !/^[a-z0-9](?:[a-z0-9_-]{0,61}[a-z0-9])?$/i.test(value)) throw Error("Invalid selector");
  return value.toLowerCase();
}
async function dnsRecords(host, type) {
  const url = new URL("https://cloudflare-dns.com/dns-query");
  url.searchParams.set("name", host);
  url.searchParams.set("type", type);
  const response = await fetch(url, { headers: { accept: "application/dns-json" }, signal: AbortSignal.timeout(5000) });
  if (!response.ok) throw Error("DNS lookup unavailable");
  const data = await response.json();
  if (typeof data.Status !== "number") throw Error("Invalid DNS response");
  if (![0, 3].includes(data.Status)) throw Error("DNS returned status " + data.Status);
  return (data.Answer || []).filter(item => item.type === (type === "MX" ? 15 : 16)).map(item => String(item.data || ""));
}
const cleanTxt = value => value.replace(/^"|"$/g, "").replace(/"\s+"/g, "");
async function txtAt(host, prefix) {
  const records = (await dnsRecords(host, "TXT")).map(cleanTxt);
  return records.filter(value => value.toLowerCase().startsWith(prefix.toLowerCase()));
}
async function inspect(domain, kind, selector) {
  if (kind === "mx") {
    const answers = await dnsRecords(domain, "MX");
    const records = answers.map(raw => {
      const match = raw.match(/^(\d+)\s+(.+)$/);
      return match ? { priority: Number(match[1]), exchange: match[2].replace(/\.$/, "") } : { raw };
    }).sort((a,b) => (a.priority ?? 99999) - (b.priority ?? 99999));
    return { domain, records, found: records.length > 0, note: "DNS only; does not test mail delivery." };
  }
  const prefix = { spf: "v=spf1", dmarc: "v=DMARC1", dkim: "v=DKIM1", mta_sts: "v=STSv1", tls_rpt: "v=TLSRPTv1", bimi: "v=BIMI1" }[kind];
  const host = kind === "spf" ? domain : kind === "dmarc" ? "_dmarc." + domain : kind === "dkim" ? selector + "._domainkey." + domain : kind === "mta_sts" ? "_mta-sts." + domain : kind === "tls_rpt" ? "_smtp._tls." + domain : selector + "._bimi." + domain;
  const records = (await txtAt(host, prefix)).filter(record => {
    const next = record.slice(prefix.length, prefix.length + 1);
    return !next || /[;\s]/.test(next);
  });
  const result = { domain, host, records, found: records.length > 0 };
  if (kind === "dkim") result.note = "A missing record does not mean DKIM is absent; selectors must be known. DNS lookup does not verify a signature.";
  if (kind === "bimi") result.note = "Does not validate image, certificate, or mailbox-provider display requirements.";
  if (kind === "mta_sts" && records.length) {
    try {
      const response = await fetch("https://mta-sts." + domain + "/.well-known/mta-sts.txt", { redirect: "error", signal: AbortSignal.timeout(5000) });
      if (response.ok && (Number(response.headers.get("content-length")) || 0) <= 65536) {
        const policy = (await response.text()).slice(0, 65536);
        result.policy = policy;
        result.policy_fetched = true;
      } else {
        result.policy_fetched = false;
        result.policy_error = "Policy unavailable or too large";
      }
    } catch {
      result.policy_fetched = false;
      result.policy_error = "HTTPS policy request failed";
    }
  }
  return result;
}


const API_KINDS = { spf: "spf", dmarc: "dmarc", mx: "mx", dkim: "dkim", "mta-sts": "mta_sts", "tls-rpt": "tls_rpt", bimi: "bimi" };
const API_HEADERS = { "access-control-allow-origin": "*", "access-control-allow-methods": "GET, HEAD, OPTIONS", "access-control-allow-headers": "Accept", "x-content-type-options": "nosniff" };
const apiJson = (body, status = 200, extra = {}) => json(body, status, { ...API_HEADERS, "cache-control": status === 200 ? "public, max-age=300" : "no-store", ...extra });
async function analyze(domain, dkimSelector) {
  const kinds = ["spf", "dmarc", "mx", "mta_sts", "tls_rpt", "bimi", ...(dkimSelector ? ["dkim"] : [])];
  const values = await Promise.all(kinds.map(async kind => {
    try { return [kind, await inspect(domain, kind, kind === "dkim" ? dkimSelector : "default")]; }
    catch (e) { return [kind, { error: e instanceof Error ? e.message : "Lookup failed" }]; }
  }));
  const results = Object.fromEntries(values);
  const findings = [];
  if (results.dmarc?.records?.some(v => /(?:^|;)\s*p=none(?:;|$)/i.test(v))) findings.push("DMARC is set to p=none (monitoring only).");
  for (const kind of ["spf", "dmarc", "mx", "mta_sts", "tls_rpt"]) if (results[kind]?.found === false) findings.push(kind.toUpperCase().replace("_", "-") + " record not found.");
  return { domain, results, findings, notes: ["Informational DNS inspection; not a security or deliverability certification.", "DKIM needs a known selector.", "MTA-STS, TLS-RPT and BIMI are optional in many environments."] };
}
async function apiResponse(request, url) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: API_HEADERS });
  if (!["GET", "HEAD"].includes(request.method)) return apiJson({ error: "Method not allowed; use GET." }, 405, { allow: "GET, HEAD, OPTIONS" });
  const endpoint = url.pathname.slice(5).replace(/\/$/, "");
  if (endpoint === "" || endpoint === "docs") {
    const body = { service: "howto.email Email DNS API", version: "1", documentation: "https://howto.email/integrations/api/", endpoints: ["/api/analyze", ...Object.keys(API_KINDS).map(k => "/api/" + k)], parameters: { domain: "Required public domain", selector: "Required for DKIM; optional for BIMI, default=default", dkim_selector: "Optional on analyze" }, rate_limit: "Shared with MCP requests; 30 requests/minute per client IP per Cloudflare location", note: "Public DNS observations only. No SMTP connectivity tests." };
    return request.method === "HEAD" ? new Response(null, { headers: API_HEADERS }) : apiJson(body);
  }
  if (endpoint !== "analyze" && !Object.hasOwn(API_KINDS, endpoint)) return apiJson({ error: "Unknown endpoint" }, 404);
  const domain = domainName(url.searchParams.get("domain"));
  const selector = endpoint === "dkim" ? selectorName(url.searchParams.get("selector")) : endpoint === "bimi" ? selectorName(url.searchParams.get("selector") || "default") : undefined;
  const dkimSelector = endpoint === "analyze" && url.searchParams.has("dkim_selector") ? selectorName(url.searchParams.get("dkim_selector")) : null;
  const body = endpoint === "analyze" ? await analyze(domain, dkimSelector) : await inspect(domain, API_KINDS[endpoint], selector);
  return request.method === "HEAD" ? new Response(null, { headers: { ...API_HEADERS, "cache-control": "public, max-age=300" } }) : apiJson(body);
}

async function articlePaths() {
  if (sitemapCache.expires > Date.now()) return sitemapCache.paths;
  const r = await fetch(SITE + "/sitemap-index.xml", { signal: AbortSignal.timeout(5000) });
  if (!r.ok) throw Error("Sitemap unavailable");
  const index = await r.text();
  const maps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]).filter(u => u.startsWith(SITE + "/")).slice(0, 8);
  const pages = [];
  for (const map of maps) {
    const res = await fetch(map, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) continue;
    const xml = await res.text();
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      try { const u = new URL(m[1]); if (u.origin === SITE) pages.push(u.pathname); } catch {}
    }
  }
  const unique = [...new Set(pages)];
  if (unique.length) sitemapCache = { paths: unique, expires: Date.now() + 600000 };
  return unique;
}
async function execute(name, args) {
  if (["check_mx", "check_dkim", "check_mta_sts", "check_tls_rpt", "check_bimi", "analyze_domain"].includes(name)) {
    const domain = domainName(args.domain);
    if (name === "analyze_domain") {
      const selector = args.dkim_selector === undefined ? null : selectorName(args.dkim_selector);
      return textResult(JSON.stringify(await analyze(domain, selector), null, 2));
    }
    const kinds = { check_mx: "mx", check_dkim: "dkim", check_mta_sts: "mta_sts", check_tls_rpt: "tls_rpt", check_bimi: "bimi" };
    const selector = name === "check_dkim" ? selectorName(args.selector) : name === "check_bimi" ? selectorName(args.selector ?? "default") : undefined;
    return textResult(JSON.stringify(await inspect(domain, kinds[name], selector), null, 2));
  }
  if (name === "check_spf" || name === "check_dmarc") {
    const domain = domainName(args.domain);
    const host = name === "check_dmarc" ? "_dmarc." + domain : domain;
    const records = (await lookup(host, "TXT")).filter(v => name === "check_dmarc" ? /^v=DMARC1(?:;|$)/i.test(v) : /^v=spf1(?:\s|$)/i.test(v));
    return textResult(JSON.stringify({ domain, host, records, found: records.length > 0, note: "DNS TXT lookup only; not a complete authentication audit." }, null, 2));
  }
  if (name === "search_articles") {
    const query = String(args.query || "").trim().toLowerCase().slice(0, 100);
    if (!query) throw Error("Search query required");
    const words = query.match(/[a-z0-9]+/g) || [];
    if (!words.length) throw Error("Search query required");
    const matches = (await articlePaths()).map(path => {
      const parts = path.split("/").filter(Boolean);
      const title = (parts.at(-1) || "Home").replace(/[-_]/g, " ");
      const searchable = parts.join(" ").replace(/[-_]/g, " ").toLowerCase();
      const matched = words.filter(w => searchable.includes(w)).length;
      const score = matched * 10 + (searchable.includes(query) ? 20 : 0) + (title.toLowerCase().includes(query) ? 10 : 0);
      return { title, url: SITE + path, score };
    }).filter(item => item.score > 0).sort((a, b) => b.score - a.score || a.url.localeCompare(b.url)).slice(0, 15);
    return textResult(JSON.stringify(matches.map(({ title, url }) => ({ title, url })), null, 2));
  }
  if (name === "get_article") {
    const path = args.path;
    if (typeof path !== "string" || !path.startsWith("/") || path.startsWith("//") || path.length > 300 || /[?#\\]/.test(path) || path.split("/").includes("..")) throw Error("Provide a relative article path");
    const url = new URL(path, SITE);
    if (url.origin !== SITE) throw Error("Invalid article path");
    const r = await fetch(url.toString(), { signal: AbortSignal.timeout(5000), redirect: "error" });
    if (!r.ok || !(r.headers.get("content-type") || "").includes("text/html")) throw Error("Article not found");
    const html = (await r.text()).slice(0, 180000);
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html;
    const body = main.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim().slice(0, 16000);
    return textResult(JSON.stringify({ url: url.toString(), text: body }, null, 2));
  }
  throw Error("Unknown tool");
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      // The API and MCP share the same per-IP rate-limit binding.
      if (env?.MCP_RATE_LIMITER) {
        const key = request.headers.get("cf-connecting-ip") || "unknown";
        const { success } = await env.MCP_RATE_LIMITER.limit({ key });
        if (!success) return apiJson({ error: "Rate limit exceeded. Try again shortly." }, 429, { "retry-after": "60" });
      }
      try { return await apiResponse(request, url); }
      catch (e) {
        const message = e instanceof Error ? e.message : "Request failed";
        const invalid = /^(Invalid|Provide|DNS returned status)/.test(message);
        return apiJson({ error: invalid ? message : "Upstream lookup failed" }, invalid ? 400 : 502);
      }
    }
    if (url.pathname === "/" && request.method === "GET") return json({ service: "howto.email MCP", endpoint: "/mcp", tools: tools.map(t => t.name) });
    if (url.pathname !== "/mcp") return new Response("Not found", { status: 404 });
    if (request.method === "GET") return new Response("This stateless MCP endpoint accepts POST requests.", { status: 405, headers: { allow: "POST, OPTIONS" } });
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { allow: "POST, OPTIONS" } });
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
    // Public tools are throttled per client IP at each Cloudflare location.
    // Shared IPs may share a quota; this is abuse mitigation, not a hard global cap.
    if (env?.MCP_RATE_LIMITER) {
      const key = request.headers.get("cf-connecting-ip") || "unknown";
      const { success } = await env.MCP_RATE_LIMITER.limit({ key });
      if (!success) return json({ error: "Rate limit exceeded. Try again shortly." }, 429, { "retry-after": "60" });
    }
    if (!(request.headers.get("content-type") || "").toLowerCase().includes("application/json")) return json({ error: "JSON required" }, 415);
    const len = Number(request.headers.get("content-length") || 0);
    if (len > 8192) return json({ error: "Request too large" }, 413);
    let message;
    try { const raw = await request.text(); if (raw.length > 8192) return json({ error: "Request too large" }, 413); message = JSON.parse(raw); } catch { return json({ error: "Invalid JSON" }, 400); }
    if (!message || message.jsonrpc !== "2.0" || typeof message.method !== "string") return json({ jsonrpc: "2.0", id: message?.id ?? null, error: { code: -32600, message: "Invalid request" } }, 400);
    if (message.id === undefined) return new Response(null, { status: 202 });
    const id = message.id;
    let result;
    try {
      switch (message.method) {
        case "initialize": result = { protocolVersion: VERSION, capabilities: { tools: { listChanged: false } }, serverInfo: { name: "howto-email-mcp", version: "1.0.0" } }; break;
        case "ping": result = {}; break;
        case "tools/list": result = { tools }; break;
        case "tools/call": {
          const name = message.params?.name;
          if (!tools.some(t => t.name === name)) throw Error("Unknown tool");
          result = await execute(name, message.params?.arguments || {});
          break;
        }
        default: return json({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } });
      }
      return json({ jsonrpc: "2.0", id, result }, 200, { "mcp-protocol-version": VERSION });
    } catch (e) {
      if (message.method === "tools/call") return json({ jsonrpc: "2.0", id, result: errorResult(e instanceof Error ? e.message : "Tool failed") });
      return json({ jsonrpc: "2.0", id, error: { code: -32603, message: "Internal error" } });
    }
  }
};
