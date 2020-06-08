import Weapon from "./Weapon.js";

QUnit.module("Weapon");

QUnit.test("keys and values", (assert) => {
  // Run.
  const result = Weapon.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(Weapon);

  // Verify.
  ownPropertyNames.forEach((key) => {
    const key2 = Weapon[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(Weapon.properties[key2], `Missing value for key = ${key}`);
    }
  });

  result.forEach((value) => {
    const p = ownPropertyNames.filter((key) => Weapon[key] === value);
    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  });
});

QUnit.test("Weapon.keys()", (assert) => {
  // Run.
  const result = Weapon.keys();

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 6);
  assert.equal(R.head(result), Weapon.ANTI_MATTER_TORPEDO);
  assert.equal(R.last(result), Weapon.WAVE_MOTION_GUN);
});

QUnit.test("Weapon.damage() phaser", (assert) => {
  // Setup.
  const weaponKey = Weapon.PHASER;

  // Run / Verify.
  const range1 = 1;
  assert.equal(Weapon.damage(weaponKey, range1, 1), 1);
  assert.equal(Weapon.damage(weaponKey, range1, 2), 2);
  assert.equal(Weapon.damage(weaponKey, range1, 3), 2);
  assert.equal(Weapon.damage(weaponKey, range1, 4), 2);
  assert.equal(Weapon.damage(weaponKey, range1, 5), 2);
  assert.equal(Weapon.damage(weaponKey, range1, 6), 2);

  const range2 = 2;
  assert.equal(Weapon.damage(weaponKey, range2, 1), 1);
  assert.equal(Weapon.damage(weaponKey, range2, 2), 1);
  assert.equal(Weapon.damage(weaponKey, range2, 3), 1);
  assert.equal(Weapon.damage(weaponKey, range2, 4), 2);
  assert.equal(Weapon.damage(weaponKey, range2, 5), 2);
  assert.equal(Weapon.damage(weaponKey, range2, 6), 2);

  const range3 = 3;
  assert.equal(Weapon.damage(weaponKey, range3, 1), 0);
  assert.equal(Weapon.damage(weaponKey, range3, 2), 0);
  assert.equal(Weapon.damage(weaponKey, range3, 3), 0);
  assert.equal(Weapon.damage(weaponKey, range3, 4), 0);
  assert.equal(Weapon.damage(weaponKey, range3, 5), 1);
  assert.equal(Weapon.damage(weaponKey, range3, 6), 1);

  assert.equal(Weapon.damage(weaponKey, 0, 1), 0);
  assert.equal(Weapon.damage(weaponKey, 0, 6), 0);
  assert.equal(Weapon.damage(weaponKey, 4, 1), 0);
  assert.equal(Weapon.damage(weaponKey, 4, 6), 0);
});

QUnit.test("Weapon.damage() wave motion gun", (assert) => {
  // Setup.
  const weaponKey = Weapon.WAVE_MOTION_GUN;

  // Run / Verify.
  const range2 = 2;
  assert.equal(Weapon.damage(weaponKey, range2, 1), 0);
  assert.equal(Weapon.damage(weaponKey, range2, 2), 10);
  assert.equal(Weapon.damage(weaponKey, range2, 3), 10);
  assert.equal(Weapon.damage(weaponKey, range2, 4), 10);
  assert.equal(Weapon.damage(weaponKey, range2, 5), 10);
  assert.equal(Weapon.damage(weaponKey, range2, 6), 10);

  const range3 = 3;
  assert.equal(Weapon.damage(weaponKey, range3, 1), 0);
  assert.equal(Weapon.damage(weaponKey, range3, 2), 0);
  assert.equal(Weapon.damage(weaponKey, range3, 3), 10);
  assert.equal(Weapon.damage(weaponKey, range3, 4), 10);
  assert.equal(Weapon.damage(weaponKey, range3, 5), 10);
  assert.equal(Weapon.damage(weaponKey, range3, 6), 10);

  const range4 = 4;
  assert.equal(Weapon.damage(weaponKey, range4, 1), 0);
  assert.equal(Weapon.damage(weaponKey, range4, 2), 0);
  assert.equal(Weapon.damage(weaponKey, range4, 3), 10);
  assert.equal(Weapon.damage(weaponKey, range4, 4), 10);
  assert.equal(Weapon.damage(weaponKey, range4, 5), 10);
  assert.equal(Weapon.damage(weaponKey, range4, 6), 10);

  assert.equal(Weapon.damage(weaponKey, 1, 1), 0);
  assert.equal(Weapon.damage(weaponKey, 1, 6), 0);
  assert.equal(Weapon.damage(weaponKey, 5, 1), 0);
  assert.equal(Weapon.damage(weaponKey, 5, 6), 0);
});

const WeaponTest = {};
export default WeaponTest;
