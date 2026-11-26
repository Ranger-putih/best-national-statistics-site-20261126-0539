// Indonesia in Figures — hand-in program (Node 22, standard library only).
//
// The site is plain static files in app/ (index.html, CSS, vanilla JS,
// no build step, nothing fetched over the network). This program copies
// app/ and screenshots/ from beside this file into the output directory
// and writes /output/dossier.json with the vendored make.fun library, so
// the judge can read the screenshots, the first load's files and bytes,
// and the source. vendor/makefun-frontend.ts must stay exactly as the
// kit shipped it: the scorer rebuilds the dossier with its own copy and
// compares the two byte for byte.
//
// Run locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// In the grader MAKEFUN_OUTPUT_DIR is unset and /output is used.

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = fileURLToPath(new URL(".", import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
cpSync(join(repoRoot, "app"), join(outDir, "app"), { recursive: true });
mkdirSync(join(outDir, "screenshots"), { recursive: true });
if (existsSync(join(repoRoot, "screenshots"))) {
  cpSync(join(repoRoot, "screenshots"), join(outDir, "screenshots"), { recursive: true });
}

// Caps mirror the gate (reference/gate.json): at most 4 screenshots, each
// at most 256 KiB; app/ at most 993 files and directories and 16 MiB;
// the dossier text at most 160 KiB. Anything past a cap fails here
// with the library's own words instead of passing silently.
writeFileSync(
  join(outDir, "dossier.json"),
  buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
