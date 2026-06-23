// Tool registry + command resolution. The registry is extracted from the
// official dataforseo-mcp-server tool definitions (see extract.mjs).
import registry from "../registry.json" with { type: "json" };

type CoreType = "array" | "boolean" | "enum" | "number" | "object" | "string";

interface PathTemplate {
  template: string;
  vars: readonly string[];
}

/** Registry metadata for one CLI/API parameter. */
export interface Param {
  name: string;
  coreType: CoreType;
  elementType?: string;
  enumValues?: readonly string[];
  defaultValue?: unknown;
  nullable?: boolean;
  optional: boolean;
  description: string;
}

/** CLI-facing metadata for one generated DataForSEO endpoint. */
export interface Tool {
  name: string; // MCP snake_case name
  title: string;
  description: string;
  module: string;
  endpoint: string | null;
  method: string;
  pathTemplate?: PathTemplate | null;
  params: readonly Param[];
}

/** Parsed shape of the generated registry.json file. */
export interface Registry {
  count: number;
  generatedAt: string;
  sourceVersion: string;
  tools: readonly Tool[];
}

const REGISTRY = parseRegistry(registry);
/** All validated DataForSEO tools loaded from registry.json. */
export const TOOLS: readonly Tool[] = REGISTRY.tools;

// --- friendly command aliases ---------------------------------------------
// Short ergonomic names for the highest-traffic tools. Any tool can also be
// called by its full snake_case name or kebab-case equivalent.
/** Human-friendly command aliases mapped to generated tool names. */
export const ALIASES: Readonly<Record<string, string>> = {
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

/** Returns the available DataForSEO module names in display order. */
export function modules(): string[] {
  return [...new Set(TOOLS.map((t) => t.module))].sort();
}

/** Returns tools for one module, or every tool when no module is provided. */
export function listTools(moduleFilter?: string): Tool[] {
  return moduleFilter
    ? TOOLS.filter((t) => t.module === moduleFilter)
    : [...TOOLS];
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
    const country =
      args.country === undefined ? undefined : coerce(getParam(tool, "country"), args.country);
    const c = country === undefined ? "" : `/${encodeURIComponent(String(country))}`;
    return { path: `/v3/merchant/amazon/locations${c}`, method: "GET" };
  }
  if (tool.pathTemplate) {
    let path = tool.pathTemplate.template;
    for (const v of tool.pathTemplate.vars) {
      const p = getParam(tool, v);
      const val = args[v] ?? p.defaultValue;
      if (val === undefined || val === null) {
        throw new Error(
          `Templated path requires --${v.replace(/_/g, "-")} for "${tool.name}"`,
        );
      }
      path = path.replace(`{${v}}`, encodeURIComponent(String(coerce(p, val))));
    }
    return { path, method: patch?.method ?? tool.method };
  }
  const endpoint = patch?.path ?? tool.endpoint;
  if (endpoint === null) {
    throw new Error(`Tool "${tool.name}" has no endpoint or path template`);
  }
  return { path: endpoint, method: patch?.method ?? tool.method };
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
  if (v === null) {
    if (p.nullable === true) {
      return null;
    }
    throw new Error(`--${p.name.replace(/_/g, "-")} does not accept null`);
  }

  switch (p.coreType) {
    case "string":
      if (typeof v !== "string") {
        throw new Error(`--${p.name.replace(/_/g, "-")} must be a string`);
      }
      return v;
    case "number": {
      if (typeof v === "number") {
        if (!Number.isFinite(v)) {
          throw new Error(`--${p.name.replace(/_/g, "-")} must be a finite number`);
        }
        return v;
      }
      if (typeof v !== "string" || v.trim() === "") {
        throw new Error(`--${p.name.replace(/_/g, "-")} must be a finite number`);
      }
      const parsed = Number(v);
      if (!Number.isFinite(parsed)) {
        throw new Error(`--${p.name.replace(/_/g, "-")} must be a finite number`);
      }
      return parsed;
    }
    case "boolean": {
      if (typeof v === "boolean") return v;
      if (typeof v !== "string") {
        throw new Error(`--${p.name.replace(/_/g, "-")} must be a boolean`);
      }
      if (/^(1|true|yes|on)$/i.test(v)) return true;
      if (/^(0|false|no|off)$/i.test(v)) return false;
      throw new Error(`--${p.name.replace(/_/g, "-")} must be a boolean`);
    }
    case "array":
      if (!Array.isArray(v)) {
        throw new Error(`--${p.name.replace(/_/g, "-")} must be an array`);
      }
      return v;
    case "object":
      if (!isRecord(v)) {
        throw new Error(`--${p.name.replace(/_/g, "-")} must be a JSON object`);
      }
      return v;
    case "enum":
      if (typeof v !== "string") {
        throw new Error(`--${p.name.replace(/_/g, "-")} must be a string enum value`);
      }
      if (p.enumValues !== undefined && p.enumValues.length > 0 && !p.enumValues.includes(v)) {
        throw new Error(
          `--${p.name.replace(/_/g, "-")} must be one of: ${p.enumValues.join(", ")}`,
        );
      }
      return v;
    default:
      throw new Error(`Unsupported param type for --${p.name.replace(/_/g, "-")}: ${p.coreType}`);
  }
}

