import Heading from "../artifact/Heading.js";
import MoveOption from "../artifact/MoveOption.js";

import ActionCreator from "../state/ActionCreator.js";
import MoveState from "../state/MoveState.js";
import Selector from "../state/Selector.js";

import MoveFunction from "./MoveFunction.js";
import TestData from "./TestData.js";

QUnit.module("MoveFunction");

QUnit.test("execute() move straight", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const moveKey = MoveOption.MOVE_STRAIGHT;
  const shipId = 1; // TERRAN_CA
  const an1 = "a10";
  const an2 = "b10";
  const moveState = MoveState.create({ moveKey, shipId, an1, an2 });

  // Run.
  MoveFunction[moveKey].execute(moveState, store);

  // Verify.
  assert.equal(Selector.shipAN(shipId, store.getState()), an2);
  assert.equal(
    Selector.shipHeading(shipId, store.getState()).key,
    Heading.THIRTY_DEGREES
  );
});

QUnit.test("execute() side slip right", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const moveKey = MoveOption.SIDE_SLIP_RIGHT;
  const shipId = 1; // TERRAN_CA
  const an1 = "a10";
  const an2 = "b9";
  const moveState = MoveState.create({ moveKey, shipId, an1, an2 });

  // Run.
  MoveFunction[moveKey].execute(moveState, store);

  // Verify.
  assert.equal(Selector.shipAN(shipId, store.getState()), an2);
  assert.equal(
    Selector.shipHeading(shipId, store.getState()).key,
    Heading.THIRTY_DEGREES
  );
});

QUnit.test("execute() side slip left", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const moveKey = MoveOption.SIDE_SLIP_LEFT;
  const shipId = 1; // TERRAN_CA
  const an1 = "a10";
  const an2 = "a11";
  const moveState = MoveState.create({ moveKey, shipId, an1, an2 });

  // Run.
  MoveFunction[moveKey].execute(moveState, store);

  // Verify.
  assert.equal(Selector.shipAN(shipId, store.getState()), an2);
  assert.equal(
    Selector.shipHeading(shipId, store.getState()).key,
    Heading.THIRTY_DEGREES
  );
});

QUnit.test("execute() turn right and move", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const moveKey = MoveOption.TURN_RIGHT_AND_MOVE;
  const shipId = 1; // TERRAN_CA
  const an1 = "a10";
  const an2 = "b9";
  const headingKey = Heading.EAST;
  const moveState = MoveState.create({ moveKey, shipId, an1, an2, headingKey });

  // Run.
  MoveFunction[moveKey].execute(moveState, store);

  // Verify.
  assert.equal(Selector.shipAN(shipId, store.getState()), an2);
  assert.equal(Selector.shipHeading(shipId, store.getState()).key, headingKey);
});

QUnit.test("execute() turn left and move", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const moveKey = MoveOption.TURN_LEFT_AND_MOVE;
  const shipId = 1; // TERRAN_CA
  const an1 = "a10";
  const an2 = "a11";
  const headingKey = Heading.THREE_THIRTY_DEGREES;
  const moveState = MoveState.create({ moveKey, shipId, an1, an2, headingKey });

  // Run.
  MoveFunction[moveKey].execute(moveState, store);

  // Verify.
  assert.equal(Selector.shipAN(shipId, store.getState()), an2);
  assert.equal(Selector.shipHeading(shipId, store.getState()).key, headingKey);
});

// /////////////////////////////////////////////////////////////////////////////
QUnit.test("isLegal() move straight", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const moveOption = MoveOption.MOVE_STRAIGHT;
  const shipId = 1; // TERRAN_CA

  // Run.
  const result1 = MoveFunction[moveOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result1, true);
});

QUnit.test("isLegal() side slip right", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const moveOption = MoveOption.SIDE_SLIP_RIGHT;
  const shipId = 1; // TERRAN_CA

  // Run.
  const result1 = MoveFunction[moveOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result1, false);

  // Run.
  store.dispatch(ActionCreator.setShipSideSlipped(shipId, true));
  const result2 = MoveFunction[moveOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result2, true);
});

QUnit.test("isLegal() side slip left", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const moveOption = MoveOption.SIDE_SLIP_LEFT;
  const shipId = 1; // TERRAN_CA

  // Run.
  const result1 = MoveFunction[moveOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result1, false);

  // Run.
  store.dispatch(ActionCreator.setShipSideSlipped(shipId, true));
  const result2 = MoveFunction[moveOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result2, true);
});

QUnit.test("isLegal() turn right and move", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const moveOption = MoveOption.TURN_RIGHT_AND_MOVE;
  const shipId = 1; // TERRAN_CA

  // Run.
  const result1 = MoveFunction[moveOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result1, true);

  // Run.
  store.dispatch(ActionCreator.setShipCurrentTurnRadius(shipId, 2));
  const result2 = MoveFunction[moveOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result2, false);
});

QUnit.test("isLegal() turn left and move", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const moveOption = MoveOption.TURN_LEFT_AND_MOVE;
  const shipId = 1; // TERRAN_CA

  // Run.
  const result1 = MoveFunction[moveOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result1, true);

  // Run.
  store.dispatch(ActionCreator.setShipCurrentTurnRadius(shipId, 2));
  const result2 = MoveFunction[moveOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result2, false);
});

// /////////////////////////////////////////////////////////////////////////////
QUnit.test("label() move straight", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const moveKey = MoveOption.MOVE_STRAIGHT;
  const shipId = 1; // TERRAN_CA
  const moveState = MoveState.create({ moveKey, shipId });

  // Run.
  const result = MoveFunction[moveKey].label(moveState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon move straight");
});

QUnit.test("label() side slip right", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const moveKey = MoveOption.SIDE_SLIP_RIGHT;
  const shipId = 1; // TERRAN_CA
  const moveState = MoveState.create({ moveKey, shipId });

  // Run.
  const result = MoveFunction[moveKey].label(moveState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon side slip right");
});

QUnit.test("label() side slip left", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const moveKey = MoveOption.SIDE_SLIP_LEFT;
  const shipId = 1; // TERRAN_CA
  const moveState = MoveState.create({ moveKey, shipId });

  // Run.
  const result = MoveFunction[moveKey].label(moveState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon side slip left");
});

QUnit.test("label() turn right and move", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const moveKey = MoveOption.TURN_RIGHT_AND_MOVE;
  const shipId = 1; // TERRAN_CA
  const moveState = MoveState.create({ moveKey, shipId });

  // Run.
  const result = MoveFunction[moveKey].label(moveState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon turn right and move");
});

QUnit.test("label() turn left and move", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const moveKey = MoveOption.TURN_LEFT_AND_MOVE;
  const shipId = 1; // TERRAN_CA
  const moveState = MoveState.create({ moveKey, shipId });

  // Run.
  const result = MoveFunction[moveKey].label(moveState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon turn left and move");
});

const MoveFunctionTest = {};
export default MoveFunctionTest;
