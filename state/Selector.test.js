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

QUnit.test("shipAfterburners()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const afterburners = 4;
  const action = ActionCreator.setShipAfterburners(shipId, afterburners);
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipAfterburners(shipId, state);

  // Verify.
  assert.equal(result, afterburners);
});

QUnit.test("shipArcReinforcements()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const arcKey = Arc.FORWARD;
  const reinforcements = 4;
  const action = ActionCreator.setShipArcReinforcements(
    shipId,
    arcKey,
    reinforcements
  );
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipArcReinforcements(shipId, arcKey, state);

  // Verify.
  assert.equal(result, reinforcements);
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

QUnit.test("shipBatteries()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const batteries = 4;
  const action = ActionCreator.setShipBatteries(shipId, batteries);
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipBatteries(shipId, state);

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

QUnit.test("shipHulls()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const hulls = 4;
  const action = ActionCreator.setShipHulls(shipId, hulls);
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipHulls(shipId, state);

  // Verify.
  assert.equal(result, hulls);
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

QUnit.test("shipPowerCurve()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const shipId = 3;
  const powerCurve = 4;
  const action = ActionCreator.setShipPowerCurve(shipId, powerCurve);
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.shipPowerCurve(shipId, state);

  // Verify.
  assert.equal(result, powerCurve);
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
