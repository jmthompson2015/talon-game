import PowerState from "./PowerState.js";

QUnit.module("PowerState");

const PROPS = ["powerKey", "shipId", "arcKey", "impulse", "weaponGroupIndex"];

const createTestData = () =>
  PowerState.create({
    powerKey: 1,
    shipId: 2,
    arcKey: 3,
    impulse: 4,
    weaponGroupIndex: 5,
  });

QUnit.test("create()", (assert) => {
  // Run.
  const power = createTestData();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(power[prop], i + 1);
  });
});

QUnit.test("create() immutable", (assert) => {
  // Setup.
  const power = createTestData();

  // Run / Verify.
  try {
    power.id = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const PlayerStateTest = {};
export default PlayerStateTest;
