const AppState = {};

AppState.create = ({
  anToShipKey = {},
  anToTokens = {},
  delay = 1000,
  gameRecords = [],
  initiativePlayerId,
  isGameOver = false,
  isVerbose = true,
  mctsRoot = null,
  userMessage = null,
  winnerTeamKey = null,

  round = 0,
  currentPlayerOrder = null,
  currentPhaseKey = null,
  currentPlayerId = null,

  playerToMorgue = {},
  playerToStrategy = {},
  shipArcToIsReinforced = {},
  shipArcToShieldCount = {},
  shipToAfterburnerCount = {},
  shipToBatteryCount = {},
  shipToChangeInitiativeCount = {},
  shipToDefendInitiativeCount = {},
  shipToHullIndex = {},
  shipToIsSideSlipped = {},
  shipToMissiles = {},
  shipToPowerCurveIndex = {},
  shipToTurnRadiusMarkers = {},
  shipToWeaponGroups = {},

  playerInstances = {},
  shipInstances = {},
} = {}) =>
  Immutable({
    anToShipKey,
    anToTokens,
    delay,
    gameRecords,
    initiativePlayerId,
    isGameOver,
    isVerbose,
    mctsRoot,
    userMessage,
    winnerTeamKey,

    round,
    currentPlayerOrder,
    currentPhaseKey,
    currentPlayerId,

    playerToMorgue,
    playerToStrategy,
    shipArcToIsReinforced,
    shipArcToShieldCount,
    shipToAfterburnerCount,
    shipToBatteryCount,
    shipToChangeInitiativeCount,
    shipToDefendInitiativeCount,
    shipToHullIndex,
    shipToMissiles,
    shipToPowerCurveIndex,
    shipToIsSideSlipped,
    shipToTurnRadiusMarkers,
    shipToWeaponGroups,

    playerInstances,
    shipInstances,
  });

Object.freeze(AppState);

export default AppState;
