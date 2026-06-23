// DataForSEO REST API client. Zero dependencies, uses Node global fetch.
export interface D4SConfig {
  username: string;
  password: string;
  timeout?: number; // seconds
}

const API_BASE = "https://api.dataforseo.com";

export class DataForSEOError extends Error {
  status_code: number;
  status_message: string;
  full: unknown;
  constructor(resp: any) {
    super(`DataForSEO error ${resp.status_code}: ${resp.status_message}`);
    this.status_code = resp.status_code;
    this.status_message = resp.status_message;
    this.full = resp;
  }
}

export async function callDataForSEO(
  path: string,
  method: string,
  tasks: unknown[] | null,
  cfg: D4SConfig,
): Promise<any> {
  const url = API_BASE + path;
  const init: RequestInit = {
    method: (method || "POST").toUpperCase(),
    headers: {
      Authorization:
        "Basic " + Buffer.from(`${cfg.username}:${cfg.password}`).toString("base64"),
      "Content-Type": "application/json",
    },
  };
  const timeout = (cfg.timeout ?? 120) * 1000;
  // AbortSignal.timeout exists in Node 17.3+
  (init as any).signal = AbortSignal.timeout(timeout);
  if ((init.method as string) !== "GET" && tasks !== null) {
    init.body = JSON.stringify(tasks);
  }

  let res: Response;
  try {
    res = await fetch(url, init);
  } catch (e: any) {
    if (e?.name === "TimeoutError" || e?.name === "AbortError") {
      throw new Error(`Request timed out after ${cfg.timeout ?? 120}s: ${method} ${path}`);
    }
    throw e;
  }
  const text = await res.text();
  let json: any;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(
      `Non-JSON response (HTTP ${res.status}) from ${method} ${path}: ${text.slice(0, 300)}`,
    );
  }
  // DataForSEO returns HTTP 200 even on logical errors; the real signal is status_code
  if (typeof json.status_code === "number" && json.status_code !== 20000) {
    throw new DataForSEOError(json);
  }
  return json;
}

// --- credential resolution -------------------------------------------------
// Order: --username/--password flags > env vars > ~/.config/dataforseo/env file
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

export function loadEnvFile(file: string): Record<string, string> {
  let txt: string;
  try {
    txt = readFileSync(file, "utf8");
  } catch {
    return {};
  }
  const out: Record<string, string> = {};
  for (const line of txt.split("\n")) {
    const m = line.match(/^\s*export\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[m[1]] = val;
  }
  return out;
}

export function resolveCredentials(
  flagUser?: string,
  flagPass?: string,
  envFile?: string,
): D4SConfig {
  const file = envFile || process.env.DATAFORSEO_ENV_FILE || join(homedir(), ".config/dataforseo/env");
  const env = { ...loadEnvFile(file), ...process.env as any };
  const username = flagUser || process.env.DATAFORSEO_USERNAME || env.DATAFORSEO_USERNAME;
  const password = flagPass || process.env.DATAFORSEO_PASSWORD || env.DATAFORSEO_PASSWORD;
  if (!username || !password) {
    throw new Error(
      `DataForSEO credentials not found. Set DATAFORSEO_USERNAME / DATAFORSEO_PASSWORD env vars,\n` +
        `create ${file} with:\n` +
        `  export DATAFORSEO_USERNAME='you@login'\n` +
        `  export DATAFORSEO_PASSWORD='your-api-password'\n` +
        `or pass --username / --password.`,
    );
  }
  return { username, password };
}
