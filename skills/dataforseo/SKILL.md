---
name: dataforseo
description: Use the installed DataForSEO API CLI (`d4s`, npm package dataforseo-api-cli) for live DataForSEO SEO and AI visibility data including keyword volume, keyword difficulty, keyword ideas, related keywords, SERP checks, rankings, domain competitors, backlinks, referring domains, Lighthouse audits, on-page audits, DataForSEO Labs, AI Optimization, ChatGPT scraper, LLM mentions, top cited domains, and top cited pages. Triggers include search volume, keyword research, SERP, SEO API, competitor analysis, backlink audit, AI visibility, LLM visibility, LLM mentions, ChatGPT visibility, and DataForSEO.
---

# DataForSEO API CLI (`d4s`)

Use `d4s` when a task needs live DataForSEO data. The CLI makes direct HTTPS
requests to DataForSEO, uses the caller's DataForSEO account, and does not need
the MCP server at runtime.

The bundled package currently ships a committed registry with 84 endpoints
generated from `dataforseo-mcp-server@2.9.9`. If endpoint coverage is important
for the answer, confirm with `d4s list` or `registry.json` instead of relying on
memory.

## Install and Check

```bash
npm install -g dataforseo-api-cli
d4s --version
d4s list
```

Local repo install is also valid:

```bash
npm install -g .
```

Requires Node.js 18 or newer.

## Credentials

`d4s` resolves DataForSEO credentials in this order:

1. `--username login@you --password SECRET`
2. `DATAFORSEO_USERNAME` and `DATAFORSEO_PASSWORD`
3. Env file, defaulting to `~/.config/dataforseo/env`

Default env file format:

```sh
export DATAFORSEO_USERNAME='login@you'
export DATAFORSEO_PASSWORD='your-api-password'
```

The default env file is optional. If `--env-file PATH` or
`DATAFORSEO_ENV_FILE` is set, that file must exist and contain valid
`export KEY='value'` lines. Do not print credentials in responses, logs, or
examples.

## Operating Rules

- Before using an unfamiliar endpoint, run `d4s help <command>` and use the
  required params shown there.
- Live calls may be billable. Run them only when the user asked for live
  DataForSEO data or the task clearly requires it.
- Keep queries narrow: use small keyword lists, `--limit`, `--depth`, filters,
  and exact targets when the endpoint supports them.
- Use aliases from `d4s list`, or the full snake_case tool name.
- Do not invent flags. CLI flags are kebab-case versions of registry params.
- Use JSON for structured arrays/objects, for example
  `--target '[{"keyword":"p0420"}]'`.
- Mention that results are from live DataForSEO data when reporting API output.

## Tool Selection

Use this map to choose the first command, then run `d4s help <command>` before
calling it if the params are not already obvious.

- Keyword demand: use `volume` for Google Ads volume, `keyword-overview` for
  volume plus organic difficulty, intent, and CPC, `difficulty` for bulk organic
  difficulty, `search-intent` for intent classification, and `top-searches` or
  `trends`/`google-trends` for broader demand research.
- Keyword expansion: use `ideas` for adjacent terms, `related` for SERP-related
  terms, `suggestions` for phrase variants containing the seed, and
  `keywords-for-site` for keywords relevant to a known domain.
- SERP and ranking analysis: use `serp` for live Google results,
  `serp-youtube` for YouTube SERPs, `ranked-keywords` for a domain's ranking
  keywords, `serp-competitors` for competitors on a keyword set, and
  `historical-ranks` or the full `dataforseo_labs_google_historical_serps`
  command when historical context is needed.
- Competitor and market analysis: use `competitors` for domains competing with
  a target, `domain-intersection` or `page-intersection` for overlap analysis,
  `rank-overview` for domain-level ranking metrics, and `traffic-estimation`
  for bulk traffic estimates.
- Backlink analysis: use `backlinks` for summary metrics, `referring-domains`
  for source domains, `backlinks-list` for individual backlinks,
  `backlinks-anchors` for anchor text, `backlinks-competitors` for link
  competitors, and `bulk-*` backlinks commands for comparing many targets.
- Technical and on-page SEO: use `lighthouse` for performance/accessibility SEO
  audits, `onpage-instant` for page-level on-page checks, and `onpage-content`
  for parsed page content.
- AI visibility: use `ai-volume` for AI keyword demand, `llm-mentions` for
  pages mentioned by LLM answers, `llm-mentions-domains` for cited domains,
  `llm-mentions-pages` for cited pages, `llm-mentions-metrics` for aggregate
  metrics, `llm-mentions-cross` for comparing targets, `chatgpt-scraper` for a
  live ChatGPT-style answer, and `llm-response`/`llm-models` when the user asks
  for model-specific LLM response checks.
