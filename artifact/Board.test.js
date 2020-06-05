import Board from "./Board.js";

QUnit.module("Board");

QUnit.test("Board.boardCalculator", (assert) => {
  assert.ok(Board.boardCalculator);
});

QUnit.test("Board.coordinateCalculator", (assert) => {
  assert.ok(Board.coordinateCalculator);
});

QUnit.test("neighborInDirection()", (assert) => {
  // Setup.
  const an = "f4";
  const directionIndex = 5;

  // Run.
  const result = Board.neighborInDirection(an, directionIndex);

  // Verify.
  assert.equal(result, "f5");

  assert.equal(Board.neighborInDirection(an, 0), "g4");
  assert.equal(Board.neighborInDirection(an, 1), "g3");
  assert.equal(Board.neighborInDirection(an, 2), "f3");
  assert.equal(Board.neighborInDirection(an, 3), "e4");
  assert.equal(Board.neighborInDirection(an, 4), "e5");
  assert.equal(Board.neighborInDirection(an, 5), "f5");
});

const BoardTest = {};
export default BoardTest;
