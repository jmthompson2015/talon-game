import Arc from "./Arc.js";

QUnit.module("Arc");

QUnit.test("keys and values", (assert) => {
  // Run.
  const result = Arc.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(Arc);

  // Verify.
  ownPropertyNames.forEach((key) => {
    const key2 = Arc[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(Arc.properties[key2], `Missing value for key = ${key}`);
    }
  });

  result.forEach((value) => {
    const p = ownPropertyNames.filter((key) => Arc[key] === value);
    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  });
});

QUnit.test("Arc.keys()", (assert) => {
  // Run.
  const result = Arc.keys();

  // Verify.
  assert.ok(result);
  const length = 4;
  assert.equal(result.length, length);
  assert.equal(R.head(result), Arc.FORWARD);
  assert.equal(R.last(result), Arc.LEFT);
});

const ArcTest = {};
export default ArcTest;
