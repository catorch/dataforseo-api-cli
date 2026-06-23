// Tool registry + command resolution. The registry is extracted from the
// official dataforseo-mcp-server tool definitions (see extract.mjs).
import registry from "../registry.json" with { type: "json" };

export interface Param {
  name: string;
  coreType: string; // string | boolean | number | array | enum | ...
  elementType?: string; // for arrays
  enumValues?: string[];
  defaultValue?: unknown;
  nullable?: boolean;
  optional: boolean;
  description: string;
}
export interface Tool {
  name: string; // MCP snake_case name
  title: string;
  description: string;
  module: string;
  endpoint: string | null;
  method: string;
  pathTemplate?: { template: string; vars: string[] } | null;
  params: Param[];
}
export interface Registry {
  count: number;
  generatedAt: string;
  sourceVersion: string;
  tools: Tool[];
}

export const TOOLS: Tool[] = (registry as Registry).tools;

// --- friendly command aliases ---------------------------------------------
// Short ergonomic names for the highest-traffic tools. Any tool can also be
// called by its full snake_case name or kebab-case equivalent.
export const ALIASES: Record<string, string> = {
  // keywords
  volume: "kw_data_google_ads_search_volume",
  "search-volume": "kw_data_google_ads_search_volume",
  "keyword-overview": "dataforseo_labs_google_keyword_overview",
  difficulty: "dataforseo_labs_bulk_keyword_difficulty",
  "keyword-difficulty": "dataforseo_labs_bulk_keyword_difficulty",
  ideas: "dataforseo_labs_google_keyword_ideas",
  "keyword-ideas": "dataforseo_labs_google_keyword_ideas",
  suggestions: "dataforseo_labs_google_keyword_suggestions",
  related: "dataforseo_labs_google_related_keywords",
  "related-keywords": "dataforseo_labs_google_related_keywords",
  "keywords-for-site": "dataforseo_labs_google_keywords_for_site",
  "ranked-keywords": "dataforseo_labs_google_ranked_keywords",
  "search-intent": "dataforseo_labs_search_intent",
  "top-searches": "dataforseo_labs_google_top_searches",
  "historical-keywords": "dataforseo_labs_google_historical_keyword_data",
  "traffic-estimation": "dataforseo_labs_bulk_traffic_estimation",
  // trends
  trends: "kw_data_dfs_trends_explore",
  "dataforseo-trends": "kw_data_dfs_trends_explore",
  "trends-demography": "kw_data_dfs_trends_demography",
  "trends-subregions": "kw_data_dfs_trends_subregion_interests",
  "google-trends": "kw_data_google_trends_explore",
  "google-trends-categories": "kw_data_google_trends_categories",
  // serp
  serp: "serp_organic_live_advanced",
  "serp-youtube": "serp_youtube_organic_live_advanced",
  "youtube-video": "serp_youtube_video_info_live_advanced",
  "serp-locations": "serp_locations",
  // competitors
  competitors: "dataforseo_labs_google_competitors_domain",
  "domain-competitors": "dataforseo_labs_google_competitors_domain",
  "serp-competitors": "dataforseo_labs_google_serp_competitors",
  "domain-intersection": "dataforseo_labs_google_domain_intersection",
  "page-intersection": "dataforseo_labs_google_page_intersection",
  "rank-overview": "dataforseo_labs_google_domain_rank_overview",
  "historical-ranks": "dataforseo_labs_google_historical_rank_overview",
  // backlinks
  backlinks: "backlinks_summary",
  "backlinks-summary": "backlinks_summary",
  "backlinks-list": "backlinks_backlinks",
  "backlinks-anchors": "backlinks_anchors",
  "backlinks-referring-domains": "backlinks_referring_domains",
  "backlinks-domain-pages": "backlinks_domain_pages",
  "backlinks-domain-pages-summary": "backlinks_domain_pages_summary",
  "backlinks-page-intersection": "backlinks_page_intersection",
  "backlinks-domain-intersection": "backlinks_domain_intersection",
  "backlinks-competitors": "backlinks_competitors",
  "backlinks-timeseries": "backlinks_timeseries_summary",
  "backlinks-new-lost": "backlinks_timeseries_new_lost_summary",
  "backlinks-referring-networks": "backlinks_referring_networks",
  // bulk backlinks
  "bulk-backlinks": "backlinks_bulk_backlinks",
  "bulk-ranks": "backlinks_bulk_ranks",
  "bulk-spam-score": "backlinks_bulk_spam_score",
  "bulk-referring-domains": "backlinks_bulk_referring_domains",
  "bulk-new-lost-backlinks": "backlinks_bulk_new_lost_backlinks",
  "bulk-new-lost-domains": "backlinks_bulk_new_lost_referring_domains",
  // onpage
  lighthouse: "on_page_lighthouse",
  "onpage-lighthouse": "on_page_lighthouse",
  "onpage-instant": "on_page_instant_pages",
  "onpage-content": "on_page_content_parsing",
  // domain analytics
  whois: "domain_analytics_whois_overview",
  technologies: "domain_analytics_technologies_domain_technologies",
  // merchant
  amazon: "merchant_amazon_asin_live_advanced",
  "amazon-search": "merchant_amazon_products_live_advanced",
  "amazon-sellers": "merchant_amazon_sellers_live_advanced",
  "amazon-locations": "merchant_amazon_locations",
  // business data
  "business-search": "business_data_business_listings_search",
  // content analysis
  "content-search": "content_analysis_search",
  // ai optimization / llm mentions (2026 — track visibility in AI answers)
  "ai-volume": "ai_optimization_keyword_data_search_volume",
  "ai-locations": "ai_opt_kw_data_loc_and_lang",
  "llm-response": "ai_optimization_llm_response",
  "llm-models": "ai_optimization_llm_models",
  "chatgpt-scraper": "ai_optimization_chat_gpt_scraper",
  "llm-mentions": "ai_opt_llm_ment_search",
  "llm-mentions-search": "ai_opt_llm_ment_search",
  "llm-mentions-domains": "ai_opt_llm_ment_top_domains",
  "llm-mentions-pages": "ai_opt_llm_ment_top_pages",
  "llm-mentions-metrics": "ai_opt_llm_ment_agg_metrics",
  "llm-mentions-cross": "ai_opt_llm_ment_cross_agg_metrics",
};

