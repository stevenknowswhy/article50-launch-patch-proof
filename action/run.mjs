import { appendFileSync, readFileSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";

import { validateEvidenceManifest } from "../src/validate-evidence-manifest.mjs";

function commandValue(value) {
  return String(value).replaceAll("%", "%25").replaceAll("\r", "%0D").replaceAll("\n", "%0A");
}

function setOutput(name, value) {
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`, "utf8");
  }
}

try {
  const workspace = resolve(process.env.GITHUB_WORKSPACE || process.cwd());
  const inputPath = process.env["INPUT_MANIFEST-PATH"] || "example/evidence-example.json";
  if (isAbsolute(inputPath)) throw new Error("manifest-path must be repository-relative");

  const manifestPath = resolve(workspace, inputPath);
  const relativePath = relative(workspace, manifestPath);
  if (relativePath.startsWith("..") || isAbsolute(relativePath)) {
    throw new Error("manifest-path must stay inside the checked-out repository");
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const result = validateEvidenceManifest(manifest);
  if (!result.valid) throw new Error(result.errors.join("; "));

  setOutput("surface", result.surface);
  setOutput("build-revision", result.buildRevision);
  process.stdout.write(
    `::notice title=Technical evidence boundary::${commandValue(
      `Validated ${relativePath}: required implementation fields and passing checks are present. This is not a legal opinion, applicability decision, audit, certification, or compliance guarantee.`,
    )}\n`,
  );
} catch (error) {
  process.stderr.write(
    `::error title=Implementation evidence manifest::${commandValue(error.message)}\n`,
  );
  process.exitCode = 1;
}
