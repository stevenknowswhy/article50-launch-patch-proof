import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { validateEvidenceManifest } from "../src/validate-evidence-manifest.mjs";

const example = JSON.parse(
  await readFile(new URL("../example/evidence-example.json", import.meta.url), "utf8"),
);

test("accepts the bounded fictional implementation evidence", () => {
  const result = validateEvidenceManifest(example);

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
  assert.equal(result.surface, "Support assistant first interaction");
  assert.equal(result.buildRevision, "fictional-7d31a50");
});

test("rejects a manifest that includes a legal determination", () => {
  const result = validateEvidenceManifest({
    ...example,
    scope: { ...example.scope, legalDeterminationIncluded: true },
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => /legalDeterminationIncluded/.test(error)));
});

test("rejects failed or missing implementation evidence", () => {
  const result = validateEvidenceManifest({
    ...example,
    verification: { result: "fail", checks: [] },
    limitations: [],
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => /verification\.result/.test(error)));
  assert.ok(result.errors.some((error) => /at least one check/.test(error)));
  assert.ok(result.errors.some((error) => /explicit boundary/.test(error)));
});

test("rejects top-level compliance assertions", () => {
  const result = validateEvidenceManifest({ ...example, compliant: true });

  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => /cannot make a legal conclusion/.test(error)));
});
