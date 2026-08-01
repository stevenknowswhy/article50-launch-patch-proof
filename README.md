# EU AI Act Article 50 Launch Patch — fictional TypeScript/JavaScript engineering proof

[![Test proof](https://github.com/stevenknowswhy/article50-launch-patch-proof/actions/workflows/test.yml/badge.svg)](https://github.com/stevenknowswhy/article50-launch-patch-proof/actions/workflows/test.yml)

This small repository demonstrates what a bounded implementation handoff can look like after a buyer's counsel or authorized compliance owner has supplied the approved requirement.

The example product, company, revision, requirement, and evidence are fictional. Nothing here is a client result, legal opinion, audit, certification, or compliance guarantee.

## August 2026 implementation path

The European Commission's 20 July 2026 guidelines state that the AI Act Article 50 transparency obligations apply from 2 August 2026. This repository does not determine whether those obligations apply to a product. It gives technical teams an inspectable implementation pattern after qualified counsel or an authorized compliance owner has made that decision and approved the wording and acceptance criteria.

- [Read Article 50 in the EU AI Act Service Desk](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50).
- [Read the Commission's Article 50 transparency guidelines](https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems).
- [Try the interactive fictional proof](https://article50-launch-patch-public.vercel.app/proof).
- [Build a private engineering surface inventory](https://article50-launch-patch-public.vercel.app/surface-map) for up to three product surfaces; answers stay in the browser unless deliberately copied, downloaded, or emailed.
- [Run the private 60-second technical fit check](https://article50-launch-patch-public.vercel.app/fit-check).
- [Inspect the pinned inbound voice-agent proof](https://github.com/stevenknowswhy/article50-voice-agent-proof/releases/tag/v1.0.0), a secrets-free LiveKit and Vapi reference with AI disclosure, consent, opt-out, private-checkout, and raw-value logging guardrails. It creates no live phone resource and makes no legal determination.

## What is inspectable

- `src/proof-state.mjs` models before-and-after disclosure behavior.
- `src/disclosure-event.mjs` builds a minimal, immutable render-assertion event that binds an approved notice to a policy, build, surface, locale, evidence ID, timestamp, and normalized notice hash.
- `test/proof-state.test.mjs` verifies the selected UI behavior and evidence state.
- `example/evidence-example.json` records the fictional revision, surface, checks, and known limitations.
- [Issue #1](https://github.com/stevenknowswhy/article50-launch-patch-proof/issues/1) gives technical buyers a six-step TypeScript/JavaScript implementation handoff checklist.

Run the checks with Node.js 20 or later:

```sh
npm test
```

Inspect the [interactive fictional proof](https://article50-launch-patch-public.vercel.app/proof) or the [fixed engagement boundary](https://article50-launch-patch-public.vercel.app/).

## Reusable CI evidence guard

This repository also ships a dependency-free GitHub Action that validates the structure of a buyer-approved implementation-evidence manifest and requires every recorded technical check to pass. It deliberately rejects top-level compliance assertions and any manifest that says it contains a legal determination.

```yaml
- name: Validate implementation evidence
  uses: stevenknowswhy/article50-launch-patch-proof@v1.2.0
  with:
    manifest-path: example/evidence-example.json
```

Copy `example/evidence-example.json`, keep the legal determination flag `false`, name the approved source and product revision, record the implemented behavior and checks, and state known limitations. A passing Action means only that those fields and passing technical checks are present. It is not an applicability decision, legal opinion, audit, certification, or compliance guarantee.

Counsel, compliance advisors, and product studios with a named buyer and approved requirement can use the [partner handoff](https://article50-launch-patch-public.vercel.app/#partners). The advisor retains the client and interpretation relationship; Forhemit takes only the bounded production implementation.

## Evidence-event boundary

The event is deliberately named `interaction_disclosure_render_asserted`. A server-side receipt can record that an authenticated integration asserted a render event; it does not prove that a person perceived the notice or that the wording is legally sufficient. A real handoff should pair this event with automated UI evidence for the approved interaction state and keep direct identifiers out of the event where a pseudonymous evidence ID will do.

## Boundary

The demo tests whether approved product behavior was implemented. It does not determine whether Article 50 applies, select legally sufficient wording, or prove that any real product complies with law. Those decisions remain with the buyer and its qualified advisers.
