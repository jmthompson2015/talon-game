import Arc from "../artifact/Arc.js";

import StateUtilities from "./StateUtilities.js";

QUnit.module("StateUtilities");

QUnit.test("create() immutable", (assert) => {
  // Setup.
  const shipId = 2;
  const arcKey = Arc.FORWARD;

  // Run.
  const result = StateUtilities.shipArcKey(shipId, arcKey);

  // Verify.
  assert.ok(result, `result = ${result}`);
  assert.equal(result, "2forward");
});

const StateUtilitiesTest = {};
export default StateUtilitiesTest;
