import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { buildDemoState } from "../src/proof-state.mjs";

test("before state records the missing first-interaction disclosure", () => {
  const state = buildDemoState("before");

  assert.equal(state.disclosureVisible, false);
  assert.equal(state.checks.disclosureAtFirstInteraction, false);
  assert.equal(state.checks.evidenceRecorded, false);
});

test("after state records the approved disclosure and evidence", () => {
  const state = buildDemoState("after");

  assert.equal(state.disclosureVisible, true);
  assert.equal(state.disclosure, "You are interacting with an AI support assistant.");
  assert.equal(state.checks.disclosureAtFirstInteraction, true);
  assert.equal(state.checks.evidenceRecorded, true);
});

test("fictional evidence artifact keeps legal determinations out of scope", async () => {
  const text = await readFile(new URL("../example/evidence-example.json", import.meta.url), "utf8");
  const artifact = JSON.parse(text);

  assert.equal(artifact.classification, "fictional-example");
  assert.equal(artifact.scope.legalDeterminationIncluded, false);
  assert.ok(artifact.limitations.length >= 3);
});
