import Heading from "../artifact/Heading.js";
import Resolver from "../artifact/Resolver.js";

import StateUtils from "./StateUtilities.js";

const Selector = {};

Selector.changeInitiativeCount = (teamKey, state) => {
  const shipIds = Selector.shipsByTeam(teamKey, state);
  const reduceFunction = (accum, shipId) =>
    accum + Selector.shipChangeInitiativeCount(shipId, state);

  return R.reduce(reduceFunction, 0, shipIds);
};

Selector.currentImpulseLetter = (state) => {
  const phase = Selector.currentPhase(state);
  let answer;

  if (phase && phase.key.startsWith("impulse")) {
    answer = R.last(phase.key);
  }

  return answer;
};

Selector.currentPhase = (state) => Resolver.phase(state.currentPhaseKey);

Selector.currentPlayer = (state) =>
  Selector.player(state.currentPlayerId, state);

Selector.currentPlayerOrder = (state) => state.currentPlayerOrder;

Selector.currentRound = (state) => state.currentRound;

Selector.currentStep = (state) => Resolver.step(state.currentStepKey);

Selector.defendInitiativeCount = (teamKey, state) => {
  const shipIds = Selector.shipsByTeam(teamKey, state);
  const reduceFunction = (accum, shipId) =>
    accum + Selector.shipDefendInitiativeCount(shipId, state);

  return R.reduce(reduceFunction, 0, shipIds);
};

Selector.delay = (state) => state.delay;

Selector.initiativePlayer = (state) => {
  const id = state.initiativePlayerId;
  return state.playerInstances[id];
};

Selector.isImpulsePhase = (state) => {
  const phaseKey = state.currentPhaseKey;

  return phaseKey && phaseKey.startsWith("impulse");
};

Selector.isShipSideSlipped = (shipId, state) =>
  state.shipToIsSideSlipped[shipId] || false;

Selector.isShipWeaponGroupCharged = (shipId, weaponGroupIndex, state) => {
  const ship = Selector.ship(shipId, state);
  const weaponGroup = Resolver.shipWeaponGroup(
    ship.shipType.key,
    weaponGroupIndex
  );
  const redCount = Selector.shipWeaponGroupRed(shipId, weaponGroupIndex, state);
  const yellowCount = Selector.shipWeaponGroupYellow(
    shipId,
    weaponGroupIndex,
    state
  );

  return (
    weaponGroup &&
    redCount >= weaponGroup.red &&
    yellowCount >= weaponGroup.yellow
  );
};

Selector.player = (playerId, state) => state.playerInstances[playerId];

Selector.playerCount = (state) => Object.keys(state.playerInstances).length;

Selector.playersByTeam = (teamKey, state) => {
  const filterFunction = (player) => player.teamKey === teamKey;

  return R.filter(filterFunction, Object.values(state.playerInstances));
};

Selector.playersInOrder = (state) => {
  const count = Selector.playerCount(state);
  const players0 = Object.values(state.playerInstances);
  const index0 = R.findIndex(R.propEq("id", state.initiativePlayerId))(
    players0
  );
  const first = R.slice(index0, count, players0);
  const second = R.slice(0, index0, players0);

  return [...first, ...second];
};

Selector.ship = (shipId, state) => state.shipInstances[shipId];

Selector.shipAfterburnerCount = (shipId, state) =>
  state.shipToAfterburnerCount[shipId] || 0;

Selector.shipAN = (shipId, state) => {
  const filterFunction = (entry) => entry[1] === shipId;
  const entries = R.filter(filterFunction, Object.entries(state.anToTokens));

  return entries && entries.length > 0 ? entries[0][0] : undefined;
};

Selector.shipArcReinforceImpulse = (shipId, arcKey, state) => {
  const key = StateUtils.shipArcKey(shipId, arcKey);

  return state.shipArcToReinforceImpulse[key];
};

