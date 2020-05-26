const ActionType = {};

ActionType.ADD_GAME_RECORD = "addGameRecord";
ActionType.ADD_SHIP = "addShip";
ActionType.SET_CURRENT_PHASE = "setCurrentPhase";
ActionType.SET_CURRENT_PLAYER = "setCurrentPlayer";
ActionType.SET_CURRENT_PLAYER_ORDER = "setCurrentPlayerOrder";
ActionType.SET_DELAY = "setDelay";
ActionType.SET_INITIATIVE_PLAYER = "setInitiativePlayer";
ActionType.SET_PLAYERS = "setPlayers";
ActionType.SET_PLAYER_STRATEGY = "setPlayerStrategy";
ActionType.SET_ROUND = "setRound";
ActionType.SET_SHIP = "setShip";
ActionType.SET_SHIP_AFTERBURNER_COUNT = "setShipAfterburnerCount";
ActionType.SET_SHIP_ARC_REINFORCED = "setShipArcReinforced";
ActionType.SET_SHIP_ARC_SHIELD_COUNT = "setShipArcShieldCount";
ActionType.SET_SHIP_BATTERY_COUNT = "setShipBatteryCount";
ActionType.SET_SHIP_CHANGE_INITIATIVE_COUNT = "setShipChangeInitiativeCount";
ActionType.SET_SHIP_DEFEND_INITIATIVE_COUNT = "setShipDefendInitiativeCount";
ActionType.SET_SHIP_HULL_INDEX = "setShipHullIndex";
ActionType.SET_SHIP_MISSILES = "setShipMissiles";
ActionType.SET_SHIP_POWER_CURVE_INDEX = "setShipPowerCurveIndex";
ActionType.SET_SHIP_SIDE_SLIPPED = "setShipSideSlipped";
ActionType.SET_SHIP_TURN_RADIUS = "setShipTurnRadius";
ActionType.SET_SHIP_WEAPON_GROUPS = "setShipWeaponGroups";
ActionType.SET_USER_MESSAGE = "setUserMessage";
ActionType.SET_VERBOSE = "setVerbose";
ActionType.SET_WINNER = "setWinner";

Object.freeze(ActionType);

export default ActionType;