- Entity and commerce research: use `whois` and `technologies` for domain
  intelligence, `business-search` for local/business listings, `content-search`
  for content analysis, and `amazon`, `amazon-search`, or `amazon-sellers` for
  Amazon merchant data.

## Workflow Recipes

- Keyword opportunity check: run `keyword-overview` for the seed terms, then
  `difficulty` if many keywords need organic difficulty, then `serp` with low
  `--depth` for the strongest candidate terms. Summarize volume, organic
  difficulty, intent, CPC, and visible SERP competitors separately.
- Niche or content cluster expansion: start with `ideas`, `related`, and
  `suggestions` using low `--limit` values. Use `keyword-overview` on the
  shortlist, then group by intent and difficulty in the final answer.
- Competitor domain audit: run `ranked-keywords`, `competitors`, and
  `keywords-for-site` for the target. Add `backlinks` and `referring-domains`
  only when backlink data is requested or clearly useful.
- Backlink gap analysis: compare `backlinks` summaries first. If more detail is
  needed, use `referring-domains`, `backlinks-list`, `backlinks-anchors`, and
  `backlinks-domain-intersection` with narrow limits.
- AI visibility gap check: run `llm-mentions` for the keyword or target domain,
  then `llm-mentions-domains` and `llm-mentions-pages` to identify cited
  competitors. Use `llm-mentions-cross` when comparing multiple brands or
  domains.
- Page-level SEO audit: run `lighthouse` for technical signals and
  `onpage-instant` or `onpage-content` when the user asks for page content,
  HTML, headings, or extractable on-page signals.

## Common Commands

```bash
# Keyword research
d4s volume --keywords "p0420,p0171,p0300" --language-code en --tsv
d4s keyword-overview --keywords "p0420 code" --tsv
d4s difficulty --keywords "p0420,p0171" --tsv
d4s ideas --keywords "obd2 codes" --limit 10 --tsv
d4s related --keyword "p0420" --limit 10 --tsv
d4s suggestions --keyword "check engine light" --limit 10 --tsv

# SERP
d4s serp --keyword "p0420 code" --lang en --depth 10 --tsv
d4s serp-youtube --keyword "p0420" --location-name "United States" --language-code en --tsv

# Competitors and site analysis
d4s ranked-keywords --target "obd-codes.com" --tsv
d4s competitors --target "obd-codes.com"
d4s keywords-for-site --target "obd-codes.com" --limit 10 --tsv

# Backlinks, requiring DataForSEO Backlinks subscription
d4s backlinks --target "obd-codes.com"
d4s referring-domains --target "obd-codes.com" --limit 10 --tsv

# On-page technical SEO
d4s lighthouse --url "https://www.obd-codes.com/p0420"

# AI Optimization / LLM visibility, requiring DataForSEO AI Optimization subscription
d4s ai-volume --keywords "p0420,p0171" --language-code en --tsv
d4s llm-mentions --target '[{"keyword":"p0420"}]' --limit 10
d4s llm-mentions-domains --target '[{"keyword":"p0420"}]' --items-list-limit 10
d4s llm-mentions-pages --target '[{"domain":"obd-codes.com"}]' --items-list-limit 10
d4s chatgpt-scraper --keyword "best scanner for p0420" --language-code en
```

## Parameter Patterns

- Scalars: `--keyword "p0420 code"` or `--depth 10`
- String arrays: `--keywords a,b,c` or repeated flags like
  `--keywords a --keywords b`
- Object arrays: `--target '[{"keyword":"p0420"}]'`
- Boolean true: `--include-subdomains`
- Boolean false: `--no-include-subdomains`
- Shortcuts: `--location "United States"` maps to `--location-name`;
  `--lang en` maps to `--language-code`

Required params are validated before the request. Defaults from the bundled
registry are applied automatically.

## Output

- Default output is pretty JSON for `tasks[0].result`.
- `--tsv` returns tab-separated output for spreadsheet and shell pipelines.
- `--raw` returns the full DataForSEO response envelope.
- `D4S_DEBUG=1` prints request method, path, and body to stderr. Use it only for
  troubleshooting; it does not print auth headers, but request bodies can still
  contain sensitive query data.

## Errors and Caveats

- Backlinks and AI Optimization endpoints require the matching DataForSEO
  subscriptions. DataForSEO `40204` errors usually mean the subscription or API
  feature is not active.
- `competition` and `cpc` are advertiser metrics. For organic SEO difficulty,
  use `keyword-overview` (`keyword_difficulty`) or `difficulty`.
- Output schemas follow live DataForSEO responses and may change. Use `--raw`
  or `--json` when a curated TSV column is missing.
