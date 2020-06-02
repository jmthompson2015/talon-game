import Phase from "../artifact/Phase.js";

import ActionCreator from "../state/ActionCreator.js";

import GameOver from "./GameOver.js";
import PlayerTurn from "./PlayerTurn.js";

const PhaseFunction = {};

PhaseFunction.execute = (store) =>
  new Promise((resolve) => {
    if (GameOver.isGameOver(store)) {
      resolve();
    } else {
      const phaseKeys = Phase.keys();
      const reduceFunction = (promise, phaseKey) =>
        promise.then(() => {
          store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
          return PlayerTurn.execute(store);
        });
      R.reduce(reduceFunction, Promise.resolve(), phaseKeys).then(() => {
        store.dispatch(ActionCreator.setCurrentPhase(undefined));
        resolve();
      });
    }
  });

Object.freeze(PhaseFunction);

export default PhaseFunction;
