// Output formatting. Default is pretty JSON; --tsv renders tabular views.

// Curated TSV columns for the highest-value list-shaped tools.
// Each entry = [headerRow, accessorRow]; accessorRow uses dotted paths. The
// resolver picks the first accessor set whose values exist on row[0].
interface Curated {
  headers: string[];
  paths: string[];
  rowFilter?: (row: any) => boolean; // drop rows that don't match
}
const CURATED: Record<string, Curated[]> = {
  kw_data_google_ads_search_volume: [
    { headers: ["keyword", "volume", "competition", "low_bid", "high_bid", "cpc"],
      paths: ["keyword", "search_volume", "competition", "low_top_of_page_bid", "high_top_of_page_bid", "cpc"] },
  ],
  dataforseo_labs_google_keyword_overview: [
    { headers: ["keyword", "volume", "difficulty", "cpc", "competition", "intent"],
      paths: ["keyword", "keyword_info.search_volume", "keyword_properties.keyword_difficulty", "keyword_info.cpc", "keyword_info.competition", "search_intent_info.main_intent"] },
    { headers: ["keyword", "volume", "cpc", "competition"],
      paths: ["keyword", "keyword_info.search_volume", "keyword_info.cpc", "keyword_info.competition"] },
  ],
  dataforseo_labs_bulk_keyword_difficulty: [
    { headers: ["keyword", "difficulty"],
      paths: ["keyword", "keyword_difficulty"] },
  ],
  dataforseo_labs_google_ranked_keywords: [
    { headers: ["keyword", "volume", "rank", "url", "etv"],
      paths: ["keyword", "keyword_info.search_volume", "rank_info.rank_absolute", "rank_info.url", "rank_info.etv"] },
  ],
  serp_organic_live_advanced: [
    { headers: ["rank", "type", "domain", "title", "url", "etv"],
      paths: ["rank_absolute", "type", "domain", "title", "url", "etv"],
      rowFilter: (r) => Boolean(r.url) },
  ],
  backlinks_backlinks: [
    { headers: ["url_from", "url_to", "domain_from", "anchor", "spam_score"],
      paths: ["backlink", "url", "domain_from", "anchor", "spam_score"] },
  ],
  backlinks_referring_domains: [
    { headers: ["domain", "backlinks", "first_seen", "last_seen"],
      paths: ["referring_domain", "backlinks", "first_seen", "last_seen"] },
  ],
  dataforseo_labs_google_keywords_for_site: [
    { headers: ["keyword", "volume", "rank", "cpc"],
      paths: ["keyword", "keyword_info.search_volume", "rank_info.rank_absolute", "cpc"] },
  ],
  dataforseo_labs_google_keyword_ideas: [
    { headers: ["keyword", "volume", "difficulty", "cpc"],
      paths: ["keyword", "keyword_info.search_volume", "keyword_properties.keyword_difficulty", "cpc"] },
  ],
  dataforseo_labs_google_related_keywords: [
    { headers: ["keyword", "volume", "relevance"],
      paths: ["keyword", "keyword_info.search_volume", "relevance"] },
  ],
  dataforseo_labs_google_keyword_suggestions: [
    { headers: ["keyword", "volume", "difficulty", "cpc"],
      paths: ["keyword", "keyword_info.search_volume", "keyword_properties.keyword_difficulty", "cpc"] },
  ],
  serp_youtube_organic_live_advanced: [
    { headers: ["rank", "type", "title", "url", "video_id"],
      paths: ["rank_absolute", "type", "title", "url", "video_id"] },
  ],
};

function getByPath(obj: any, path: string): unknown {
  return path.split(".").reduce((o: any, k) => (o == null ? undefined : o[k]), obj);
}

// Collect arrays of plain objects, tracking the parent key. Returns tuples of
// [rows, wasUnderItems] so callers can prefer DataForSEO's `.items` convention.
const ITEM_KEYS = new Set(["items", "results", "organic_items", "paid_items"]);
function collectArrays(node: any, parentKey: string | null, depth: number, out: { rows: any[][]; underItems: boolean }[]): void {
  if (node == null || depth > 8) return;
  if (Array.isArray(node)) {
    const objs = node.filter((x) => x && typeof x === "object" && !Array.isArray(x));
    if (objs.length) out.push({ rows: objs, underItems: ITEM_KEYS.has(parentKey || "") });
    for (const x of node) collectArrays(x, parentKey, depth + 1, out);
    return;
  }
  if (typeof node === "object")
    for (const [k, v] of Object.entries(node)) collectArrays(v, k, depth + 1, out);
}

// Score a candidate row array: prefer arrays whose elements have many primitive
// fields (i.e. the actual leaf records, not wrapper objects).
function scoreRows(rows: any[]): number {
  let prim = 0;
  for (const v of Object.values(rows[0] || {})) {
    if (v != null && typeof v !== "object") prim++;
  }
  return prim * 100 + Math.min(rows.length, 50);
}

/** Find the best array of plain-object records. Prefers arrays nested under
 *  DataForSEO's `.items` key (flattened), else the richest array found. */
function findRows(node: any): any[] | null {
  const candidates: { rows: any[][]; underItems: boolean }[] = [];
  collectArrays(node, null, 0, candidates);
  if (!candidates.length) return null;

  // Prefer arrays under .items — flatten them into one row list.
  const itemRows = candidates.filter((c) => c.underItems).flatMap((c) => c.rows);
  if (itemRows.length) return itemRows;

  // Otherwise pick the richest array by primitive-field count.
  let best = candidates[0].rows;
  let bestScore = scoreRows(best);
  for (let i = 1; i < candidates.length; i++) {
    const s = scoreRows(candidates[i].rows);
    if (s > bestScore) {
      best = candidates[i].rows;
      bestScore = s;
    }
  }
  return best;
}

export function toTSV(result: any, toolName: string): string {
  const curated = CURATED[toolName];
  let rows: any[] | null = findRows(result);
  let headers: string[] | null = null;
  let paths: string[] | null = null;

  if (curated && rows && rows.length) {
    for (const alt of curated) {
      const filtered = alt.rowFilter ? rows.filter(alt.rowFilter) : rows;
      if (filtered.length && alt.paths.every((p) => getByPath(filtered[0], p) !== undefined)) {
        headers = alt.headers;
        paths = alt.paths;
        rows = filtered;
        break;
      }
    }
    if (!paths) {
      headers = curated[0].headers;
      paths = curated[0].paths;
      if (curated[0].rowFilter) rows = rows.filter(curated[0].rowFilter);
    }
  }
  if (!rows || !rows.length) {
    // single-object result: render as key\tvalue
    if (result && typeof result === "object" && !Array.isArray(result)) {
      const lines = ["key\tvalue"];
      for (const [k, v] of Object.entries(result)) {
        if (v == null || typeof v === "object") continue;
        lines.push(`${k}\t${String(v)}`);
      }
      if (lines.length > 1) return lines.join("\n");
    }
    return JSON.stringify(result, null, 2);
  }

  if (!headers) {
    // generic: union of primitive keys across rows
    const keyset = new Set<string>();
    for (const r of rows.slice(0, 25)) {
      for (const k of Object.keys(r)) if (typeof r[k] !== "object") keyset.add(k);
    }
    headers = [...keyset];
    paths = headers;
  }

  const esc = (v: unknown) => {
    const s = v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
    return s.includes("\t") || s.includes("\n") ? JSON.stringify(s) : s;
  };
  const out = [headers!.join("\t")];
  for (const r of rows) out.push(paths!.map((p) => esc(getByPath(r, p))).join("\t"));
  return out.join("\n");
}
