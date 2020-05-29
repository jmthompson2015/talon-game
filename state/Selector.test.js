import Arc from "../artifact/Arc.js";
import Ship from "../artifact/Ship.js";
import Team from "../artifact/Team.js";

import AppState from "./AppState.js";
import ActionCreator from "./ActionCreator.js";
import PlayerState from "./PlayerState.js";
import Reducer from "./Reducer.js";
import Selector from "./Selector.js";
import ShipState from "./ShipState.js";

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

QUnit.test("playersByTeam()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const player1 = PlayerState.create({
    id: 1,
    name: "Alfred",
    teamKey: Team.TALON,
  });
  const player2 = PlayerState.create({
    id: 2,
    name: "Bruce",
    teamKey: Team.TERRAN,
  });
  const action1 = ActionCreator.setPlayers([player1, player2]);
  const state = Reducer.root(state0, action1);

  // Run / Verify.
  const talonPlayers = Selector.playersByTeam(Team.TALON, state);
  assert.equal(talonPlayers.length, 1);
  assert.equal(talonPlayers[0].teamKey, Team.TALON);

  const terranPlayers = Selector.playersByTeam(Team.TERRAN, state);
  assert.equal(terranPlayers.length, 1);
  assert.equal(terranPlayers[0].teamKey, Team.TERRAN);
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

QUnit.test("shipsByPlayer()", (assert) => {
  // Setup.
  const playerId = 2;
  const state0 = AppState.create();
  const ship1 = ShipState.create({
    id: 1,
    nameIndex: 1,
    playerId,
    shipKey: Ship.TERRAN_CA,
  });
  const action1 = ActionCreator.addShip(ship1);
  const state1 = Reducer.root(state0, action1);
  const action2 = ActionCreator.setShip("a1", 1);
  const state2 = Reducer.root(state1, action2);

  const ship2 = ShipState.create({
    id: 2,
    nameIndex: 3,
    playerId,
    shipKey: Ship.TERRAN_CA,
  });
  const action3 = ActionCreator.addShip(ship2);
  const state3 = Reducer.root(state2, action3);
  const action4 = ActionCreator.setShip("b1", 2);
  const state4 = Reducer.root(state3, action4);

  // Run / Verify.
  assert.equal(Selector.shipsByPlayer(1, state4).length, 0);
  assert.equal(Selector.shipsByPlayer(2, state4).length, 2);
});

QUnit.test("shipsByTeam()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const ship1 = ShipState.create({
    id: 1,
    shipKey: Ship.TERRAN_CA,
    nameIndex: 1,
  });
  const action1 = ActionCreator.addShip(ship1);
  const state1 = Reducer.root(state0, action1);
  const action2 = ActionCreator.setShip("a1", 1);
  const state2 = Reducer.root(state1, action2);

  const ship2 = ShipState.create({
    id: 2,
    shipKey: Ship.TERRAN_CA,
    nameIndex: 3,
  });
  const action3 = ActionCreator.addShip(ship2);
  const state3 = Reducer.root(state2, action3);
  const action4 = ActionCreator.setShip("b1", 2);
  const state4 = Reducer.root(state3, action4);

  // Run / Verify.
  assert.equal(Selector.shipsByTeam(Team.TALON, state4).length, 0);
  assert.equal(Selector.shipsByTeam(Team.TERRAN, state4).length, 2);
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
