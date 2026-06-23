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
  type Param,
  type Tool,
} from "./tools.ts";
import {
  callDataForSEO,
  resolveCredentials,
  DataForSEOError,
  type D4SConfig,
  type DataForSEOResponse,
} from "./client.ts";
import { toTSV } from "./format.ts";

const VERSION = "__D4S_VERSION__";
const BANNER = `d4s ${VERSION} — DataForSEO CLI (84 endpoints, direct REST)`;

// --- argv parsing ----------------------------------------------------------
type FlagValue = string | boolean | Array<string | boolean>;

interface ParsedArgs {
  command: string | null;
  positional: string[];
  flags: Record<string, FlagValue>;
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

/**
 * Parses CLI arguments into global options and raw command flags.
 *
 * Throws when a global option is malformed or missing a value. Per-command
 * values stay raw until the command registry is known.
 */
function parseArgs(argv: readonly string[]): ParsedArgs {
  const out: ParsedArgs = {
    command: null,
    positional: [],
    flags: {},
    global: { json: false, tsv: false, raw: false },
  };
  let i = 0;
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
        case "--json":
          rejectFlagValue(key, val);
          out.global.json = true;
          continue;
        case "--tsv":
          rejectFlagValue(key, val);
          out.global.tsv = true;
          continue;
        case "--raw":
          rejectFlagValue(key, val);
          out.global.raw = true;
          continue;
        case "--location": {
          const read = readFlagValue(argv, i, key, val);
          out.global.location = read.value;
          i = read.nextIndex;
          continue;
        }
        case "--lang":
        case "--language": {
          const read = readFlagValue(argv, i, key, val);
          out.global.lang = read.value;
          i = read.nextIndex;
          continue;
        }
        case "--username": {
          const read = readFlagValue(argv, i, key, val);
          out.global.username = read.value;
          i = read.nextIndex;
          continue;
        }
        case "--password": {
          const read = readFlagValue(argv, i, key, val);
          out.global.password = read.value;
          i = read.nextIndex;
          continue;
        }
        case "--env-file": {
          const read = readFlagValue(argv, i, key, val);
          out.global.envFile = read.value;
          i = read.nextIndex;
          continue;
        }
        case "--timeout": {
          const read = readFlagValue(argv, i, key, val);
          out.global.timeout = parsePositiveNumber(read.value, key);
          i = read.nextIndex;
          continue;
        }
        case "--help":
        case "-h":
          rejectFlagValue(key, val);
          if (out.command !== null && out.command !== "help") {
            out.positional.unshift(out.command);
          }
          out.command = "help";
          continue;
        case "--version":
        case "-v":
          rejectFlagValue(key, val);
          out.command = "version";
          continue;
        default: {
          if (!key.startsWith("--")) {
            throw new Error(`Unknown short option: ${key}`);
          }
          if (key.startsWith("--no-")) {
            rejectFlagValue(key, val);
            setFlag(out.flags, key.slice(5), false);
            continue;
          }
          const next = argv[i];
          if (val === undefined && next !== undefined && !isOption(next)) {
            val = argv[i++];
          }
          setFlag(out.flags, key.slice(2), val ?? true);
        }
      }
    } else {
      if (out.command === null) out.command = a;
      else out.positional.push(a);
    }
  }
  validateOutputMode(out.global);
  return out;
}

function setFlag(flags: Record<string, FlagValue>, name: string, val: string | boolean): void {
  const norm = name.replace(/-/g, "_");
  if (flags[norm] === undefined) flags[norm] = val;
  else if (Array.isArray(flags[norm])) flags[norm].push(val);
  else flags[norm] = [flags[norm], val];
}

function readFlagValue(
  argv: readonly string[],
  index: number,
  flagName: string,
  valueFromEquals?: string,
): { value: string; nextIndex: number } {
  if (valueFromEquals !== undefined) {
    return { value: valueFromEquals, nextIndex: index };
  }
  const value = argv[index];
  if (value === undefined || isOption(value)) {
    throw new Error(`${flagName} requires a value`);
  }
  return { value, nextIndex: index + 1 };
}

function rejectFlagValue(flagName: string, valueFromEquals?: string): void {
  if (valueFromEquals !== undefined) {
    throw new Error(`${flagName} does not accept a value`);
  }
}

function isOption(value: string): boolean {
  return value.startsWith("-") && value.length > 1;
}

