// Build script: bundles TS → single zero-dependency dist/main.js with shebang.
import { readFileSync, writeFileSync, chmodSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";

mkdirSync("dist", { recursive: true });

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
if (typeof pkg.version !== "string" || pkg.version.trim() === "") {
  throw new Error("package.json version must be a non-empty string");
}

// Use the bun CLI directly (most reliable across bun versions).
const r = spawnSync("bun", ["build", "src/index.ts", "--outfile", "dist/main.js", "--target", "node", "--minify"], {
  stdio: "inherit",
});
if (r.status !== 0) {
  console.error("bun build failed");
  process.exit(r.status ?? 1);
}

// Ensure exactly one shebang on line 1 (bun emits its own from the source).
const rawBody = readFileSync("dist/main.js", "utf8").replace(/^#!.*\n/gm, "");
if (!rawBody.includes("__D4S_VERSION__")) {
  throw new Error("Build output is missing __D4S_VERSION__ placeholder");
}
const body = rawBody.replaceAll("__D4S_VERSION__", pkg.version);
writeFileSync("dist/main.js", "#!/usr/bin/env node\n" + body);
chmodSync("dist/main.js", 0o755);
console.log("✓ built dist/main.js");
