import Die from "./Die.js";

QUnit.module("Die");

QUnit.test("Die.ROLL_TO_UNICODE", (assert) => {
  // Run / Verify.
  assert.ok(Object.keys(Die.ROLL_TO_UNICODE).length, 6);
  assert.ok(Object.values(Die.ROLL_TO_UNICODE).length, 6);
});

QUnit.test("roll()", (assert) => {
  // Run / Verify.
  for (let i = 0; i < 20; i += 1) {
    const roll = Die.roll();
    assert.equal(roll >= 1 && roll <= 6, true, `roll = ${roll}`);
  }
});

QUnit.test("roll() 10", (assert) => {
  // Setup.
  const max = 10;

  // Run / Verify.
  for (let i = 0; i < 20; i += 1) {
    const roll = Die.roll(max);
    assert.equal(roll >= 1 && roll <= max, true, `roll = ${roll}`);
  }
});

const DieTest = {};
export default DieTest;
