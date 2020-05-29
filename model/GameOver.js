import Team from "../artifact/Team.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

const GameOver = {};

GameOver.getWinner = (state) => {
  const talonTokens = Selector.shipsByTeam(Team.TALON, state);
  const terranTokens = Selector.shipsByTeam(Team.TERRAN, state);
  let winnerTeamKey;

  if (talonTokens.length > 0 && terranTokens.length === 0) {
    winnerTeamKey = Team.TALON;
  } else if (talonTokens.length === 0 && terranTokens.length > 0) {
    winnerTeamKey = Team.TERRAN;
  }

  return winnerTeamKey;
};

GameOver.isGameOver = (store, roundLimit = 100) => {
  const state = store.getState();
  const winnerTeamKey = GameOver.getWinner(state);

  if (!R.isNil(winnerTeamKey)) {
    store.dispatch(ActionCreator.setWinner(winnerTeamKey));
    const team = Selector.winner(store.getState());
    store.dispatch(ActionCreator.setUserMessage(`Team ${team.name} won!`));
  }

  return (
    !R.isNil(winnerTeamKey) || Selector.round(store.getState()) >= roundLimit
  );
};

Object.freeze(GameOver);

export default GameOver;
