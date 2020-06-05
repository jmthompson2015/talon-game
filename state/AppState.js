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
  shipArcToReinforceImpulse = {},
  shipArcToShieldCount = {},
  shipToAfterburnerCount = {},
  shipToBatteryCount = {},
  shipToChangeInitiativeCount = {},
  shipToCurrentTurnRadius = {},
  shipToDefendInitiativeCount = {},
  shipToHeading = {},
  shipToHullIndex = {},
  shipToIsSideSlipped = {},
  shipToMissiles = {},
  shipToPowerCurveIndex = {},
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
    shipArcToReinforceImpulse,
    shipArcToShieldCount,
    shipToAfterburnerCount,
    shipToBatteryCount,
    shipToChangeInitiativeCount,
    shipToCurrentTurnRadius,
    shipToDefendInitiativeCount,
    shipToHeading,
    shipToHullIndex,
    shipToMissiles,
    shipToPowerCurveIndex,
    shipToIsSideSlipped,
    shipWeaponIndexToRed,
    shipWeaponIndexToYellow,

    playerInstances,
    shipInstances,
  });

Object.freeze(AppState);

export default AppState;
