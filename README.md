# Article 50 Launch Patch — fictional engineering proof

This small repository demonstrates what a bounded implementation handoff can look like after a buyer's counsel or authorized compliance owner has supplied the approved requirement.

The example product, company, revision, requirement, and evidence are fictional. Nothing here is a client result, legal opinion, audit, certification, or compliance guarantee.

## What is inspectable

- `src/proof-state.mjs` models before-and-after disclosure behavior.
- `test/proof-state.test.mjs` verifies the selected UI behavior and evidence state.
- `example/evidence-example.json` records the fictional revision, surface, checks, and known limitations.

Run the checks with Node.js 20 or later:

```sh
npm test
```

The interactive version and fixed engagement boundary are available at [article50-launch-patch-public.vercel.app](https://article50-launch-patch-public.vercel.app/proof).

## Boundary

The demo tests whether approved product behavior was implemented. It does not determine whether Article 50 applies, select legally sufficient wording, or prove that any real product complies with law. Those decisions remain with the buyer and its qualified advisers.
