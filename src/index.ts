#!/usr/bin/env node
// d4s — DataForSEO CLI. Zero-dependency, direct REST, full 84-endpoint coverage.
import {
  TOOLS,
  ALIASES,
  resolveTool,
  resolvePath,
  buildPayload,
  requiredParams,
  listTools,
  modules,
} from "./tools.ts";
import { callDataForSEO, resolveCredentials, DataForSEOError } from "./client.ts";
import { toTSV } from "./format.ts";

const VERSION = "0.1.0";
const BANNER = `d4s ${VERSION} — DataForSEO CLI (84 endpoints, direct REST)`;

// --- argv parsing ----------------------------------------------------------
interface ParsedArgs {
  command: string | null;
  positional: string[];
  flags: Record<string, unknown>; // raw string | string[] | boolean
  global: {
    json: boolean;
    tsv: boolean;
    raw: boolean;
    location?: string;
    lang?: string;
    username?: string;
    password?: string;
    envFile?: string;
    timeout?: number;
  };
}

function parseArgs(argv: string[]): ParsedArgs {
  const out: ParsedArgs = {
    command: null,
    positional: [],
    flags: {},
    global: { json: false, tsv: false, raw: false },
  };
  let i = 0;
  const knownGlobals = new Set([
    "--json", "--tsv", "--raw", "--location", "--lang", "--language",
    "--username", "--password", "--env-file", "--timeout", "--help", "-h",
    "--version", "-v",
  ]);
  while (i < argv.length) {
    const a = argv[i++];
    if (a === "--") {
      out.positional.push(...argv.slice(i));
      break;
    }
    if (a.startsWith("--") || (a.startsWith("-") && a.length > 1)) {
      let key = a;
      let val: string | undefined;
      const eq = a.indexOf("=");
      if (eq >= 0) {
        key = a.slice(0, eq);
        val = a.slice(eq + 1);
      }
      switch (key) {
        case "--json": out.global.json = true; continue;
        case "--tsv": out.global.tsv = true; continue;
        case "--raw": out.global.raw = true; continue;
        case "--location":
          out.global.location = val ?? argv[i++]; continue;
        case "--lang":
        case "--language":
          out.global.lang = val ?? argv[i++]; continue;
        case "--username":
          out.global.username = val ?? argv[i++]; continue;
        case "--password":
          out.global.password = val ?? argv[i++]; continue;
        case "--env-file":
          out.global.envFile = val ?? argv[i++]; continue;
        case "--timeout":
          out.global.timeout = Number(val ?? argv[i++]); continue;
        case "--help":
        case "-h":
          out.command = "help"; continue;
        case "--version":
        case "-v":
          console.log(VERSION); process.exit(0);
        default: {
          if (eq < 0 && !knownGlobals.has(key)) {
            // peek: is the next token a value (not a flag)?
            const next = argv[i];
            const negBool = key.startsWith("--no-");
            if (negBool) {
              const realKey = key.slice(5); // drop "no-"
              setFlag(out.flags, realKey, false);
              continue;
            }
            if (next !== undefined && !next.startsWith("-")) {
              val = argv[i++];
            } else {
              // bare flag → boolean true
              setFlag(out.flags, key.slice(2), true);
              continue;
            }
          }
          setFlag(out.flags, key.slice(2).replace(/-/g, "_"), val);
        }
      }
    } else {
      if (out.command === null) out.command = a;
      else out.positional.push(a);
    }
  }
  return out;
}

function setFlag(flags: Record<string, unknown>, name: string, val: unknown) {
  const norm = name.replace(/-/g, "_");
  if (flags[norm] === undefined) flags[norm] = val;
  else if (Array.isArray(flags[norm])) (flags[norm] as unknown[]).push(val);
  else flags[norm] = [flags[norm] as unknown, val];
}

