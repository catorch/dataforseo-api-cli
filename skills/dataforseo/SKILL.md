---
name: dataforseo
description: Full DataForSEO SEO/AI-visibility API via the `d4s` CLI — 84 endpoints covering keyword search volume, keyword difficulty, keyword ideas/related/suggestions, live Google + YouTube SERP, backlinks & referring domains, on-page Lighthouse audits, domain competitors, and 2026 LLM/AI mention tracking (how often a domain/keyword appears in ChatGPT & AI answers). Use for ANY keyword research, SEO sizing, niche validation, competitor analysis, SERP difficulty checks, backlink audits, or tracking visibility in AI search. Triggers: search volume, keyword volume, keyword difficulty, keyword research, keyword ideas, related keywords, SERP, rankings, competitor research, backlinks, referring domains, lighthouse, on-page, AI visibility, LLM mentions, DataForSEO.
license: MIT
---

# DataForSEO (`d4s` CLI)

A single zero-dependency `d4s` CLI wraps the **entire DataForSEO REST API** (84 endpoints) — direct HTTP, no MCP server required. Covers keywords, SERP, backlinks, on-page, competitors, and the **2026 LLM/AI-mentions module** (track how often domains/keywords appear in ChatGPT / AI answers).

## Setup (one-time)

1. Install the CLI: `npm install -g dataforseo-api-cli` (or clone + `npm install -g .`).
2. Add credentials to `~/.config/dataforseo/env` (chmod 600):

```sh
export DATAFORSEO_USERNAME='login@you'
export DATAFORSEO_PASSWORD='your-api-password'
```

(Credentials can also come from `DATAFORSEO_USERNAME` / `DATAFORSEO_PASSWORD` env vars or `--username` / `--password` flags.)

## Usage

```bash
d4s <command> [--params-as-flags] [--tsv | --json | --raw]
d4s list [module]            # list all 84 tools / tools in a module
d4s help <command>           # show params for a command
```

Every command also accepts the full snake_case tool name from `d4s list`.

### Common commands

```bash
# Keyword research
d4s volume --keywords "p0420,p0171,p0300" --tsv                 # Google Ads search volume
d4s keyword-overview --keywords "p0420 code" --tsv               # volume + difficulty + intent + CPC
d4s difficulty --keywords "p0420,p0171" --tsv                    # bulk organic difficulty
d4s ideas --keywords "obd2 codes" --tsv                          # keyword ideas
d4s related --keyword "p0420" --tsv                              # related keywords
d4s suggestions --keyword "check engine light" --tsv             # suggestions

# SERP
d4s serp --keyword "p0420 code" --lang en --tsv                  # live Google SERP (+ AI Overview)
d4s serp-youtube --keyword "p0420" --location-name "United States" --language-code en --tsv

# Competitors & site analysis
d4s ranked-keywords --target "obd-codes.com" --tsv               # keywords a domain ranks for
d4s competitors --target "obd-codes.com"                         # domain competitors
d4s keywords-for-site --target "obd-codes.com" --tsv             # keyword gaps

# Backlinks (requires DataForSEO backlinks subscription)
d4s backlinks --target "obd-codes.com"
d4s referring-domains --target "obd-codes.com" --tsv

# On-page technical SEO
d4s lighthouse --url "https://obd-codes.com/p0420"               # Google Lighthouse audit

# 2026 — AI/LLM visibility (requires DataForSEO AI Optimization subscription)
d4s llm-mentions-search --target '[{"keyword":"p0420"}]' --limit 10   # mentions in AI answers
d4s llm-mentions-domains --keyword "p0420"                           # top domains cited by LLMs
```

### Passing parameters

- Scalars: `--keyword "p0420 code"` `--depth 100`
- Arrays of strings: `--keywords a,b,c` (comma-split) or repeatable `--keywords a --keywords b`
- Arrays of objects (e.g. LLM-mentions targets): pass JSON — `--target '[{"keyword":"p0420"}]'`
- Booleans: `--include-subdomains` (true) or `--no-include-subdomains` (false)
- Global shortcuts: `--location "United States"` and `--lang en` map to the tool's location/language fields
- Defaults from DataForSEO are applied automatically; required params are validated

### Output

- Default: pretty JSON of `tasks[0].result`
- `--tsv`: tab-separated view (curated columns for list-shaped tools; generic for others) — pipe into `column -t` or spreadsheets
- `--raw`: full raw API response envelope

## Notes

- `d4s list` shows every command, alias, endpoint, and required params. Start there.
- Some modules (backlinks, AI Optimization) need their subscriptions activated in your DataForSEO account — the CLI surfaces those `40204` errors clearly.
- `competition` / `cpc` fields are **advertiser** metrics; for organic difficulty use `keyword-overview` (keyword_difficulty) or `difficulty`.
