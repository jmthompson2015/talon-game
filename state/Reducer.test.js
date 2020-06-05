import Arc from "../artifact/Arc.js";

import AppState from "./AppState.js";
import ActionCreator from "./ActionCreator.js";
import Reducer from "./Reducer.js";
import ShipState from "./ShipState.js";

QUnit.module("Reducer");

QUnit.test("addGameRecord()", (assert) => {
  // Setup.
  const state01 = AppState.create();
  const action01 = ActionCreator.setCurrentRound(1);
  const state0 = Reducer.root(state01, action01);
  const action0 = ActionCreator.addGameRecord("first game record");

  // Run.
  const result0 = Reducer.root(state0, action0);

  // Verify.
  assert.ok(result0);
  const { gameRecords: gameRecords0 } = result0;
  assert.ok(gameRecords0);
  assert.equal(gameRecords0.length, 1);
  assert.equal(gameRecords0[0].currentRound, 1);
  assert.equal(gameRecords0[0].message, "first game record");

  // Setup.
  const action02 = ActionCreator.setCurrentRound(2);
  const state02 = Reducer.root(result0, action02);
  const action1 = ActionCreator.addGameRecord("second game record");

  // Run.
  const result1 = Reducer.root(state02, action1);

  // Verify.
  assert.ok(result1);
  const { gameRecords: gameRecords1 } = result1;
  assert.ok(gameRecords1);
  assert.equal(gameRecords1.length, 2);
  assert.equal(gameRecords0[0].currentRound, 1);
  assert.equal(gameRecords0[0].message, "first game record");
  assert.equal(gameRecords1[1].currentRound, 2);
  assert.equal(gameRecords1[1].message, "second game record");
});

QUnit.test("setCurrentPhase()", (assert) => {
  // Setup.
  const state = AppState.create();
  const phaseKey = "bogus";
  const action = ActionCreator.setCurrentPhase(phaseKey);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.currentPhaseKey, phaseKey);
});

QUnit.test("setCurrentPlayer()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 12;
  const action = ActionCreator.setCurrentPlayer(playerId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.currentPlayerId, playerId);
});

QUnit.test("setCurrentPlayerOrder()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerIds = [4, 3, 2, 1];
  const action = ActionCreator.setCurrentPlayerOrder(playerIds);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.currentPlayerOrder.join(), playerIds.join());
});

QUnit.test("setCurrentRound()", (assert) => {
  // Setup.
  const state = AppState.create();
  const round = 123;
  const action = ActionCreator.setCurrentRound(round);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.currentRound, round);
});

QUnit.test("setCurrentStep()", (assert) => {
  // Setup.
  const state = AppState.create();
  const stepKey = 12;
  const action = ActionCreator.setCurrentStep(stepKey);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.currentStepKey, stepKey);
});

QUnit.test("setDelay()", (assert) => {
  // Setup.
  const state = AppState.create();
  const delay = 12;
  const action = ActionCreator.setDelay(delay);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.delay, delay);
});

QUnit.test("setInitiativePlayer()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 3;
  const action = ActionCreator.setInitiativePlayer(playerId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.initiativePlayerId, playerId);
});

QUnit.test("setShip()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const an1 = "a1";
  const shipId = 1;
  const shipKey = "terranCA";
  const ship = ShipState.create({ id: shipId, shipKey });
  const action0 = ActionCreator.addShip(ship);
  const state = Reducer.root(state0, action0);
  const action = ActionCreator.setShip(an1, shipId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const unit = result.anToTokens[an1];
  assert.ok(unit);
  assert.equal(unit, shipId);
});

QUnit.test("setShipAfterburnerCount()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const afterburnerCount = 2;
  const action = ActionCreator.setShipAfterburnerCount(
    shipId,
    afterburnerCount
  );

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipToAfterburnerCount[shipId], afterburnerCount);
});

QUnit.test("setShipArcReinforceImpulse()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const arcKey = Arc.FORWARD;
  const impulse = "B";
  const action = ActionCreator.setShipArcReinforceImpulse(
    shipId,
    arcKey,
    impulse
  );

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipArcToReinforceImpulse[`${shipId}${arcKey}`], impulse);
});