Selector.shipArcShieldCount = (shipId, arcKey, state) => {
  const key = StateUtils.shipArcKey(shipId, arcKey);

  return state.shipArcToShieldCount[key] || 0;
};

Selector.shipBatteryCount = (shipId, state) =>
  state.shipToBatteryCount[shipId] || 0;

Selector.shipChangeInitiativeCount = (shipId, state) =>
  state.shipToChangeInitiativeCount[shipId] || 0;

Selector.shipCurrentTurnRadius = (shipId, state) =>
  state.shipToCurrentTurnRadius[shipId] || 0;

Selector.shipDefendInitiativeCount = (shipId, state) =>
  state.shipToDefendInitiativeCount[shipId] || 0;

Selector.shipHeading = (shipId, state) => {
  const headingKey = state.shipToHeading[shipId] || Heading.THIRTY_DEGREES;

  return Resolver.heading(headingKey);
};

Selector.shipHullIndex = (shipId, state) => state.shipToHullIndex[shipId] || 0;

Selector.shipKey = (shipId, state) => {
  const ship = Selector.ship(shipId, state);

  return ship ? ship.shipType.key : undefined;
};

Selector.shipMissiles = (shipId, state) => state.shipToMissiles[shipId];

Selector.shipPower = (shipId, state) => {
  const powerCurve = Selector.shipPowerCurve(shipId, state);

  return powerCurve ? powerCurve.power : undefined;
};

Selector.shipPowerCurve = (shipId, state) => {
  const powerCurveIndex = Selector.shipPowerCurveIndex(shipId, state);
  const ship = Selector.ship(shipId, state);
  const shipKey = ship ? ship.shipType.key : undefined;

  return Resolver.shipPowerCurve(shipKey, powerCurveIndex);
};

Selector.shipPowerCurveIndex = (shipId, state) =>
  state.shipToPowerCurveIndex[shipId];

Selector.shipsByPlayer = (playerId, state) => {
  const filterFunction = (shipId) => {
    const ship = Selector.ship(shipId, state);

    return ship.playerId === playerId;
  };
  const shipIds = Object.values(state.anToTokens);

  return R.filter(filterFunction, shipIds);
};

Selector.shipsByTeam = (teamKey, state) => {
  const filterFunction = (shipId) => {
    const ship = Selector.ship(shipId, state);

    return ship.shipType.teamKey === teamKey;
  };
  const shipIds = Object.values(state.anToTokens);

  return R.filter(filterFunction, shipIds);
};

Selector.shipSpeed = (shipId, state) => {
  const powerCurve = Selector.shipPowerCurve(shipId, state);

  return powerCurve ? powerCurve.speed : undefined;
};

Selector.shipTurnRadius = (shipId, state) => {
  const powerCurve = Selector.shipPowerCurve(shipId, state);

  return powerCurve ? powerCurve.turnRadius : undefined;
};

Selector.shipWeaponGroupRed = (shipId, weaponGroupIndex, state) => {
  const key = StateUtils.shipWeaponGroupKey(shipId, weaponGroupIndex);

  return state.shipWeaponGroupToRed[key];
};

Selector.shipWeaponGroupYellow = (shipId, weaponGroupIndex, state) => {
  const key = StateUtils.shipWeaponGroupKey(shipId, weaponGroupIndex);

  return state.shipWeaponGroupToYellow[key];
};

Selector.winner = (state) =>
  state.winnerTeamKey ? Resolver.team(state.winnerTeamKey) : undefined;

// /////////////////////////////////////////////////////////////////////////////////////////////////
const nextId = (instanceMap) => {
  const reduceFunction = (accum, key) => Math.max(accum, key);
  const maxId = R.reduce(reduceFunction, 0, Object.keys(instanceMap));

  return (maxId !== undefined ? maxId : 0) + 1;
};

Selector.nextPlayerId = (state) => nextId(state.playerInstances);

Selector.nextShipId = (state) => nextId(state.shipInstances);

Object.freeze(Selector);

export default Selector;
