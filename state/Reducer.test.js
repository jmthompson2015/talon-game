import Arc from "../artifact/Arc.js";

import AppState from "./AppState.js";
import ActionCreator from "./ActionCreator.js";
import Reducer from "./Reducer.js";
import ShipState from "./ShipState.js";

QUnit.module("Reducer");

QUnit.test("addGameRecord()", (assert) => {
  // Setup.
  const state01 = AppState.create();
  const action01 = ActionCreator.setRound(1);
  const state0 = Reducer.root(state01, action01);
  const action0 = ActionCreator.addGameRecord("first game record");

  // Run.
  const result0 = Reducer.root(state0, action0);

  // Verify.
  assert.ok(result0);
  const { gameRecords: gameRecords0 } = result0;
  assert.ok(gameRecords0);
  assert.equal(gameRecords0.length, 1);
  assert.equal(gameRecords0[0].round, 1);
  assert.equal(gameRecords0[0].message, "first game record");

  // Setup.
  const action02 = ActionCreator.setRound(2);
  const state02 = Reducer.root(result0, action02);
  const action1 = ActionCreator.addGameRecord("second game record");

  // Run.
  const result1 = Reducer.root(state02, action1);

  // Verify.
  assert.ok(result1);
  const { gameRecords: gameRecords1 } = result1;
  assert.ok(gameRecords1);
  assert.equal(gameRecords1.length, 2);
  assert.equal(gameRecords0[0].round, 1);
  assert.equal(gameRecords0[0].message, "first game record");
  assert.equal(gameRecords1[1].round, 2);
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

QUnit.test("setRound()", (assert) => {
  // Setup.
  const state = AppState.create();
  const round = 123;
  const action = ActionCreator.setRound(round);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.round, round);
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

QUnit.test("setShipAfterburners()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const afterburners = 2;
  const action = ActionCreator.setShipAfterburners(shipId, afterburners);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipToAfterburners[shipId], afterburners);
});

QUnit.test("setShipArcReinforcements()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const arcKey = Arc.FORWARD;
  const reinforcements = 3;
  const action = ActionCreator.setShipArcReinforcements(
    shipId,
    arcKey,
    reinforcements
  );

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(
    result.shipArcToReinforcements[`${shipId}${arcKey}`],
    reinforcements
  );
});

QUnit.test("setShipArcShields()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const arcKey = Arc.FORWARD;
  const shields = 3;
  const action = ActionCreator.setShipArcShields(shipId, arcKey, shields);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipArcToShields[`${shipId}${arcKey}`], shields);
});

QUnit.test("setShipBatteries()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const batteries = 2;
  const action = ActionCreator.setShipBatteries(shipId, batteries);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipToBatteries[shipId], batteries);
});

QUnit.test("setShipChangeInitiatives()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const changeInitiatives = 2;
  const action = ActionCreator.setShipChangeInitiatives(
    shipId,
    changeInitiatives
  );

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.ok(result.shipToChangeInitiatives);
  assert.equal(result.shipToChangeInitiatives[shipId], changeInitiatives);
});

QUnit.test("setShipDefendInitiatives()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const defendInitiatives = 2;
  const action = ActionCreator.setShipDefendInitiatives(
    shipId,
    defendInitiatives
  );

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.ok(result.shipToDefendInitiatives);
  assert.equal(result.shipToDefendInitiatives[shipId], defendInitiatives);
});

QUnit.test("setShipHulls()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const hulls = 2;
  const action = ActionCreator.setShipHulls(shipId, hulls);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipToHulls[shipId], hulls);
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

QUnit.test("setShipPowerCurve()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const powerCurve = 2;
  const action = ActionCreator.setShipPowerCurve(shipId, powerCurve);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipToPowerCurve[shipId], powerCurve);
});

QUnit.test("setShipSideSlips()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const sideSlips = 2;
  const action = ActionCreator.setShipSideSlips(shipId, sideSlips);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipToSideSlips[shipId], sideSlips);
});

QUnit.test("setShipTurnRadiusMarkers()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const turnRadiusMarkers = 2;
  const action = ActionCreator.setShipTurnRadiusMarkers(
    shipId,
    turnRadiusMarkers
  );

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipToTurnRadiusMarkers[shipId], turnRadiusMarkers);
});

QUnit.test("setShipWeaponGroups()", (assert) => {
  // Setup.
  const state = AppState.create();
  const shipId = 1;
  const weaponGroups = 2;
  const action = ActionCreator.setShipWeaponGroups(shipId, weaponGroups);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.shipToWeaponGroups[shipId], weaponGroups);
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