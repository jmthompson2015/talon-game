/* eslint no-console: ["error", { allow: ["error", "log", "warn"] }] */

import ActionType from "./ActionType.js";
import AppState from "./AppState.js";
import StateUtils from "./StateUtilities.js";

const Reducer = {};

const log = (message, state) => {
  if (state.isVerbose) {
    console.log(message);
  }
};

Reducer.root = (state, action) => {
  // LOGGER.debug(`root() type = ${action.type}`);

  if (typeof state === "undefined") {
    return AppState.create();
  }

  if (action.type.startsWith("@@redux/INIT")) {
    // Nothing to do.
    return state;
  }

  let key;
  let newANToShipKey;
  let newANToTokens;
  let newGameRecords;
  let newPlayers;
  let newPlayerToStrategy;
  let newShip;
  let newShipKey;
  let newShipMap;
  let newShips;
  let oldShip;

  switch (action.type) {
    case ActionType.ADD_GAME_RECORD:
      log(`Reducer ADD_GAME_RECORD message = ${action.message}`, state);
      newGameRecords = [
        ...state.gameRecords,
        { round: state.round, message: action.message },
      ];
      return { ...state, gameRecords: newGameRecords };
    case ActionType.ADD_SHIP:
      newShips = {
        ...state.shipInstances,
        [action.shipState.id]: action.shipState,
      };
      return { ...state, shipInstances: newShips };
    case ActionType.SET_CURRENT_PHASE:
      log(`Reducer SET_CURRENT_PHASE phaseKey = ${action.phaseKey}`, state);
      return { ...state, currentPhaseKey: action.phaseKey };
    case ActionType.SET_CURRENT_PLAYER:
      log(`Reducer SET_CURRENT_PLAYER playerId = ${action.playerId}`, state);
      return {
        ...state,
        currentPlayerId: action.playerId,
      };
    case ActionType.SET_CURRENT_PLAYER_ORDER:
      log(
        `Reducer SET_CURRENT_PLAYER_ORDER playerIds = ${JSON.stringify(
          action.playerIds
        )}`,
        state
      );
      return { ...state, currentPlayerOrder: action.playerIds };
    case ActionType.SET_DELAY:
      log(`Reducer SET_DELAY delay = ${action.delay}`, state);
      return { ...state, delay: action.delay };
    case ActionType.SET_INITIATIVE_PLAYER:
      log(`Reducer SET_INITIATIVE_PLAYER playerId = ${action.playerId}`, state);
      return { ...state, initiativePlayerId: action.playerId };
    case ActionType.SET_PLAYERS:
      log(
        `Reducer SET_PLAYERS players.length = ${action.players.length}`,
        state
      );
      newPlayers = R.reduce(
        (accum, p) => ({ ...accum, [p.id]: p }),
        {},
        action.players
      );
      return {
        ...state,
        playerInstances: newPlayers,
        isTwoPlayer: action.players.length === 2,
      };
    case ActionType.SET_PLAYER_STRATEGY:
      log(
        `Reducer SET_PLAYER_STRATEGY playerId = ${action.playerId} strategy = ${action.strategy}`,
        state
      );
      newPlayerToStrategy = {
        ...state.playerToStrategy,
        [action.playerId]: action.strategy,
      };
      return { ...state, playerToStrategy: newPlayerToStrategy };
    case ActionType.SET_ROUND:
      log(`Reducer SET_ROUND round = ${action.round}`, state);
      return { ...state, round: action.round };
    case ActionType.SET_SHIP:
      log(
        `Reducer SET_SHIP an = ${action.an} shipId = ${action.shipId}`,
        state
      );
      oldShip = state.anToTokens[action.an] || [];
      newShip = [...oldShip, action.shipId];
      newANToTokens = { ...state.anToTokens, [action.an]: newShip };
      newShipKey = state.shipInstances[action.shipId].shipKey;
      newANToShipKey = { ...state.anToShipKey, [action.an]: newShipKey };
      return {
        ...state,
        anToShipKey: newANToShipKey,
        anToTokens: newANToTokens,
      };
    case ActionType.SET_SHIP_AFTERBURNER_COUNT:
      newShipMap = {
        ...state.shipToAfterburnerCount,
        [action.shipId]: action.afterburnerCount,
      };
      return { ...state, shipToAfterburnerCount: newShipMap };
    case ActionType.SET_SHIP_ARC_REINFORCEMENTS:
      key = StateUtils.shipArcKey(action.shipId, action.arcKey);
      newShipMap = {
        ...state.shipArcToReinforcements,
        [key]: action.reinforcements,
      };
      return { ...state, shipArcToReinforcements: newShipMap };
    case ActionType.SET_SHIP_ARC_SHIELD_COUNT:
      key = StateUtils.shipArcKey(action.shipId, action.arcKey);
      newShipMap = { ...state.shipArcToShieldCount, [key]: action.shieldCount };
      return { ...state, shipArcToShieldCount: newShipMap };
    case ActionType.SET_SHIP_BATTERY_COUNT:
      newShipMap = {
        ...state.shipToBatteryCount,
        [action.shipId]: action.batteryCount,
      };
      return { ...state, shipToBatteryCount: newShipMap };
    case ActionType.SET_SHIP_CHANGE_INITIATIVES:
      newShipMap = {
        ...state.shipToChangeInitiatives,
        [action.shipId]: action.changeInitiatives,
      };
      return { ...state, shipToChangeInitiatives: newShipMap };
    case ActionType.SET_SHIP_DEFEND_INITIATIVES:
      newShipMap = {
        ...state.shipToDefendInitiatives,
        [action.shipId]: action.defendInitiatives,
      };
      return { ...state, shipToDefendInitiatives: newShipMap };
    case ActionType.SET_SHIP_HULL_INDEX:
      newShipMap = {
        ...state.shipToHullIndex,
        [action.shipId]: action.hullIndex,
      };
      return { ...state, shipToHullIndex: newShipMap };
    case ActionType.SET_SHIP_MISSILES:
      newShipMap = {
        ...state.shipToMissiles,
        [action.shipId]: action.missiles,
      };
      return { ...state, shipToMissiles: newShipMap };
    case ActionType.SET_SHIP_POWER_CURVE:
      log(
        `Reducer SET_SHIP_POWER_CURVE shipId = ${action.shipId} ` +
          `powerCurveIndex = ${action.powerCurveIndex}`,
        state
      );
      newShipMap = {
        ...state.shipToPowerCurve,
        [action.shipId]: action.powerCurve,
      };
      return { ...state, shipToPowerCurve: newShipMap };
    case ActionType.SET_SHIP_SIDE_SLIPS:
      newShipMap = {
        ...state.shipToSideSlips,
        [action.shipId]: action.sideSlips,
      };
      return { ...state, shipToSideSlips: newShipMap };
    case ActionType.SET_SHIP_TURN_RADIUS_MARKERS:
      newShipMap = {
        ...state.shipToTurnRadiusMarkers,
        [action.shipId]: action.turnRadiusMarkers,
      };
      return { ...state, shipToTurnRadiusMarkers: newShipMap };
    case ActionType.SET_SHIP_WEAPON_GROUPS:
      newShipMap = {
        ...state.shipToWeaponGroups,
        [action.shipId]: action.weaponGroups,
      };
      return { ...state, shipToWeaponGroups: newShipMap };
    case ActionType.SET_USER_MESSAGE:
      log(
        `Reducer SET_USER_MESSAGE userMessage = ${action.userMessage}`,
        state
      );
      return { ...state, userMessage: action.userMessage };
    case ActionType.SET_VERBOSE:
      log(`Reducer SET_VERBOSE isVerbose = ${action.isVerbose}`, state);
      return { ...state, isVerbose: action.isVerbose };
    case ActionType.SET_WINNER:
      log(`Reducer SET_WINNER winnerTeamKey = ${action.winnerTeamKey}`, state);
      return { ...state, winnerTeamKey: action.winnerTeamKey };
    default:
      console.warn(`Reducer.root: Unhandled action type: ${action.type}`);
      return state;
  }
};

Object.freeze(Reducer);

export default Reducer;
