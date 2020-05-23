import Phase from "./Phase.js";

QUnit.module("Phase");

QUnit.test("keys and values", (assert) => {
  // Run.
  const result = Phase.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(Phase);

  // Verify.
  ownPropertyNames.forEach((key) => {
    const key2 = Phase[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(Phase.properties[key2], `Missing value for key = ${key}`);
    }
  });

  result.forEach((value) => {
    const p = ownPropertyNames.filter((key) => Phase[key] === value);
    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  });
});

QUnit.test("Phase.keys()", (assert) => {
  // Run.
  const result = Phase.keys();

  // Verify.
  assert.ok(result);
  const length = 9;
  assert.equal(result.length, length);
  assert.equal(R.head(result), Phase.IMPULSE_A);
  assert.equal(R.last(result), Phase.RETREAT_PHASE);
});

const PhaseTest = {};
export default PhaseTest;
