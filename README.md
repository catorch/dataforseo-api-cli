# d4s — DataForSEO CLI

A single, zero-dependency CLI for the **full DataForSEO REST API** — **84 endpoints** covering keyword research, SERP, backlinks, on-page audits, competitors, and the **2026 LLM/AI-mentions module** (track how often domains/keywords appear in ChatGPT & AI answers).

Direct HTTPS calls — **no MCP server required.** Works as a standalone CLI and as a [pi](https://github.com/badlogic/pi-coding-agent) / Codex agent skill.

> The endpoint definitions are extracted from the official [`dataforseo-mcp-server`](https://github.com/dataforseo/mcp-server-typescript) (Apache-2.0), so coverage tracks the MCP server without the MCP transport overhead.

## Why

The official DataForSEO MCP server is great inside MCP-aware agents (Claude Code, Codex), but:
- many agent harnesses (e.g. **pi**) have **no MCP support by design**,
- MCP adds a stdio handshake + process spawn per call,
- sometimes you just want `d4s volume --keywords p0420` in a shell script or CI.

`d4s` gives you the same 84 endpoints as a plain CLI, pipeable, scriptable, and auto-loadable as an agent skill.

## Install

### Option A — npm (recommended)

```bash
npm install -g dataforseo-cli
```

### Option B — git clone (zero-build — `dist/` is committed)

```bash
git clone https://github.com/YOU/dataforseo-cli.git
cd dataforseo-cli
npm install -g .          # links the `d4s` binary
```

### Option C — as a pi / Codex skill

Add this repo (or its npm package) to your agent's skill paths. The bundled `skills/dataforseo/SKILL.md` auto-loads. The agent then calls the installed `d4s` binary via bash.

Requires **Node ≥ 18** (uses native `fetch`).

## Credentials

Any of:

1. **Flags:** `--username login@you --password SECRET`
2. **Env vars:** `DATAFORSEO_USERNAME` / `DATAFORSEO_PASSWORD`
3. **File** (default `~/.config/dataforseo/env`, chmod 600):
   ```sh
   export DATAFORSEO_USERNAME='login@you'
   export DATAFORSEO_PASSWORD='your-api-password'
   ```
   Override the path with `--env-file PATH` or `DATAFORSEO_ENV_FILE`.

Get credentials at [app.dataforseo.com](https://app.dataforseo.com). Some modules (Backlinks, AI Optimization) require their subscriptions to be activated.

## Usage

```bash
d4s <command> [--params-as-flags] [--tsv | --json | --raw]
d4s list [module]            # list all 84 tools / one module
d4s help <command>           # show params + endpoint for a command
d4s --version
```

Every command accepts its full snake_case name (`d4s kw_data_google_ads_search_volume ...`) or a short alias.

### Cheat sheet

| Want | Command |
|---|---|
| Search volume for keywords | `d4s volume --keywords "a,b,c" --tsv` |
| Volume + difficulty + intent + CPC | `d4s keyword-overview --keywords "a,b" --tsv` |
| Bulk organic keyword difficulty | `d4s difficulty --keywords "a,b" --tsv` |
| Keyword ideas / related / suggestions | `d4s ideas --keywords "seed"` · `d4s related --keyword "seed"` · `d4s suggestions --keyword "seed"` |
| Live Google SERP (incl. AI Overview) | `d4s serp --keyword "x" --lang en --tsv` |
| Keywords a domain ranks for | `d4s ranked-keywords --target "example.com" --tsv` |
| Domain competitors | `d4s competitors --target "example.com"` |
| Backlinks summary | `d4s backlinks --target "example.com"` |
| On-page Lighthouse audit | `d4s lighthouse --url "https://example.com"` |
| Mentions in AI/LLM answers (2026) | `d4s llm-mentions-search --target '[{"keyword":"x"}]'` |

### Passing parameters

- **Scalars:** `--keyword "p0420 code"` `--depth 100`
- **Arrays of strings:** `--keywords a,b,c` (comma-split) or repeatable `--keywords a --keywords b`
- **Arrays of objects** (e.g. LLM-mentions targets): pass JSON — `--target '[{"keyword":"p0420"}]'`
- **Booleans:** `--include-subdomains` (true) / `--no-include-subdomains` (false)
- **Shortcuts:** `--location "United States"` and `--lang en` map to the tool's location/language fields
- DataForSEO defaults are applied automatically; required params are validated up front

### Output modes

- **default** — pretty JSON of `tasks[0].result`
- `--tsv` — tab-separated view (curated columns for list-shaped tools; generic for others). Pipe to `column -t` or a spreadsheet.
- `--raw` — full raw API response envelope
- `D4S_DEBUG=1` — print the request method/path/body to stderr

## Modules (84 tools)

| Module | Tools | Highlights |
|---|---:|---|
| `dataforseo-labs` | 21 | keyword-overview, difficulty, ideas, related, suggestions, ranked-keywords, competitors, search-intent, top-searches, traffic-estimation |
| `backlinks` | 20 | summary, backlinks, referring-domains, anchors, competitors, intersections, bulk-* |
| `ai-optimization` | 13 | **LLM-mentions** (search, top-domains, top-pages, metrics), ChatGPT scraper, AI keyword volume |
| `keywords-data` | 7 | Google Ads search volume, DataForSEO/Google Trends |
| `serp` | 7 | Google + YouTube organic, video info, locations |
| `domain-analytics` | 4 | technologies, WHOIS |
| `merchant` | 4 | Amazon ASIN/products/sellers/locations |
| `onpage` | 3 | Lighthouse, instant pages, content parsing |
| `content-analysis` | 3 | content search |
| `business-data-api` | 2 | business listings search |

Run `d4s list` to see every tool, its alias, endpoint, and required params.

## How it works

`extract.mjs` introspects the installed `dataforseo-mcp-server` package (imports each tool class, calls `getName()` / `getDescription()` / `getParams()`, and captures the real `/v3/...` endpoint via a mock client). The result is `registry.json` — a faithful map of all 84 tools. The CLI is a thin generic executor: validate params → build task → POST/GET → format. No per-tool code; adding a new endpoint upstream just needs `npm run extract`.

## Development

```bash
bun run build          # bundle src/*.ts → dist/main.js (single file, zero deps)
npm run extract        # regenerate registry.json from the installed MCP server
./dist/main.js list    # smoke test
```

## Limitations

- A few tools (e.g. `merchant_amazon_locations`) do client-side filtering inside the MCP server; `d4s` returns the raw API result and leaves filtering to your `jq`/TSV pipeline.
- Output schemas follow DataForSEO's live responses, which occasionally change. Curated `--tsv` columns have fallbacks; use `--json` if a column resolves empty.
- Not affiliated with DataForSEO. You pay your own API usage.

## License

MIT. Endpoint/param definitions derived from DataForSEO's public API and the Apache-2.0 `dataforseo-mcp-server`.
