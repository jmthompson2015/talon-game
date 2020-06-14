import Arc from "./Arc.js";
import Board from "./Board.js";
import Heading from "./Heading.js";
import Resolver from "./Resolver.js";

QUnit.module("Board");

QUnit.test("Board.boardCalculator", (assert) => {
  assert.ok(Board.boardCalculator);
});

QUnit.test("Board.coordinateCalculator", (assert) => {
  assert.ok(Board.coordinateCalculator);
});

QUnit.test("cubeDirection() 1", (assert) => {
  // Setup.
  const an1 = "e2";
  const an2 = "e3";

  // Run.
  const result = Board.cubeDirection(an1, an2);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, 0);
  assert.equal(result.y, -1);
  assert.equal(result.z, +1);
});

QUnit.test("cubeDirection() 2", (assert) => {
  // Setup.
  const an1 = "e2";
  const an2 = "e4";

  // Run.
  const result = Board.cubeDirection(an1, an2);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, 0);
  assert.equal(result.y, -1);
  assert.equal(result.z, +1);
});

QUnit.test("cubeDirectionIndex()", (assert) => {
  assert.equal(Board.cubeDirectionIndex("f4", "g4"), 0);
  assert.equal(Board.cubeDirectionIndex("f4", "g3"), 1);
  assert.equal(Board.cubeDirectionIndex("f4", "f3"), 2);
  assert.equal(Board.cubeDirectionIndex("f4", "e4"), 3);
  assert.equal(Board.cubeDirectionIndex("f4", "e5"), 4);
  assert.equal(Board.cubeDirectionIndex("f4", "f5"), 5);
});

QUnit.test("distance()", (assert) => {
  assert.equal(Board.distance("e2", "d3"), 1);
  assert.equal(Board.distance("e2", "e4"), 2);
  assert.equal(Board.distance("e2", "f4"), 3);
  assert.equal(Board.distance("e2", "g4"), 4);
  assert.equal(Board.distance("e2", "h4"), 5);
});

QUnit.test("neighborInDirection()", (assert) => {
  // Setup.
  const an = "f4";

  // Run / Verify.
  assert.equal(Board.neighborInDirection(an, 0), "g4");
  assert.equal(Board.neighborInDirection(an, 1), "g3");
  assert.equal(Board.neighborInDirection(an, 2), "f3");
  assert.equal(Board.neighborInDirection(an, 3), "e4");
  assert.equal(Board.neighborInDirection(an, 4), "e5");
  assert.equal(Board.neighborInDirection(an, 5), "f5");
});

QUnit.test("relativeArc()", (assert) => {
  // Setup.
  const an1 = "f4";
  const heading = Resolver.heading(Heading.THIRTY_DEGREES);
  const an2 = "g4";

  // Run.
  const result = Board.relativeArc(an1, heading, an2);

  // Verify.
  assert.ok(result);
  assert.equal(result, Arc.RIGHT);
});

QUnit.test("relativeArc() heading east", (assert) => {
  // Setup.
  const an1 = "f4";
  const heading = Resolver.heading(Heading.EAST);

  // Run / Verify.
  assert.equal(Board.relativeArc(an1, heading, "g4"), Arc.FORWARD);
  assert.equal(Board.relativeArc(an1, heading, "g3"), Arc.LEFT);
  assert.equal(Board.relativeArc(an1, heading, "f3"), Arc.LEFT);
  assert.equal(Board.relativeArc(an1, heading, "e4"), Arc.REAR);
  assert.equal(Board.relativeArc(an1, heading, "e5"), Arc.RIGHT);
  assert.equal(Board.relativeArc(an1, heading, "f5"), Arc.RIGHT);
});

QUnit.test("relativeArc() heading west", (assert) => {
  // Setup.
  const an1 = "f4";
  const heading = Resolver.heading(Heading.WEST);

  // Run / Verify.
  assert.equal(Board.relativeArc(an1, heading, "e4"), Arc.FORWARD);
  assert.equal(Board.relativeArc(an1, heading, "e5"), Arc.LEFT);
  assert.equal(Board.relativeArc(an1, heading, "f5"), Arc.LEFT);
  assert.equal(Board.relativeArc(an1, heading, "g4"), Arc.REAR);
  assert.equal(Board.relativeArc(an1, heading, "g3"), Arc.RIGHT);
  assert.equal(Board.relativeArc(an1, heading, "f3"), Arc.RIGHT);
});

QUnit.test("relativeArc() heading thirty degrees", (assert) => {
  // Setup.
  const an1 = "f4";
  const heading = Resolver.heading(Heading.THIRTY_DEGREES);

  // Run / Verify.
  assert.equal(Board.relativeArc(an1, heading, "g3"), Arc.FORWARD);
  assert.equal(Board.relativeArc(an1, heading, "f3"), Arc.LEFT);
  assert.equal(Board.relativeArc(an1, heading, "e4"), Arc.LEFT);
  assert.equal(Board.relativeArc(an1, heading, "e5"), Arc.REAR);
  assert.equal(Board.relativeArc(an1, heading, "f5"), Arc.RIGHT);
  assert.equal(Board.relativeArc(an1, heading, "g4"), Arc.RIGHT);
});

const BoardTest = {};
export default BoardTest;
