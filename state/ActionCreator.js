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

ActionCreator.setShipAfterburners = makeActionCreator(
  ActionType.SET_SHIP_AFTERBURNERS,
  "shipId",
  "afterburners"
);

ActionCreator.setShipArcReinforcements = makeActionCreator(
  ActionType.SET_SHIP_ARC_REINFORCEMENTS,
  "shipId",
  "arcKey",
  "reinforcements"
);

ActionCreator.setShipArcShieldCount = makeActionCreator(
  ActionType.SET_SHIP_ARC_SHIELD_COUNT,
  "shipId",
  "arcKey",
  "shieldCount"
);

ActionCreator.setShipBatteries = makeActionCreator(
  ActionType.SET_SHIP_BATTERIES,
  "shipId",
  "batteries"
);

ActionCreator.setShipChangeInitiatives = makeActionCreator(
  ActionType.SET_SHIP_CHANGE_INITIATIVES,
  "shipId",
  "changeInitiatives"
);

ActionCreator.setShipDefendInitiatives = makeActionCreator(
  ActionType.SET_SHIP_DEFEND_INITIATIVES,
  "shipId",
  "defendInitiatives"
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

ActionCreator.setShipPowerCurve = makeActionCreator(
  ActionType.SET_SHIP_POWER_CURVE,
  "shipId",
  "powerCurve"
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