const TOOL_BY_NAME = new Map<string, Tool>(TOOLS.map((t) => [t.name, t]));

/** Resolve a CLI command (alias, snake_case, or kebab-case) to a Tool. */
export function resolveTool(cmd: string): Tool | undefined {
  if (ALIASES[cmd]) return TOOL_BY_NAME.get(ALIASES[cmd]);
  if (TOOL_BY_NAME.has(cmd)) return TOOL_BY_NAME.get(cmd);
  const snake = cmd.replace(/-/g, "_");
  if (TOOL_BY_NAME.has(snake)) return TOOL_BY_NAME.get(snake);
  const kebab = cmd.replace(/_/g, "-");
  if (ALIASES[kebab]) return TOOL_BY_NAME.get(ALIASES[kebab]);
  return undefined;
}

export function modules(): string[] {
  return [...new Set(TOOLS.map((t) => t.module))].sort();
}

export function listTools(moduleFilter?: string): Tool[] {
  return moduleFilter
    ? TOOLS.filter((t) => t.module === moduleFilter)
    : TOOLS;
}

// --- path resolution -------------------------------------------------------
// Manual patches for known upstream endpoint bugs in dataforseo-mcp-server.
// (Faithfully reproducing a wrong path isn't useful; these are verified correct.)
const ENDPOINT_PATCH: Record<string, { path?: string; method?: string }> = {
  // upstream uses /categories/live (404); correct DataForSEO path is /categories
  kw_data_google_trends_categories: { path: "/v3/keywords_data/google_trends/categories" },
};

/** Build the final API path + HTTP method for a tool, given resolved args. */
export function resolvePath(
  tool: Tool,
  args: Record<string, unknown>,
): { path: string; method: string } {
  const patch = ENDPOINT_PATCH[tool.name];
  // string-concat templated tool not caught by extractor
  if (tool.name === "merchant_amazon_locations") {
    const c = args.country ? `/${encodeURIComponent(String(args.country))}` : "";
    return { path: `/v3/merchant/amazon/locations${c}`, method: "GET" };
  }
  if (tool.pathTemplate) {
    let path = tool.pathTemplate.template;
    for (const v of tool.pathTemplate.vars) {
      const p = tool.params.find((p) => p.name === v);
      let val = args[v] ?? p?.defaultValue;
      if (val === undefined || val === null) {
        throw new Error(
          `Templated path requires --${v.replace(/_/g, "-")} for "${tool.name}"`,
        );
      }
      path = path.replace(`{${v}}`, encodeURIComponent(String(val)));
    }
    return { path, method: patch?.method ?? tool.method };
  }
  return { path: patch?.path ?? tool.endpoint!, method: patch?.method ?? tool.method };
}

// --- payload building ------------------------------------------------------
/** Apply defaults + coerce types + drop undefined → task object for POST body. */
export function buildPayload(
  tool: Tool,
  provided: Record<string, unknown>,
): Record<string, unknown> {
  const task: Record<string, unknown> = {};
  for (const p of tool.params) {
    let v: unknown = provided[p.name];
    if (v === undefined) {
      if (p.defaultValue !== undefined && p.defaultValue !== null) {
        v = p.defaultValue;
      } else {
        continue; // omit optional params not provided (matches MCP conditional inclusion)
      }
    }
    task[p.name] = coerce(p, v);
  }
  return task;
}

function coerce(p: Param, v: unknown): unknown {
  switch (p.coreType) {
    case "number": {
      const n = Number(v);
      return Number.isFinite(n) ? n : v;
    }
    case "boolean": {
      if (typeof v === "boolean") return v;
      if (typeof v === "string") return /^(1|true|yes|on)$/i.test(v);
      return Boolean(v);
    }
    case "array":
      return Array.isArray(v) ? v : v === undefined ? [] : [v];
    default:
      return v;
  }
}

/** Names of params that are required (no default, not optional). */
export function requiredParams(tool: Tool): Param[] {
  return tool.params.filter((p) => !p.optional && p.defaultValue === undefined);
}
