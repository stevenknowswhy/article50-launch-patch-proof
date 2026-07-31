const states = Object.freeze({
  before: Object.freeze({
    label: "Before patch",
    disclosureVisible: false,
    disclosure: "",
    checks: Object.freeze({
      disclosureAtFirstInteraction: false,
      keyboardReachable: true,
      accessibleNamePresent: true,
      evidenceRecorded: false,
    }),
  }),
  after: Object.freeze({
    label: "After patch",
    disclosureVisible: true,
    disclosure: "You are interacting with an AI support assistant.",
    checks: Object.freeze({
      disclosureAtFirstInteraction: true,
      keyboardReachable: true,
      accessibleNamePresent: true,
      evidenceRecorded: true,
    }),
  }),
});

export function buildDemoState(name) {
  const state = states[name];
  if (!state) throw new RangeError("state must be before or after");
  return structuredClone(state);
}
