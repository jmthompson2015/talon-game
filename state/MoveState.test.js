import MoveState from "./MoveState.js";

QUnit.module("MoveState");

const PROPS = ["moveKey", "shipId", "an1", "an2", "headingKey"];

const createTestData = () =>
  MoveState.create({
    moveKey: 1,
    shipId: 2,
    an1: 3,
    an2: 4,
    headingKey: 5,
  });

QUnit.test("create()", (assert) => {
  // Run.
  const move = createTestData();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(move[prop], i + 1);
  });
});

QUnit.test("create() immutable", (assert) => {
  // Setup.
  const move = createTestData();

  // Run / Verify.
  try {
    move.id = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const PlayerStateTest = {};
export default PlayerStateTest;
