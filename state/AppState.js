const AppState = {};

AppState.create = ({
  anToShipKey = {},
  anToTokens = {},
  delay = 1000,
  gameRecords = [],
  initiativePlayerId,
  isGameOver = false,
  isVerbose = false,
  mctsRoot = null,
  userMessage = null,
  winnerTeamKey = null,

  currentRound = 0,
  currentPhaseKey = null,
  currentPlayerOrder = null,
  currentPlayerId = null,
  currentStepKey = null,

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
  shipToTurnRadius = {},
  shipWeaponIndexToRed = {},
  shipWeaponIndexToYellow = {},

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

    currentRound,
    currentPhaseKey,
    currentPlayerOrder,
    currentPlayerId,
    currentStepKey,

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
    shipToTurnRadius,
    shipWeaponIndexToRed,
    shipWeaponIndexToYellow,

    playerInstances,
    shipInstances,
  });

Object.freeze(AppState);

export default AppState;
