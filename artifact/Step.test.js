import Phase from "./Phase.js";
import Step from "./Step.js";

QUnit.module("Step");

QUnit.test("keys and values", (assert) => {
  // Run.
  const result = Step.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(Step);

  // Verify.
  ownPropertyNames.forEach((key) => {
    const key2 = Step[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(Step.properties[key2], `Missing value for key = ${key}`);
    }
  });

  result.forEach((value) => {
    const p = ownPropertyNames.filter((key) => Step[key] === value);
    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  });
});

QUnit.test("Step.keys()", (assert) => {
  // Run.
  const result = Step.keys();

  // Verify.
  assert.ok(result);
  const length = 9;
  assert.equal(result.length, length);
  assert.equal(R.head(result), Step.REMOVE_SHIELD_REINFORCEMENT);
  assert.equal(R.last(result), Step.RETREAT);
});

QUnit.test("Step.keysByPhase() Impulse_X", (assert) => {
  // Run.
  const phaseKey = "impulse";
  const result = Step.keysByPhase(phaseKey);

  // Verify.
  assert.ok(result);
  const length = 5;
  assert.equal(result.length, length);
  assert.equal(R.head(result), Step.REMOVE_SHIELD_REINFORCEMENT);
  assert.equal(R.last(result), Step.REPAIR_CRITICAL_DAMAGE);
});

QUnit.test("Step.keysByPhase() Power Phase", (assert) => {
  // Run.
  const phaseKey = Phase.POWER_PHASE;
  const result = Step.keysByPhase(phaseKey);

  // Verify.
  assert.ok(result);
  const length = 2;
  assert.equal(result.length, length);
  assert.equal(R.head(result), Step.CHARGE_WEAPON);
  assert.equal(R.last(result), Step.ADJUST_POWER_CURVE);
});

QUnit.test("Step.valuesByPhase() Impulse_X", (assert) => {
  // Run.
  const phaseKey = "impulse";
  const result = Step.valuesByPhase(phaseKey);

  // Verify.
  assert.ok(result);
  const length = 5;
  assert.equal(result.length, length);
  assert.equal(R.head(result).key, Step.REMOVE_SHIELD_REINFORCEMENT);
  assert.equal(R.last(result).key, Step.REPAIR_CRITICAL_DAMAGE);
});

QUnit.test("Step.valuesByPhase() Power Phase", (assert) => {
  // Run.
  const phaseKey = Phase.POWER_PHASE;
  const result = Step.valuesByPhase(phaseKey);

  // Verify.
  assert.ok(result);
  const length = 2;
  assert.equal(result.length, length);
  assert.equal(R.head(result).key, Step.CHARGE_WEAPON);
  assert.equal(R.last(result).key, Step.ADJUST_POWER_CURVE);
});

const StepTest = {};
export default StepTest;
