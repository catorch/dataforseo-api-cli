import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

// DataForSEO REST API client. Zero dependencies, uses Node global fetch.
/** Runtime configuration required for a DataForSEO API request. */
export interface D4SConfig {
  username: string;
  password: string;
  /** Request timeout in seconds. Defaults to 120. */
  timeout?: number;
}

const API_BASE = "https://api.dataforseo.com";
const DEFAULT_TIMEOUT_SECONDS = 120;

interface ErrorWithCode extends Error {
  code?: string;
}

/** DataForSEO's standard v3 response envelope. */
export interface DataForSEOResponse {
  status_code: number;
  status_message: string;
  tasks?: unknown;
  [key: string]: unknown;
}

/** Error thrown when DataForSEO returns a non-success status_code. */
export class DataForSEOError extends Error {
  status_code: number;
  status_message: string;
  full: DataForSEOResponse;

  constructor(resp: DataForSEOResponse) {
    super(`DataForSEO error ${resp.status_code}: ${resp.status_message}`);
    this.status_code = resp.status_code;
    this.status_message = resp.status_message;
    this.full = resp;
  }
}

/**
 * Calls the DataForSEO REST API with Basic auth and a JSON task body.
 *
 * Requires valid DataForSEO credentials. Throws for network failures, timeouts,
 * non-JSON responses, malformed DataForSEO envelopes, and DataForSEO logical
 * errors (`status_code !== 20000`).
 */
export async function callDataForSEO(
  path: string,
  method: string,
  tasks: unknown[] | null,
  cfg: D4SConfig,
): Promise<DataForSEOResponse> {
  if (!path.startsWith("/")) {
    throw new Error(`DataForSEO API path must start with "/": ${path}`);
  }
  if (method.trim() === "") {
    throw new Error("DataForSEO HTTP method is required");
  }

  const url = API_BASE + path;
  const httpMethod = method.toUpperCase();
  const timeoutSeconds = cfg.timeout ?? DEFAULT_TIMEOUT_SECONDS;
  if (!Number.isFinite(timeoutSeconds) || timeoutSeconds <= 0) {
    throw new Error(`Request timeout must be a positive number of seconds: ${timeoutSeconds}`);
  }

  const init: RequestInit = {
    method: httpMethod,
    headers: {
      Authorization:
        "Basic " + Buffer.from(`${cfg.username}:${cfg.password}`).toString("base64"),
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(timeoutSeconds * 1000),
  };
  if (httpMethod !== "GET" && tasks !== null) {
    init.body = JSON.stringify(tasks);
  }

  let res: Response;
  try {
    res = await fetch(url, init);
  } catch (error: unknown) {
    if (!(error instanceof Error)) {
      throw new Error("fetch rejected with a non-Error value");
    }
    if (error.name === "TimeoutError" || error.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutSeconds}s: ${httpMethod} ${path}`, {
        cause: error,
      });
    }
    throw error;
  }

  const text = await res.text();
  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch (error: unknown) {
    throw new Error(
      `Non-JSON response (HTTP ${res.status}) from ${httpMethod} ${path}: ${text.slice(0, 300)}`,
      { cause: error },
    );
  }
  const json = parseDataForSEOResponse(payload, httpMethod, path);

  // DataForSEO returns HTTP 200 even on logical errors; the real signal is status_code
  if (json.status_code !== 20000) {
    throw new DataForSEOError(json);
  }
  return json;
}

/**
 * Loads DataForSEO-style environment exports from a local file.
 *
 * The file supports blank lines, comments, and lines like
 * `export DATAFORSEO_USERNAME='you@login'`. Missing default files return an
 * empty object; explicitly requested files and malformed lines throw.
 */
export function loadEnvFile(
  file: string,
  options: { required?: boolean } = {},
): Record<string, string> {
  let text: string;
  try {
    text = readFileSync(file, "utf8");
  } catch (error: unknown) {
    if (isNodeError(error) && error.code === "ENOENT" && options.required !== true) {
      return {};
    }
    throw new Error(`Failed to read DataForSEO env file: ${file}`, { cause: error });
  }

  const out: Record<string, string> = {};
  for (const [index, rawLine] of text.split("\n").entries()) {
    const line = rawLine.trim();
    if (line === "" || line.startsWith("#")) {
      continue;
    }

    const match = line.match(/^export\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (match === null) {
      throw new Error(`Malformed env file line ${index + 1} in ${file}`);
    }

    const key = match[1];
    let val = match[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    } else if (val.startsWith('"') || val.endsWith('"') || val.startsWith("'") || val.endsWith("'")) {
      throw new Error(`Unmatched quote on env file line ${index + 1} in ${file}`);
    }
    out[key] = val;
  }
  return out;
}

/**
 * Resolves DataForSEO credentials once at startup.
 *
 * Precedence: CLI flags, process environment, then the env file. The default
 * env file is optional; a file requested with `--env-file` or
 * `DATAFORSEO_ENV_FILE` must exist and be well-formed.
 */
export function resolveCredentials(
  flagUser?: string,
  flagPass?: string,
  envFile?: string,
): D4SConfig {
  const requestedEnvFile = envFile ?? process.env.DATAFORSEO_ENV_FILE;
  const file = requestedEnvFile ?? join(homedir(), ".config/dataforseo/env");
  const usernameFromEnv = process.env.DATAFORSEO_USERNAME;
  const passwordFromEnv = process.env.DATAFORSEO_PASSWORD;
  const usernameWithoutFile = firstNonEmptyString(flagUser, usernameFromEnv);
  const passwordWithoutFile = firstNonEmptyString(flagPass, passwordFromEnv);
  const needsFile =
    requestedEnvFile !== undefined ||
    usernameWithoutFile === undefined ||
    passwordWithoutFile === undefined;
  const fileEnv = needsFile
    ? loadEnvFile(file, { required: requestedEnvFile !== undefined })
    : {};

  const username = firstNonEmptyString(flagUser, usernameFromEnv, fileEnv.DATAFORSEO_USERNAME);
  const password = firstNonEmptyString(flagPass, passwordFromEnv, fileEnv.DATAFORSEO_PASSWORD);
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

function parseDataForSEOResponse(
  payload: unknown,
  method: string,
  path: string,
): DataForSEOResponse {
  if (!isRecord(payload)) {
    throw new Error(`Malformed DataForSEO response from ${method} ${path}: expected an object`);
  }
  if (typeof payload.status_code !== "number") {
    throw new Error(`Malformed DataForSEO response from ${method} ${path}: status_code must be a number`);
  }
  if (typeof payload.status_message !== "string") {
    throw new Error(`Malformed DataForSEO response from ${method} ${path}: status_message must be a string`);
  }
  return {
    ...payload,
    status_code: payload.status_code,
    status_message: payload.status_message,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNodeError(error: unknown): error is ErrorWithCode {
  return error instanceof Error && "code" in error;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "";
}

function firstNonEmptyString(...values: readonly unknown[]): string | undefined {
  for (const value of values) {
    if (isNonEmptyString(value)) {
      return value;
    }
  }
  return undefined;
}