function parsePositiveNumber(value: string, flagName: string): number {
  if (value.trim() === "") {
    throw new Error(`${flagName} must be a positive number`);
  }
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${flagName} must be a positive number`);
  }
  return parsed;
}

function validateOutputMode(global: ParsedArgs["global"]): void {
  const selectedModes = [
    global.json ? "--json" : undefined,
    global.tsv ? "--tsv" : undefined,
    global.raw ? "--raw" : undefined,
  ].filter((mode): mode is string => mode !== undefined);
  if (selectedModes.length > 1) {
    throw new Error(`Choose only one output mode: ${selectedModes.join(", ")}`);
  }
}

function parseDebugEnv(value: string | undefined): boolean {
  if (value === undefined || value === "") {
    return false;
  }
  if (/^(1|true|yes|on)$/i.test(value)) {
    return true;
  }
  if (/^(0|false|no|off)$/i.test(value)) {
    return false;
  }
  throw new Error("D4S_DEBUG must be a boolean value");
}

// --- help / list -----------------------------------------------------------
function printHelp(): void {
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
  serp --keyword "p0420 code" --lang en   Live Google SERP
  ranked-keywords --target X.com     Keywords a domain ranks for
  competitors --target X.com         Domain competitors
  backlinks --target X.com           Backlinks summary
  referring-domains --target X.com   Referring domains
  lighthouse --url https://X.com     On-page Lighthouse audit
  llm-mentions --target '[{"keyword":"p0420"}]'   Visibility in AI/LLM answers

Every tool also accepts its snake_case or kebab-case name and all documented
DataForSEO params as --flags (arrays via comma or repeated flags).`);
}

function printToolHelp(tool: Tool | undefined): void {
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
    const type = p.coreType === "array" && p.elementType ? `array<${p.elementType}>` : p.coreType;
    const req = p.optional ? "optional" : "required";
    const def = p.defaultValue !== undefined && p.defaultValue !== null ? ` default=${JSON.stringify(p.defaultValue)}` : "";
    console.log(`  ${flag.padEnd(28)} ${type.padEnd(16)} ${req}${def}`);
    if (p.description) console.log(`      ${p.description.split("\n")[0].slice(0, 120)}`);
  }
}