// --- help / list -----------------------------------------------------------
function printHelp() {
  console.log(`${BANNER}

USAGE
  d4s <command> [--param value ...] [--tsv|--json|--raw]
  d4s list [module]
  d4s help <command>

GLOBAL OPTIONS
  --tsv                 Tab-separated output (default: pretty JSON)
  --json                Pretty JSON (default)
  --raw                 Full raw API response
  --location "Place"    Shortcut for --location-name (when the tool supports it)
  --lang en             Shortcut for --language-code
  --username / --password   Override credentials
  --env-file PATH       Credentials file (default ~/.config/dataforseo/env)
  --timeout N           Request timeout in seconds (default 120)
  -h, --help            Show this help
  -v, --version         Print version

CREDENTIALS (any of)
  1. --username/--password flags
  2. DATAFORSEO_USERNAME / DATAFORSEO_PASSWORD env vars
  3. ~/.config/dataforseo/env with: export DATAFORSEO_USERNAME='...'

POPULAR COMMANDS (see 'd4s list' for all 84)
  volume --keywords a,b,c            Google Ads search volume
  keyword-overview --keywords a,b    Volume + organic difficulty + intent
  difficulty --keywords a,b          Bulk organic keyword difficulty
  related --keyword "p0420"          Related keywords
  ideas --keywords "obd2 codes"      Keyword ideas
  serp --keyword "p0420 code"        Live Google SERP
  ranked-keywords --target X.com     Keywords a domain ranks for
  competitors --target X.com         Domain competitors
  backlinks --target X.com           Backlinks summary
  referring-domains --target X.com   Referring domains
  lighthouse --url https://X.com     On-page Lighthouse audit
  llm-mentions --keyword "p0420"     Visibility in AI/LLM answers (2026)

Every tool also accepts its snake_case or kebab-case name and all documented
DataForSEO params as --flags (arrays via comma or repeated flags).`);
}

function printToolHelp(tool: ReturnType<typeof resolveTool>) {
  if (!tool) {
    console.error(`Unknown command. Run 'd4s list' to see all commands.`);
    process.exit(1);
  }
  const req = requiredParams(tool);
  console.log(`${tool.title}  (${tool.name})`);
  console.log(`module: ${tool.module}   endpoint: ${tool.method} ${tool.pathTemplate ? tool.pathTemplate.template : tool.endpoint}`);
  console.log(`\n${tool.description}\n`);
  if (req.length) console.log(`REQUIRED: ${req.map((p) => "--" + p.name.replace(/_/g, "-")).join(", ")}`);
  console.log(`\nPARAMS:`);
  for (const p of tool.params) {
    const flag = "--" + p.name.replace(/_/g, "-");
    const type = p.coreType === "array" ? `array<${p.elementType}>` : p.coreType;
    const req = p.optional ? "optional" : "required";
    const def = p.defaultValue !== undefined && p.defaultValue !== null ? ` default=${JSON.stringify(p.defaultValue)}` : "";
    console.log(`  ${flag.padEnd(28)} ${type.padEnd(16)} ${req}${def}`);
    if (p.description) console.log(`      ${p.description.split("\n")[0].slice(0, 120)}`);
  }
}

function printList(moduleFilter?: string) {
  const mods = moduleFilter ? [moduleFilter] : modules();
  for (const m of mods) {
    console.log(`\n## ${m}`);
    for (const t of listTools(m)) {
      const alias = Object.entries(ALIASES).find(([, n]) => n === t.name)?.[0];
      const req = requiredParams(t).map((p) => "--" + p.name.replace(/_/g, "-")).join(" ");
      console.log(
        `  ${t.name}${alias ? ` (${alias})` : ""}\n      ${t.method} ${t.pathTemplate ? t.pathTemplate.template : t.endpoint}` +
          (req ? `\n      required: ${req}` : ""),
      );
    }
  }
  console.log(`\n${listTools(moduleFilter).length} tool(s)${moduleFilter ? ` in ${moduleFilter}` : ""}, ${TOOLS.length} total.`);
}

