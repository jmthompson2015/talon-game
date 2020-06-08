import WeaponState from "./WeaponState.js";

QUnit.module("WeaponState");

const PROPS = ["weaponKey", "attackerId", "weaponGroupIndex", "defenderIds"];

const createTestData = () =>
  WeaponState.create({
    weaponKey: 1,
    attackerId: 2,
    weaponGroupIndex: 3,
    defenderIds: 4,
  });

QUnit.test("create()", (assert) => {
  // Run.
  const weapon = createTestData();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(weapon[prop], i + 1);
  });
});

QUnit.test("create() immutable", (assert) => {
  // Setup.
  const weapon = createTestData();

  // Run / Verify.
  try {
    weapon.id = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const PlayerStateTest = {};
export default PlayerStateTest;
