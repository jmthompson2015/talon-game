import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameOver from "./GameOver.js";
import PhaseFunction from "./PhaseFunction.js";

const Round = {};

const advanceRound = (store) => {
  const newRound = Selector.round(store.getState()) + 1;
  store.dispatch(ActionCreator.setRound(newRound));
  store.dispatch(ActionCreator.setCurrentPhase(null));

  const players = Selector.playersInOrder(store.getState());
  const playerIds = R.map(R.prop("id"), players);
  store.dispatch(ActionCreator.setCurrentPlayerOrder(playerIds));
  store.dispatch(ActionCreator.setCurrentPlayer(null));
};

Round.executeRounds = (resolve, store, roundLimit) => {
  advanceRound(store);
  const round = Selector.round(store.getState());

  if (round > roundLimit) {
    resolve();
  } else {
    PhaseFunction.execute(store).then(() => {
      Round.executeRounds(resolve, store, roundLimit);
    });
  }
};

Round.execute = (store, roundLimit) =>
  new Promise((resolve) => {
    if (GameOver.isGameOver(store)) {
      resolve();
    } else {
      Round.executeRounds(resolve, store, roundLimit);
    }
  });

Object.freeze(Round);

export default Round;
