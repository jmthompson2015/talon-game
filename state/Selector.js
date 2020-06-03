import Resolver from "../artifact/Resolver.js";

import StateUtils from "./StateUtilities.js";

const Selector = {};

Selector.currentPhase = (state) => Resolver.phase(state.currentPhaseKey);

Selector.currentPlayer = (state) =>
  Selector.player(state.currentPlayerId, state);

Selector.currentPlayerOrder = (state) => state.currentPlayerOrder;

Selector.currentRound = (state) => state.currentRound;

Selector.currentStep = (state) => Resolver.step(state.currentStepKey);

Selector.delay = (state) => state.delay;

Selector.initiativePlayer = (state) => {
  const id = state.initiativePlayerId;
  return state.playerInstances[id];
};

Selector.isImpulsePhase = (state) => {
  const phaseKey = state.currentPhaseKey;

  return phaseKey && phaseKey.startsWith("impulse");
};

Selector.isShipArcReinforced = (shipId, arcKey, state) => {
  const key = StateUtils.shipArcKey(shipId, arcKey);

  return state.shipArcToIsReinforced[key] || false;
};

Selector.isShipSideSlipped = (shipId, state) =>
  state.shipToIsSideSlipped[shipId] || false;

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

Selector.shipArcShieldCount = (shipId, arcKey, state) => {
  const key = StateUtils.shipArcKey(shipId, arcKey);

  return state.shipArcToShieldCount[key] || 0;
};

Selector.shipBatteryCount = (shipId, state) =>
  state.shipToBatteryCount[shipId] || 0;

Selector.shipChangeInitiativeCount = (shipId, state) =>
  state.shipToChangeInitiativeCount[shipId] || 0;

Selector.shipDefendInitiativeCount = (shipId, state) =>
  state.shipToDefendInitiativeCount[shipId] || 0;

Selector.shipHullIndex = (shipId, state) => state.shipToHullIndex[shipId] || 0;

Selector.shipMissiles = (shipId, state) => state.shipToMissiles[shipId];

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

Selector.shipTurnRadius = (shipId, state) => state.shipToTurnRadius[shipId];

Selector.shipWeaponIndexRed = (shipId, weaponIndex, state) => {
  const key = StateUtils.shipWeaponIndexKey(shipId, weaponIndex);

  return state.shipWeaponIndexToRed[key];
};

Selector.shipWeaponIndexYellow = (shipId, weaponIndex, state) => {
  const key = StateUtils.shipWeaponIndexKey(shipId, weaponIndex);

  return state.shipWeaponIndexToYellow[key];
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
