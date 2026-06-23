// Build script: bundles TS → single zero-dependency dist/main.js with shebang.
import { readFileSync, writeFileSync, chmodSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";

mkdirSync("dist", { recursive: true });

// Use the bun CLI directly (most reliable across bun versions).
const r = spawnSync("bun", ["build", "src/index.ts", "--outfile", "dist/main.js", "--target", "node", "--minify"], {
  stdio: "inherit",
});
if (r.status !== 0) {
  console.error("bun build failed");
  process.exit(r.status ?? 1);
}

// Ensure exactly one shebang on line 1 (bun emits its own from the source).
const body = readFileSync("dist/main.js", "utf8").replace(/^#!.*\n/gm, "");
writeFileSync("dist/main.js", "#!/usr/bin/env node\n" + body);
chmodSync("dist/main.js", 0o755);
console.log("✓ built dist/main.js");
