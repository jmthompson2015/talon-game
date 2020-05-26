import ActionType from "./ActionType.js";

const ActionCreator = {};

// See https://redux.js.org/recipes/reducing-boilerplate
const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};

ActionCreator.addGameRecord = makeActionCreator(
  ActionType.ADD_GAME_RECORD,
  "message"
);

ActionCreator.addShip = makeActionCreator(ActionType.ADD_SHIP, "shipState");

ActionCreator.setCurrentPhase = makeActionCreator(
  ActionType.SET_CURRENT_PHASE,
  "phaseKey"
);

ActionCreator.setCurrentPlayer = makeActionCreator(
  ActionType.SET_CURRENT_PLAYER,
  "playerId"
);

ActionCreator.setCurrentPlayerOrder = makeActionCreator(
  ActionType.SET_CURRENT_PLAYER_ORDER,
  "playerIds"
);

ActionCreator.setDelay = makeActionCreator(ActionType.SET_DELAY, "delay");

ActionCreator.setInitiativePlayer = makeActionCreator(
  ActionType.SET_INITIATIVE_PLAYER,
  "playerId"
);

ActionCreator.setPlayers = makeActionCreator(ActionType.SET_PLAYERS, "players");

ActionCreator.setPlayerStrategy = makeActionCreator(
  ActionType.SET_PLAYER_STRATEGY,
  "playerId",
  "strategy"
);

ActionCreator.setRound = makeActionCreator(ActionType.SET_ROUND, "round");

ActionCreator.setShip = makeActionCreator(ActionType.SET_SHIP, "an", "shipId");

ActionCreator.setShipAfterburnerCount = makeActionCreator(
  ActionType.SET_SHIP_AFTERBURNER_COUNT,
  "shipId",
  "afterburnerCount"
);

ActionCreator.setShipArcReinforced = makeActionCreator(
  ActionType.SET_SHIP_ARC_REINFORCED,
  "shipId",
  "arcKey",
  "isReinforced"
);

ActionCreator.setShipArcShieldCount = makeActionCreator(
  ActionType.SET_SHIP_ARC_SHIELD_COUNT,
  "shipId",
  "arcKey",
  "shieldCount"
);

ActionCreator.setShipBatteryCount = makeActionCreator(
  ActionType.SET_SHIP_BATTERY_COUNT,
  "shipId",
  "batteryCount"
);

ActionCreator.setShipChangeInitiativeCount = makeActionCreator(
  ActionType.SET_SHIP_CHANGE_INITIATIVE_COUNT,
  "shipId",
  "changeInitiativeCount"
);

ActionCreator.setShipDefendInitiativeCount = makeActionCreator(
  ActionType.SET_SHIP_DEFEND_INITIATIVE_COUNT,
  "shipId",
  "defendInitiativeCount"
);

ActionCreator.setShipHullIndex = makeActionCreator(
  ActionType.SET_SHIP_HULL_INDEX,
  "shipId",
  "hullIndex"
);

ActionCreator.setShipMissiles = makeActionCreator(
  ActionType.SET_SHIP_MISSILES,
  "shipId",
  "missiles"
);

ActionCreator.setShipPowerCurveIndex = makeActionCreator(
  ActionType.SET_SHIP_POWER_CURVE_INDEX,
  "shipId",
  "powerCurveIndex"
);

ActionCreator.setShipSideSlips = makeActionCreator(
  ActionType.SET_SHIP_SIDE_SLIPS,
  "shipId",
  "sideSlips"
);

ActionCreator.setShipTurnRadiusMarkers = makeActionCreator(
  ActionType.SET_SHIP_TURN_RADIUS_MARKERS,
  "shipId",
  "turnRadiusMarkers"
);

ActionCreator.setShipWeaponGroups = makeActionCreator(
  ActionType.SET_SHIP_WEAPON_GROUPS,
  "shipId",
  "weaponGroups"
);

ActionCreator.setUserMessage = makeActionCreator(
  ActionType.SET_USER_MESSAGE,
  "userMessage"
);

ActionCreator.setVerbose = makeActionCreator(
  ActionType.SET_VERBOSE,
  "isVerbose"
);

ActionCreator.setWinner = makeActionCreator(
  ActionType.SET_WINNER,
  "winnerTeamKey"
);

Object.freeze(ActionCreator);

export default ActionCreator;
