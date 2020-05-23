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
  const length = 6;
  assert.equal(result.length, length);
  assert.equal(R.head(result), Weapon.ANTI_MATTER_TORPEDO);
  assert.equal(R.last(result), Weapon.WAVE_MOTION_GUN);
});

const WeaponTest = {};
export default WeaponTest;