// --- main ------------------------------------------------------------------
async function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0) {
    printHelp();
    process.exit(0);
  }
  const parsed = parseArgs(argv);

  if (parsed.command === "help") {
    const tgt = parsed.positional[0] || parsed.flags.command;
    if (!tgt) {
      printHelp();
      process.exit(0);
    }
    printToolHelp(resolveTool(String(tgt)));
    process.exit(0);
  }
  if (parsed.command === "list") {
    printList(parsed.positional[0]);
    process.exit(0);
  }
  if (!parsed.command || parsed.command === "help") {
    printHelp();
    process.exit(0);
  }

  const tool = resolveTool(parsed.command);
  if (!tool) {
    console.error(
      `Unknown command: ${parsed.command}\nRun 'd4s list' for all commands or 'd4s help <command>'.`,
    );
    process.exit(1);
  }

  // merge global shortcuts into per-tool params
  const provided: Record<string, unknown> = { ...parsed.flags };
  if (parsed.global.location !== undefined) {
    if (tool.params.some((p) => p.name === "location_name")) provided.location_name ??= parsed.global.location;
    if (tool.params.some((p) => p.name === "location_code")) {
      const n = Number(parsed.global.location);
      if (Number.isFinite(n)) provided.location_code ??= n;
    }
  }
  if (parsed.global.lang !== undefined) {
    if (tool.params.some((p) => p.name === "language_code")) provided.language_code ??= parsed.global.lang;
  }

  // comma-split array params (or JSON-parse for arrays-of-objects)
  for (const p of tool.params) {
    if (p.coreType === "array" && typeof provided[p.name] === "string") {
      const s = (provided[p.name] as string).trim();
      if (s.startsWith("[")) {
        try { provided[p.name] = JSON.parse(s); continue; } catch { /* fall through */ }
      } else if (s.startsWith("{")) {
        try { provided[p.name] = [JSON.parse(s)]; continue; } catch { /* fall through */ }
      }
      provided[p.name] = s.split(",").map((x) => x.trim()).filter(Boolean);
    }
  }

  // validate required
  const missing = requiredParams(tool).filter((p) => provided[p.name] === undefined);
  if (missing.length) {
    console.error(
      `Missing required param(s): ${missing.map((p) => "--" + p.name.replace(/_/g, "-")).join(", ")}\n` +
        `Run 'd4s help ${parsed.command}' for full details.`,
    );
    process.exit(2);
  }

  const cfg = resolveCredentials(parsed.global.username, parsed.global.password, parsed.global.envFile);
  if (parsed.global.timeout) cfg.timeout = parsed.global.timeout;

  const { path, method } = resolvePath(tool, provided);
  const payload = buildPayload(tool, provided);
  const tasks = method === "GET" ? null : [payload];

  if (process.env.D4S_DEBUG) {
    console.error(`# ${method} ${path}`);
    if (tasks) console.error(`# body: ${JSON.stringify(tasks)}`);
  }

  let resp: any;
  try {
    resp = await callDataForSEO(path, method, tasks, cfg);
  } catch (e: any) {
    if (e instanceof DataForSEOError) {
      console.error(`DataForSEO error ${e.status_code}: ${e.status_message}`);
      if (parsed.global.raw || process.env.D4S_DEBUG) console.log(JSON.stringify(e.full, null, 2));
      process.exit(1);
    }
    console.error(e?.message || String(e));
    process.exit(1);
  }

  if (parsed.global.raw) {
    console.log(JSON.stringify(resp, null, 2));
    return;
  }

  // Extract the data: tasks[0].result (DataForSEO v3 standard envelope)
  let data: any = resp;
  try {
    data = resp.tasks?.[0]?.result ?? resp.tasks?.[0] ?? resp;
  } catch {
    /* keep full resp */
  }

  if (parsed.global.tsv) {
    const result = Array.isArray(data) ? data : (data?.[0] ?? data);
    console.log(toTSV(result, tool.name));
    return;
  }

  // default: pretty JSON of the data
  console.log(JSON.stringify(data, null, 2));
}

main().catch((e) => {
  console.error(e?.stack || e?.message || String(e));
  process.exit(1);
});
