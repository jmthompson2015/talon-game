import Phase from "./Phase.js";
import PhaseStep from "./PhaseStep.js";
import Step from "./Step.js";

QUnit.module("PhaseStep");

QUnit.test("keys by phase impulse", (assert) => {
  // Setup.
  const phaseKey = "impulse";

  // Run.
  const result = PhaseStep[phaseKey];

  // Verify.
  assert.ok(result);
  const length = 5;
  assert.equal(result.length, length);
  assert.equal(R.head(result), Step.REMOVE_SHIELD_REINFORCEMENT);
  assert.equal(R.last(result), Step.REPAIR_CRITICAL_DAMAGE);
});

QUnit.test("keys by phase Power Phase", (assert) => {
  // Setup.
  const phaseKey = Phase.POWER_PHASE;

  // Run.
  const result = PhaseStep[phaseKey];

  // Verify.
  assert.ok(result);
  const length = 2;
  assert.equal(result.length, length);
  assert.equal(R.head(result), Step.CHARGE_WEAPON);
  assert.equal(R.last(result), Step.ADJUST_POWER_CURVE);
});

QUnit.test("keys by phase Reinforcement Phase", (assert) => {
  // Setup.
  const phaseKey = Phase.REINFORCEMENT_PHASE;

  // Run.
  const result = PhaseStep[phaseKey];

  // Verify.
  assert.ok(result);
  const length = 1;
  assert.equal(result.length, length);
  assert.equal(R.head(result), Step.REINFORCEMENT);
});

QUnit.test("keys by phase Retreat Phase", (assert) => {
  // Setup.
  const phaseKey = Phase.RETREAT_PHASE;

  // Run.
  const result = PhaseStep[phaseKey];

  // Verify.
  assert.ok(result);
  const length = 1;
  assert.equal(result.length, length);
  assert.equal(R.head(result), Step.RETREAT);
});

const PhaseStepTest = {};
export default PhaseStepTest;
