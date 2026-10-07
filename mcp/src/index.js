// Public, stateless, read-only MCP server for howto.email.
// No database, API keys, or paid services required.
const SITE = "https://howto.email";
const VERSION = "2025-03-26";
const tools = [
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
async function articlePaths() {
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
  return [...new Set(pages)];
}
async function execute(name, args) {
  if (name === "check_spf" || name === "check_dmarc") {
    const domain = domainName(args.domain);
    const host = name === "check_dmarc" ? "_dmarc." + domain : domain;
    const records = (await lookup(host, "TXT")).filter(v => name === "check_dmarc" ? /^v=DMARC1(?:;|$)/i.test(v) : /^v=spf1(?:\s|$)/i.test(v));
    return textResult(JSON.stringify({ domain, host, records, found: records.length > 0, note: "DNS TXT lookup only; not a complete authentication audit." }, null, 2));
  }
  if (name === "search_articles") {
    const query = String(args.query || "").trim().toLowerCase().slice(0, 100);
    if (!query) throw Error("Search query required");
    const words = query.split(/\s+/).filter(Boolean);
    const matches = (await articlePaths()).filter(p => words.some(w => decodeURIComponent(p).toLowerCase().includes(w))).slice(0, 15);
    return textResult(JSON.stringify(matches.map(p => ({ title: p.split("/").filter(Boolean).at(-1)?.replace(/-/g, " ") || "Home", url: SITE + p })), null, 2));
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
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/" && request.method === "GET") return json({ service: "howto.email MCP", endpoint: "/mcp", tools: tools.map(t => t.name) });
    if (url.pathname !== "/mcp") return new Response("Not found", { status: 404 });
    if (request.method === "GET") return new Response("This stateless MCP endpoint accepts POST requests.", { status: 405, headers: { allow: "POST, OPTIONS" } });
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { allow: "POST, OPTIONS" } });
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
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