function printList(moduleFilter?: string): void {
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

function normalizeProvidedParams(tool: Tool, parsed: ParsedArgs): Record<string, unknown> {
  const provided: Record<string, unknown> = { ...parsed.flags };
  const paramsByName = new Map(tool.params.map((param) => [param.name, param]));

  applyLocationShortcut(tool, provided, parsed.global.location);
  applyLanguageShortcut(tool, provided, parsed.global.lang);

  for (const name of Object.keys(provided)) {
    if (!paramsByName.has(name)) {
      throw new Error(
        `Unknown param --${name.replace(/_/g, "-")} for command "${tool.name}". ` +
          `Run 'd4s help ${tool.name}' for valid params.`,
      );
    }
  }

  for (const param of tool.params) {
    if (provided[param.name] === undefined) {
      continue;
    }
    if (param.coreType === "array") {
      provided[param.name] = normalizeArrayParam(param, provided[param.name]);
    }
    if (param.coreType === "object") {
      provided[param.name] = normalizeObjectParam(param, provided[param.name]);
    }
  }

  return provided;
}

function applyLocationShortcut(
  tool: Tool,
  provided: Record<string, unknown>,
  location: string | undefined,
): void {
  if (location === undefined) {
    return;
  }
  if (tool.params.some((p) => p.name === "location_name")) {
    provided.location_name ??= location;
    return;
  }
  if (tool.params.some((p) => p.name === "location_code")) {
    provided.location_code ??= parsePositiveNumber(location, "--location");
    return;
  }
  throw new Error(`Command "${tool.name}" does not accept --location`);
}

function applyLanguageShortcut(
  tool: Tool,
  provided: Record<string, unknown>,
  language: string | undefined,
): void {
  if (language === undefined) {
    return;
  }
  if (!tool.params.some((p) => p.name === "language_code")) {
    throw new Error(`Command "${tool.name}" does not accept --lang`);
  }
  provided.language_code ??= language;
}

function normalizeArrayParam(param: Param, value: unknown): unknown {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  if (trimmed === "") {
    throw new Error(`--${param.name.replace(/_/g, "-")} must not be empty`);
  }
  if (trimmed.startsWith("[")) {
    const parsed = parseJsonFlag(trimmed, param);
    if (!Array.isArray(parsed)) {
      throw new Error(`--${param.name.replace(/_/g, "-")} JSON value must be an array`);
    }
    return parsed;
  }
  if (trimmed.startsWith("{")) {
    const parsed = parseJsonFlag(trimmed, param);
    if (!isRecord(parsed)) {
      throw new Error(`--${param.name.replace(/_/g, "-")} JSON value must be an object`);
    }
    return [parsed];
  }

  const parts = trimmed.split(",").map((part) => part.trim());
  if (parts.some((part) => part === "")) {
    throw new Error(`--${param.name.replace(/_/g, "-")} contains an empty comma-separated item`);
  }
  return parts;
}

function normalizeObjectParam(param: Param, value: unknown): unknown {
  if (typeof value !== "string") {
    return value;
  }
  const trimmed = value.trim();
  if (trimmed === "") {
    throw new Error(`--${param.name.replace(/_/g, "-")} must not be empty`);
  }
  return parseJsonFlag(trimmed, param);
}

function parseJsonFlag(value: string, param: Param): unknown {
  try {
    return JSON.parse(value);
  } catch (error: unknown) {
    throw new Error(`--${param.name.replace(/_/g, "-")} must be valid JSON`, { cause: error });
  }
}

function isMissingRequiredValue(value: unknown): boolean {
  if (value === undefined || value === null) {
    return true;
  }
  if (typeof value === "string") {
    return value.trim() === "";
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return false;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function extractData(response: DataForSEOResponse): unknown {
  if (!Array.isArray(response.tasks) || response.tasks.length === 0) {
    return response;
  }
  const firstTask = response.tasks[0];
  if (isRecord(firstTask) && "result" in firstTask) {
    return firstTask.result;
  }
  return firstTask;
}

function messageFromError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  throw new Error("Caught non-Error exception");
}

function stringifyForOutput(value: unknown): string {
  const rendered = JSON.stringify(value, null, 2);
  return rendered === undefined ? String(value) : rendered;
}

function getHelpTarget(parsed: ParsedArgs): string | undefined {
  if (parsed.positional[0] !== undefined) {
    return parsed.positional[0];
  }
  const commandFlag = parsed.flags.command;
  if (commandFlag === undefined) {
    return undefined;
  }
  if (typeof commandFlag !== "string") {
    throw new Error("--command must be provided exactly once with a command name");
  }
  return commandFlag;
}

// --- main ------------------------------------------------------------------
async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  let debug: boolean;
  try {
    debug = parseDebugEnv(process.env.D4S_DEBUG);
  } catch (error: unknown) {
    console.error(messageFromError(error));
    process.exit(2);
  }
  if (argv.length === 0) {
    printHelp();
    process.exit(0);
  }

  let parsed: ParsedArgs;
  try {
    parsed = parseArgs(argv);
  } catch (error: unknown) {
    console.error(messageFromError(error));
    process.exit(2);
  }

  if (parsed.command === "version") {
    console.log(VERSION);
    process.exit(0);
  }

  if (parsed.command === "help") {
    const tgt = getHelpTarget(parsed);
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

  let provided: Record<string, unknown>;
  try {
    provided = normalizeProvidedParams(tool, parsed);
  } catch (error: unknown) {
    console.error(messageFromError(error));
    process.exit(2);
  }

  // validate required
  const missing = requiredParams(tool).filter((p) => isMissingRequiredValue(provided[p.name]));
  if (missing.length) {
    console.error(
      `Missing required param(s): ${missing.map((p) => "--" + p.name.replace(/_/g, "-")).join(", ")}\n` +
        `Run 'd4s help ${parsed.command}' for full details.`,
    );
    process.exit(2);
  }

  let payload: Record<string, unknown>;
  let path: string;
  let method: string;
  try {
    payload = buildPayload(tool, provided);
    const resolved = resolvePath(tool, payload);
    path = resolved.path;
    method = resolved.method;
  } catch (error: unknown) {
    console.error(messageFromError(error));
    process.exit(2);
  }

  let cfg: D4SConfig;
  try {
    cfg = resolveCredentials(parsed.global.username, parsed.global.password, parsed.global.envFile);
    if (parsed.global.timeout !== undefined) cfg.timeout = parsed.global.timeout;
  } catch (error: unknown) {
    console.error(messageFromError(error));
    process.exit(1);
  }

  const tasks = method === "GET" ? null : [payload];

  if (debug) {
    console.error(`# ${method} ${path}`);
    if (tasks) console.error(`# body: ${JSON.stringify(tasks)}`);
  }

  let resp: DataForSEOResponse;
  try {
    resp = await callDataForSEO(path, method, tasks, cfg);
  } catch (error: unknown) {
    if (error instanceof DataForSEOError) {
      console.error(`DataForSEO error ${error.status_code}: ${error.status_message}`);
      if (parsed.global.raw || debug) console.log(stringifyForOutput(error.full));
      process.exit(1);
    }
    console.error(messageFromError(error));
    process.exit(1);
  }

  if (parsed.global.raw) {
    console.log(stringifyForOutput(resp));
    return;
  }

  // Extract the data: tasks[0].result (DataForSEO v3 standard envelope)
  const data = extractData(resp);

  if (parsed.global.tsv) {
    console.log(toTSV(data, tool.name));
    return;
  }

  // default: pretty JSON of the data
  console.log(stringifyForOutput(data));
}

main().catch((error: unknown) => {
  if (!(error instanceof Error)) {
    console.error("Caught non-Error exception");
    process.exit(1);
  }
  console.error(error.stack ?? error.message);
  process.exit(1);
});
