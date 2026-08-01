function text(value) {
  return typeof value === "string" && value.trim() !== "";
}

function requireText(errors, value, path) {
  if (!text(value)) errors.push(`${path} must be a non-empty string`);
}

export function validateEvidenceManifest(manifest) {
  const errors = [];
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    return { valid: false, errors: ["manifest must be a JSON object"] };
  }

  if (manifest.schemaVersion !== "1.0") errors.push("schemaVersion must equal 1.0");
  if (!new Set(["fictional-example", "implementation-evidence"]).has(manifest.classification)) {
    errors.push("classification must be fictional-example or implementation-evidence");
  }

  requireText(errors, manifest.product?.name, "product.name");
  requireText(errors, manifest.product?.surface, "product.surface");
  requireText(errors, manifest.product?.repository, "product.repository");
  requireText(errors, manifest.product?.stagingRevision, "product.stagingRevision");
  requireText(errors, manifest.scope?.source, "scope.source");
  requireText(errors, manifest.scope?.approvedText, "scope.approvedText");
  if (manifest.scope?.legalDeterminationIncluded !== false) {
    errors.push("scope.legalDeterminationIncluded must equal false");
  }

  requireText(errors, manifest.implementation?.route, "implementation.route");
  requireText(errors, manifest.implementation?.component, "implementation.component");
  requireText(errors, manifest.implementation?.behavior, "implementation.behavior");

  if (manifest.verification?.result !== "pass") {
    errors.push("verification.result must equal pass");
  }
  if (!Array.isArray(manifest.verification?.checks) || manifest.verification.checks.length === 0) {
    errors.push("verification.checks must contain at least one check");
  } else {
    manifest.verification.checks.forEach((check, index) => {
      requireText(errors, check?.name, `verification.checks[${index}].name`);
      requireText(errors, check?.method, `verification.checks[${index}].method`);
      if (check?.result !== "pass") {
        errors.push(`verification.checks[${index}].result must equal pass`);
      }
    });
  }

  if (!Array.isArray(manifest.limitations) || manifest.limitations.length === 0) {
    errors.push("limitations must contain at least one explicit boundary");
  } else if (manifest.limitations.some((item) => !text(item))) {
    errors.push("every limitations entry must be a non-empty string");
  }

  for (const prohibited of ["compliant", "complianceStatus", "legallySufficient", "article50Applies"]) {
    if (Object.hasOwn(manifest, prohibited)) {
      errors.push(`${prohibited} is prohibited because this manifest cannot make a legal conclusion`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    surface: manifest.product?.surface || "",
    buildRevision: manifest.product?.stagingRevision || "",
  };
}
