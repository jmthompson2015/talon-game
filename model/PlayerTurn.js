import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameOver from "./GameOver.js";
import StepFunction from "./StepFunction.js";

const PlayerTurn = {};

PlayerTurn.execute = (store) =>
  new Promise((resolve) => {
    if (GameOver.isGameOver(store)) {
      resolve();
    } else {
      const playerIds = Selector.currentPlayerOrder(store.getState());
      const reduceFunction = (promise, playerId) =>
        promise.then(() => {
          store.dispatch(ActionCreator.setCurrentPlayer(playerId));
          return StepFunction.execute(store);
        });
      R.reduce(reduceFunction, Promise.resolve(), playerIds).then(() => {
        store.dispatch(ActionCreator.setCurrentPlayer(undefined));
        resolve();
      });
    }
  });

Object.freeze(PlayerTurn);

export default PlayerTurn;
