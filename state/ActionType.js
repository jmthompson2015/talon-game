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
ActionType.SET_SHIP_AFTERBURNERS = "setShipAfterburners";
ActionType.SET_SHIP_ARC_REINFORCEMENTS = "setShipArcReinforcements";
ActionType.SET_SHIP_ARC_SHIELDS = "setShipArcShields";
ActionType.SET_SHIP_BATTERIES = "setShipBatteries";
ActionType.SET_SHIP_CHANGE_INITIATIVES = "setShipChangeInitiatives";
ActionType.SET_SHIP_DEFEND_INITIATIVES = "setShipDefendInitiatives";
ActionType.SET_SHIP_HULLS = "setShipHulls";
ActionType.SET_SHIP_MISSILES = "setShipMissiles";
ActionType.SET_SHIP_POWER_CURVE = "setShipPowerCurve";
ActionType.SET_SHIP_SIDE_SLIPS = "setShipSideSlips";
ActionType.SET_SHIP_TURN_RADIUS_MARKERS = "setShipTurnRadiusMarkers";
ActionType.SET_SHIP_WEAPON_GROUPS = "setShipWeaponGroups";
ActionType.SET_USER_MESSAGE = "setUserMessage";
ActionType.SET_VERBOSE = "setVerbose";
ActionType.SET_WINNER = "setWinner";

Object.freeze(ActionType);

export default ActionType;