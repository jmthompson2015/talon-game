import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameOver from "./GameOver.js";
import StepFunction from "./StepFunction.js";

const PlayerTurn = {};

const executeSteps = (playerIds, index, store) => {
  let answer;

  if (playerIds.length > index) {
    store.dispatch(ActionCreator.setCurrentPlayer(playerIds[index]));
    answer = StepFunction.execute(store);
  }

  return answer;
};

const executePlayerTurns = (store) => {
  const playerIds = Selector.currentPlayerOrder(store.getState());

  return new Promise((resolve) => {
    store.dispatch(ActionCreator.setCurrentPlayer(playerIds[0]));
    StepFunction.execute(store).then(resolve);
  })
    .then(() => executeSteps(playerIds, 1, store))
    .then(() => executeSteps(playerIds, 2, store))
    .then(() => executeSteps(playerIds, 3, store))
    .then(() => executeSteps(playerIds, 4, store))
    .then(() => executeSteps(playerIds, 5, store))
    .then(() => {
      store.dispatch(ActionCreator.setCurrentPlayer(undefined));
    });
};

PlayerTurn.execute = (store) =>
  new Promise((resolve) => {
    if (GameOver.isGameOver(store)) {
      resolve();
    } else {
      executePlayerTurns(store).then(() => {
        resolve();
      });
    }
  });

Object.freeze(PlayerTurn);

export default PlayerTurn;
