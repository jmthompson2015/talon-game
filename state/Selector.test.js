import Arc from "../artifact/Arc.js";

import AppState from "./AppState.js";
import ActionCreator from "./ActionCreator.js";
import Reducer from "./Reducer.js";
import Selector from "./Selector.js";

QUnit.module("Selector");

QUnit.test("delay()", (assert) => {
  // Setup.
  const state = AppState.create();

  // Run.
  const result = Selector.delay(state);

  // Verify.
  assert.equal(result, 1000);
});

QUnit.test("isShipArcReinforced()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const arcKey = Arc.FORWARD;
  const isReinforced = true;
  const action = ActionCreator.setShipArcReinforced(
    shipId,
    arcKey,
    isReinforced
  );
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.isShipArcReinforced(shipId, arcKey, state);

  // Verify.
  assert.equal(result, isReinforced);
});

QUnit.test("isShipSideSlipped()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const isSideSlipped = true;
  const action = ActionCreator.setShipSideSlipped(shipId, isSideSlipped);
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.isShipSideSlipped(shipId, state);

  // Verify.
  assert.equal(result, isSideSlipped);
});

QUnit.test("shipAfterburnerCount()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const afterburners = 4;
  const action = ActionCreator.setShipAfterburnerCount(shipId, afterburners);
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipAfterburnerCount(shipId, state);

  // Verify.
  assert.equal(result, afterburners);
});

QUnit.test("shipArcShieldCount()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const arcKey = Arc.FORWARD;
  const shieldCount = 4;
  const action = ActionCreator.setShipArcShieldCount(
    shipId,
    arcKey,
    shieldCount
  );
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipArcShieldCount(shipId, arcKey, state);

  // Verify.
  assert.equal(result, shieldCount);
});

QUnit.test("shipBatteryCount()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const batteries = 4;
  const action = ActionCreator.setShipBatteryCount(shipId, batteries);
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipBatteryCount(shipId, state);

  // Verify.
  assert.equal(result, batteries);
});

QUnit.test("shipChangeInitiativeCount()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const changeInitiativeCount = 4;
  const action = ActionCreator.setShipChangeInitiativeCount(
    shipId,
    changeInitiativeCount
  );
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipChangeInitiativeCount(shipId, state);

  // Verify.
  assert.equal(result, changeInitiativeCount);
});

QUnit.test("shipDefendInitiativeCount()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const defendInitiativeCount = 4;
  const action = ActionCreator.setShipDefendInitiativeCount(
    shipId,
    defendInitiativeCount
  );
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipDefendInitiativeCount(shipId, state);

  // Verify.
  assert.equal(result, defendInitiativeCount);
});

QUnit.test("shipHullIndex()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const hullIndex = 4;
  const action = ActionCreator.setShipHullIndex(shipId, hullIndex);
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipHullIndex(shipId, state);

  // Verify.
  assert.equal(result, hullIndex);
});

QUnit.test("shipMissiles()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const missiles = 4;
  const action = ActionCreator.setShipMissiles(shipId, missiles);
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipMissiles(shipId, state);

  // Verify.
  assert.equal(result, missiles);
});

QUnit.test("shipPowerCurveIndex()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const powerCurveIndex = 4;
  const action = ActionCreator.setShipPowerCurveIndex(shipId, powerCurveIndex);
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipPowerCurveIndex(shipId, state);

  // Verify.
  assert.equal(result, powerCurveIndex);
});

QUnit.test("shipTurnRadius()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const turnRadius = 4;
  const action = ActionCreator.setShipTurnRadius(shipId, turnRadius);
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipTurnRadius(shipId, state);

  // Verify.
  assert.equal(result, turnRadius);
});

QUnit.test("shipWeaponIndexRed()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const weaponIndex = 4;
  const redCount = 5;
  const action = ActionCreator.setShipWeaponIndexRed(
    shipId,
    weaponIndex,
    redCount
  );
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipWeaponIndexRed(shipId, weaponIndex, state);

  // Verify.
  assert.equal(result, redCount);
});

QUnit.test("shipWeaponIndexYellow()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const weaponIndex = 4;
  const yellowCount = 5;
  const action = ActionCreator.setShipWeaponIndexYellow(
    shipId,
    weaponIndex,
    yellowCount
  );
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipWeaponIndexYellow(shipId, weaponIndex, state);

  // Verify.
  assert.equal(result, yellowCount);
});

const ReducerTest = {};
export default ReducerTest;
