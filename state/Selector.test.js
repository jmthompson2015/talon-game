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

QUnit.test("shipChangeInitiatives()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const changeInitiatives = 4;
  const action = ActionCreator.setShipChangeInitiatives(
    shipId,
    changeInitiatives
  );
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipChangeInitiatives(shipId, state);

  // Verify.
  assert.equal(result, changeInitiatives);
});

QUnit.test("shipDefendInitiatives()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const defendInitiatives = 4;
  const action = ActionCreator.setShipDefendInitiatives(
    shipId,
    defendInitiatives
  );
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipDefendInitiatives(shipId, state);

  // Verify.
  assert.equal(result, defendInitiatives);
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

QUnit.test("shipSideSlips()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const sideSlips = 4;
  const action = ActionCreator.setShipSideSlips(shipId, sideSlips);
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipSideSlips(shipId, state);

  // Verify.
  assert.equal(result, sideSlips);
});

QUnit.test("shipTurnRadiusMarkers()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const markers = 4;
  const action = ActionCreator.setShipTurnRadiusMarkers(shipId, markers);
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipTurnRadiusMarkers(shipId, state);

  // Verify.
  assert.equal(result, markers);
});

QUnit.test("shipWeaponGroups()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const weaponGroups = 4;
  const action = ActionCreator.setShipWeaponGroups(shipId, weaponGroups);
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipWeaponGroups(shipId, state);

  // Verify.
  assert.equal(result, weaponGroups);
});

const ReducerTest = {};
export default ReducerTest;
