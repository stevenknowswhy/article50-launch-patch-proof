import { createHash } from "node:crypto";

function requireText(value, name) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new TypeError(`${name} must be a non-empty string`);
  }
  return value.trim();
}

function normalizeNotice(value) {
  return requireText(value, "noticeText").replace(/\s+/g, " ");
}

export function buildDisclosureAssertion(input) {
  if (!input || typeof input !== "object") {
    throw new TypeError("input must be an object");
  }

  const notice = normalizeNotice(input.noticeText);
  const timestamp = requireText(input.timestamp, "timestamp");
  if (Number.isNaN(Date.parse(timestamp))) {
    throw new TypeError("timestamp must be an ISO-8601 date-time");
  }

  return Object.freeze({
    schemaVersion: "1.0",
    event: "interaction_disclosure_render_asserted",
    disclosurePolicyId: requireText(input.disclosurePolicyId, "disclosurePolicyId"),
    renderVersion: requireText(input.renderVersion, "renderVersion"),
    surface: requireText(input.surface, "surface"),
    locale: requireText(input.locale, "locale"),
    evidenceId: requireText(input.evidenceId, "evidenceId"),
    timestamp,
    normalizedNoticeSha256: createHash("sha256").update(notice).digest("hex"),
  });
}
