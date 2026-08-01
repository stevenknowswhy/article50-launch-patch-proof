import assert from "node:assert/strict";
import test from "node:test";

import { buildDisclosureAssertion } from "../src/disclosure-event.mjs";

const validInput = {
  disclosurePolicyId: "policy-fictional-001",
  renderVersion: "web-chat@fictional-revision",
  surface: "support-chat",
  locale: "en-US",
  evidenceId: "fictional-session-001",
  timestamp: "2026-07-31T20:00:00.000Z",
  noticeText: "You are interacting with an AI support assistant.",
};

test("builds a render assertion without claiming perception or legal sufficiency", () => {
  const event = buildDisclosureAssertion(validInput);

  assert.equal(event.event, "interaction_disclosure_render_asserted");
  assert.equal(event.schemaVersion, "1.0");
  assert.equal(event.disclosurePolicyId, validInput.disclosurePolicyId);
  assert.equal(event.normalizedNoticeSha256.length, 64);
  assert.equal(Object.isFrozen(event), true);
  assert.equal("userSawDisclosure" in event, false);
  assert.equal("legallySufficient" in event, false);
});

test("normalizes whitespace before hashing the approved notice", () => {
  const first = buildDisclosureAssertion(validInput);
  const second = buildDisclosureAssertion({
    ...validInput,
    noticeText: "  You are interacting\nwith an AI support assistant.  ",
  });

  assert.equal(first.normalizedNoticeSha256, second.normalizedNoticeSha256);
});

test("rejects incomplete or invalid evidence events", () => {
  assert.throws(
    () => buildDisclosureAssertion({ ...validInput, evidenceId: "" }),
    /evidenceId/,
  );
  assert.throws(
    () => buildDisclosureAssertion({ ...validInput, timestamp: "not-a-date" }),
    /timestamp/,
  );
});
