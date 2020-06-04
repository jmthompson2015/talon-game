import PowerState from "./PowerState.js";

QUnit.module("PowerState");

const PROPS = ["powerKey", "shipId", "arcKey", "impulse", "weaponIndex"];

const createTestData = () =>
  PowerState.create({
    powerKey: 1,
    shipId: 2,
    arcKey: 3,
    impulse: 4,
    weaponIndex: 5,
  });

QUnit.test("create()", (assert) => {
  // Run.
  const power = createTestData();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(power[prop], i + 1);
  });
});

const PlayerStateTest = {};
export default PlayerStateTest;
