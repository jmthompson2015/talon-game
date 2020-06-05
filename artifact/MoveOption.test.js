import MoveOption from "./MoveOption.js";

QUnit.module("MoveOption");

QUnit.test("keys and values", (assert) => {
  // Run.
  const result = MoveOption.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(MoveOption);

  // Verify.
  ownPropertyNames.forEach((key) => {
    const key2 = MoveOption[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(MoveOption.properties[key2], `Missing value for key = ${key}`);
    }
  });

  result.forEach((value) => {
    const p = ownPropertyNames.filter((key) => MoveOption[key] === value);
    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  });
});

QUnit.test("MoveOption.keys()", (assert) => {
  // Run.
  const result = MoveOption.keys();

  // Verify.
  assert.ok(result);
  const length = 5;
  assert.equal(result.length, length);
  assert.equal(R.head(result), MoveOption.MOVE_STRAIGHT);
  assert.equal(R.last(result), MoveOption.TURN_LEFT_AND_MOVE);
});

const MoveOptionTest = {};
export default MoveOptionTest;
