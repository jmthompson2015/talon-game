/* eslint no-console: ["error", { allow: ["log"] }] */

import Phase from "../artifact/Phase.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameOver from "./GameOver.js";
import PlayerTurn from "./PlayerTurn.js";

const PhaseFunction = {};

const advancePhase = (store) => {
  const oldPhase = Selector.currentPhase(store.getState());
  const oldPhaseKey = oldPhase ? oldPhase.key : undefined;
  const phaseKeys = Phase.keys();
  let newPhaseKey;

  if (R.isNil(oldPhaseKey)) {
    [newPhaseKey] = phaseKeys; // first element
  } else {
    const index = phaseKeys.indexOf(oldPhaseKey);

    if (index === phaseKeys.length - 1) {
      // last phase.
      newPhaseKey = undefined;
    } else {
      newPhaseKey = phaseKeys[index + 1];
    }
  }

  store.dispatch(ActionCreator.setCurrentPhase(newPhaseKey));
};

PhaseFunction.executePlayerTurns = (resolve, store) => {
  advancePhase(store);
  const phase = Selector.currentPhase(store.getState());
  const phaseKey = phase ? phase.key : undefined;

  if (R.isNil(phaseKey)) {
    resolve();
  } else {
    PlayerTurn.execute(store).then(() => {
      PhaseFunction.executePlayerTurns(resolve, store);
    });
  }
};

PhaseFunction.execute = (store) =>
  new Promise((resolve) => {
    if (GameOver.isGameOver(store)) {
      resolve();
    } else {
      PhaseFunction.executePlayerTurns(resolve, store);
    }
  });

Object.freeze(PhaseFunction);

export default PhaseFunction;
