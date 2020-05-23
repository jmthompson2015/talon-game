import Hull from "./Hull.js";

QUnit.module("Hull");

QUnit.test("Hull properties Heavy Cruiser", (assert) => {
  const shipKey = Hull.HEAVY_CRUISER;
  const properties = Hull.properties[shipKey];
  assert.equal(properties.name, "Heavy Cruiser");
  assert.equal(properties.abbreviation, "CA");
  assert.equal(properties.explosion, 3);
  assert.equal(properties.key, "heavyCruiser");
});

QUnit.test("keys and values", (assert) => {
  // Run.
  const result = Hull.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(Hull);

  // Verify.
  ownPropertyNames.forEach((key) => {
    const key2 = Hull[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(Hull.properties[key2], `Missing value for key = ${key}`);
    }
  });

  result.forEach((value) => {
    const p = ownPropertyNames.filter((key) => Hull[key] === value);
    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  });
});

QUnit.test("Hull.keys()", (assert) => {
  // Run.
  const result = Hull.keys();

  // Verify.
  assert.ok(result);
  const length = 12;
  assert.equal(result.length, length);
  assert.equal(R.head(result), Hull.BASE);
  assert.equal(R.last(result), Hull.TRANSPORT);
});

const HullTest = {};
export default HullTest;