/** Names of params that are required (no default, not optional). */
export function requiredParams(tool: Tool): Param[] {
  return tool.params.filter((p) => !p.optional && p.defaultValue === undefined);
}

function getParam(tool: Tool, name: string): Param {
  const param = tool.params.find((p) => p.name === name);
  if (param === undefined) {
    throw new Error(`Registry error: "${tool.name}" is missing param "${name}"`);
  }
  return param;
}

function parseRegistry(value: unknown): Registry {
  const record = requireRecord(value, "registry");
  const tools = requireArray(record.tools, "registry.tools").map(parseTool);
  const count = requireNumber(record.count, "registry.count");
  if (count !== tools.length) {
    throw new Error(`Registry count mismatch: count=${count}, tools=${tools.length}`);
  }
  return {
    count,
    generatedAt: requireString(record.generatedAt, "registry.generatedAt"),
    sourceVersion: requireString(record.sourceVersion, "registry.sourceVersion"),
    tools,
  };
}

function parseTool(value: unknown, index: number): Tool {
  const context = `registry.tools[${index}]`;
  const record = requireRecord(value, context);
  return {
    name: requireString(record.name, `${context}.name`),
    title: requireString(record.title, `${context}.title`),
    description: requireString(record.description, `${context}.description`),
    module: requireString(record.module, `${context}.module`),
    endpoint: parseNullableString(record.endpoint, `${context}.endpoint`),
    method: requireString(record.method, `${context}.method`),
    pathTemplate: parsePathTemplate(record.pathTemplate, `${context}.pathTemplate`),
    params: requireArray(record.params, `${context}.params`).map((param, paramIndex) =>
      parseParam(param, `${context}.params[${paramIndex}]`),
    ),
  };
}

function parseParam(value: unknown, context: string): Param {
  const record = requireRecord(value, context);
  const param: Param = {
    name: requireString(record.name, `${context}.name`),
    coreType: parseCoreType(record.coreType, `${context}.coreType`),
    optional: requireBoolean(record.optional, `${context}.optional`),
    description: requireString(record.description, `${context}.description`),
  };

  if (record.elementType !== undefined) {
    param.elementType = requireString(record.elementType, `${context}.elementType`);
  }
  if (record.enumValues !== undefined) {
    param.enumValues = requireStringArray(record.enumValues, `${context}.enumValues`);
  }
  if (record.defaultValue !== undefined) {
    param.defaultValue = record.defaultValue;
  }
  if (record.nullable !== undefined) {
    param.nullable = requireBoolean(record.nullable, `${context}.nullable`);
  }
  return param;
}

function parsePathTemplate(value: unknown, context: string): PathTemplate | null | undefined {
  if (value === undefined || value === null) {
    return value;
  }
  const record = requireRecord(value, context);
  return {
    template: requireString(record.template, `${context}.template`),
    vars: requireStringArray(record.vars, `${context}.vars`),
  };
}

function parseCoreType(value: unknown, context: string): CoreType {
  const coreType = requireString(value, context);
  switch (coreType) {
    case "array":
    case "boolean":
    case "enum":
    case "number":
    case "object":
    case "string":
      return coreType;
    default:
      throw new Error(`${context} has unsupported param type: ${coreType}`);
  }
}

function parseNullableString(value: unknown, context: string): string | null {
  if (value === null) {
    return null;
  }
  return requireString(value, context);
}

function requireString(value: unknown, context: string): string {
  if (typeof value !== "string") {
    throw new Error(`${context} must be a string`);
  }
  return value;
}

function requireNumber(value: unknown, context: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${context} must be a finite number`);
  }
  return value;
}

function requireBoolean(value: unknown, context: string): boolean {
  if (typeof value !== "boolean") {
    throw new Error(`${context} must be a boolean`);
  }
  return value;
}

function requireArray(value: unknown, context: string): unknown[] {
  if (!Array.isArray(value)) {
    throw new Error(`${context} must be an array`);
  }
  return value;
}

function requireStringArray(value: unknown, context: string): string[] {
  const items = requireArray(value, context);
  return items.map((item, index) => requireString(item, `${context}[${index}]`));
}

function requireRecord(value: unknown, context: string): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new Error(`${context} must be an object`);
  }
  return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
