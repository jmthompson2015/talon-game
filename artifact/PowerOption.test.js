import PowerOption from "./PowerOption.js";

QUnit.module("PowerOption");

QUnit.test("keys and values", (assert) => {
  // Run.
  const result = PowerOption.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(PowerOption);

  // Verify.
  ownPropertyNames.forEach((key) => {
    const key2 = PowerOption[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(PowerOption.properties[key2], `Missing value for key = ${key}`);
    }
  });

  result.forEach((value) => {
    const p = ownPropertyNames.filter((key) => PowerOption[key] === value);
    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  });
});

QUnit.test("PowerOption.keys()", (assert) => {
  // Run.
  const result = PowerOption.keys();

  // Verify.
  assert.ok(result);
  const length = 10;
  assert.equal(result.length, length);
  assert.equal(R.head(result), PowerOption.CHANGE_INITIATIVE);
  assert.equal(R.last(result), PowerOption.TRANSMIT_POWER);
});

const PowerOptionTest = {};
export default PowerOptionTest;
