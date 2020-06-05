import Heading from "./Heading.js";

QUnit.module("Heading");

QUnit.test("keys and values", (assert) => {
  // Run.
  const result = Heading.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(Heading);

  // Verify.
  ownPropertyNames.forEach((key) => {
    const key2 = Heading[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(Heading.properties[key2], `Missing value for key = ${key}`);
    }
  });

  result.forEach((value) => {
    const p = ownPropertyNames.filter((key) => Heading[key] === value);
    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  });
});

QUnit.test("Heading.keys()", (assert) => {
  // Run.
  const result = Heading.keys();

  // Verify.
  assert.ok(result);
  const length = 6;
  assert.equal(result.length, length);
  assert.equal(R.head(result), Heading.THIRTY_DEGREES);
  assert.equal(R.last(result), Heading.THREE_THIRTY_DEGREES);
});

QUnit.test("Heading.left()", (assert) => {
  // Run / Verify.
  assert.equal(
    Heading.left(Heading.THIRTY_DEGREES),
    Heading.THREE_THIRTY_DEGREES
  );
  assert.equal(Heading.left(Heading.EAST), Heading.THIRTY_DEGREES);
  assert.equal(Heading.left(Heading.ONE_FIFTY_DEGREES), Heading.EAST);
  assert.equal(
    Heading.left(Heading.TWO_TEN_DEGREES),
    Heading.ONE_FIFTY_DEGREES
  );
  assert.equal(Heading.left(Heading.WEST), Heading.TWO_TEN_DEGREES);
  assert.equal(Heading.left(Heading.THREE_THIRTY_DEGREES), Heading.WEST);
});

QUnit.test("Heading.right()", (assert) => {
  // Run / Verify.
  assert.equal(Heading.right(Heading.THIRTY_DEGREES), Heading.EAST);
  assert.equal(Heading.right(Heading.EAST), Heading.ONE_FIFTY_DEGREES);
  assert.equal(
    Heading.right(Heading.ONE_FIFTY_DEGREES),
    Heading.TWO_TEN_DEGREES
  );
  assert.equal(Heading.right(Heading.TWO_TEN_DEGREES), Heading.WEST);
  assert.equal(Heading.right(Heading.WEST), Heading.THREE_THIRTY_DEGREES);
  assert.equal(
    Heading.right(Heading.THREE_THIRTY_DEGREES),
    Heading.THIRTY_DEGREES
  );
});

const HeadingTest = {};
export default HeadingTest;