QUnit.test("setShipArcShieldCount()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const arcKey = Arc.FORWARD;
  const shieldCount = 3;
  const action = ActionCreator.setShipArcShieldCount(
    shipId,
    arcKey,
    shieldCount
  );

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipArcToShieldCount[`${shipId}${arcKey}`], shieldCount);
});

QUnit.test("setShipBatteryCount()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const batteryCount = 2;
  const action = ActionCreator.setShipBatteryCount(shipId, batteryCount);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipToBatteryCount[shipId], batteryCount);
});

QUnit.test("setShipChangeInitiativeCount()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const changeInitiativeCount = 2;
  const action = ActionCreator.setShipChangeInitiativeCount(
    shipId,
    changeInitiativeCount
  );

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(
    result.shipToChangeInitiativeCount[shipId],
    changeInitiativeCount
  );
});

QUnit.test("setShipCurrentTurnRadius()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const turnRadius = 2;
  const action = ActionCreator.setShipCurrentTurnRadius(shipId, turnRadius);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipToCurrentTurnRadius[shipId], turnRadius);
});

QUnit.test("setShipDefendInitiativeCount()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const defendInitiativeCount = 2;
  const action = ActionCreator.setShipDefendInitiativeCount(
    shipId,
    defendInitiativeCount
  );

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.ok(result.shipToDefendInitiativeCount);
  assert.equal(
    result.shipToDefendInitiativeCount[shipId],
    defendInitiativeCount
  );
});

QUnit.test("setShipHeading()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const headingKey = 2;
  const action = ActionCreator.setShipHeading(shipId, headingKey);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipToHeading[shipId], headingKey);
});

QUnit.test("setShipHullIndex()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const hullIndex = 2;
  const action = ActionCreator.setShipHullIndex(shipId, hullIndex);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipToHullIndex[shipId], hullIndex);
});

QUnit.test("setShipMissiles()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const missiles = 2;
  const action = ActionCreator.setShipMissiles(shipId, missiles);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipToMissiles[shipId], missiles);
});

QUnit.test("setShipPowerCurveIndex()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const powerCurveIndex = 2;
  const action = ActionCreator.setShipPowerCurveIndex(shipId, powerCurveIndex);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipToPowerCurveIndex[shipId], powerCurveIndex);
});

QUnit.test("setShipSideSlipped()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const isSideSlipped = true;
  const action = ActionCreator.setShipSideSlipped(shipId, isSideSlipped);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipToIsSideSlipped[shipId], isSideSlipped);
});

QUnit.test("setShipWeaponIndexRed()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const weaponIndex = 2;
  const redCount = 3;
  const action = ActionCreator.setShipWeaponIndexRed(
    shipId,
    weaponIndex,
    redCount
  );

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(
    result.shipWeaponIndexToRed[`${shipId}${weaponIndex}`],
    redCount
  );
});

QUnit.test("setShipWeaponIndexYellow()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const weaponIndex = 2;
  const yellowCount = 3;
  const action = ActionCreator.setShipWeaponIndexYellow(
    shipId,
    weaponIndex,
    yellowCount
  );

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(
    result.shipWeaponIndexToYellow[`${shipId}${weaponIndex}`],
    yellowCount
  );
});

QUnit.test("setUserMessage()", (assert) => {
  // Setup.
  const state = AppState.create();
  const userMessage = "bogus";
  const action = ActionCreator.setUserMessage(userMessage);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.userMessage, userMessage);
});

QUnit.test("setVerbose()", (assert) => {
  // Setup.
  const state = AppState.create();
  const isVerbose = false;
  const action = ActionCreator.setVerbose(isVerbose);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.isVerbose, isVerbose);
});

QUnit.test("setWinner()", (assert) => {
  // Setup.
  const state = AppState.create();
  const winnerTeamKey = "talon";
  const action = ActionCreator.setWinner(winnerTeamKey);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.winnerTeamKey, winnerTeamKey);
});

const ReducerTest = {};
export default ReducerTest;
