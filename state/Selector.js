import Resolver from "../artifact/Resolver.js";

import StateUtils from "./StateUtilities.js";

const Selector = {};

Selector.currentPhase = (state) => Resolver.phase(state.currentPhaseKey);

Selector.currentPlayer = (state) =>
  Selector.player(state.currentPlayerId, state);

Selector.currentPlayerOrder = (state) => state.currentPlayerOrder;

Selector.delay = (state) => state.delay;

Selector.initiativePlayer = (state) => {
  const id = state.initiativePlayerId;
  return state.playerInstances[id];
};

Selector.isShipArcReinforced = (shipId, arcKey, state) => {
  const key = StateUtils.shipArcKey(shipId, arcKey);

  return state.shipArcToIsReinforced[key] || false;
};

Selector.player = (playerId, state) => state.playerInstances[playerId];

Selector.playerCount = (state) => Object.keys(state.playerInstances).length;

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

Selector.round = (state) => state.round;

Selector.ship = (shipId, state) => state.shipInstances[shipId];

Selector.shipAfterburnerCount = (shipId, state) =>
  state.shipToAfterburnerCount[shipId] || 0;

Selector.shipArcShieldCount = (shipId, arcKey, state) => {
  const key = StateUtils.shipArcKey(shipId, arcKey);

  return state.shipArcToShieldCount[key] || 0;
};

Selector.shipBatteryCount = (shipId, state) =>
  state.shipToBatteryCount[shipId] || 0;

Selector.shipChangeInitiatives = (shipId, state) =>
  state.shipToChangeInitiatives[shipId];

Selector.shipDefendInitiatives = (shipId, state) =>
  state.shipToDefendInitiatives[shipId];

Selector.shipHullIndex = (shipId, state) => state.shipToHullIndex[shipId] || 0;

Selector.shipMissiles = (shipId, state) => state.shipToMissiles[shipId];

Selector.shipPowerCurveIndex = (shipId, state) =>
  state.shipToPowerCurveIndex[shipId];

Selector.shipSideSlips = (shipId, state) => state.shipToSideSlips[shipId];

Selector.shipTurnRadiusMarkers = (shipId, state) =>
  state.shipToTurnRadiusMarkers[shipId];

Selector.shipWeaponGroups = (shipId, state) => state.shipToWeaponGroups[shipId];

Selector.tokensByTeam = (teamKey, state) => {
  const filterFunction = (token) => token.teamKey === teamKey;
  const tokens = Object.values(state.anToTokens);

  return R.filter(filterFunction, tokens);
};

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
