import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameOver from "./GameOver.js";
import StepFunction from "./StepFunction.js";

const PlayerTurn = {};

const advancePlayer = (store) => {
  const oldPlayer = Selector.currentPlayer(store.getState());
  const oldPlayerId = oldPlayer ? oldPlayer.id : undefined;
  const playerIds = Selector.currentPlayerOrder(store.getState());
  let newPlayerId;

  if (R.isNil(oldPlayerId)) {
    [newPlayerId] = playerIds; // first element
  } else {
    const index = playerIds.indexOf(oldPlayerId);

    if (index === playerIds.length - 1) {
      // last player.
      newPlayerId = undefined;
    } else {
      newPlayerId = playerIds[index + 1];
    }
  }

  store.dispatch(ActionCreator.setCurrentPlayer(newPlayerId));
};

PlayerTurn.executeSteps = (resolve, store) => {
  advancePlayer(store);
  const playerId = Selector.currentPlayer(store.getState());

  if (R.isNil(playerId)) {
    resolve();
  } else {
    StepFunction.execute(store).then(() => {
      PlayerTurn.executeSteps(resolve, store);
    });
  }
};

PlayerTurn.execute = (store) =>
  new Promise((resolve) => {
    if (GameOver.isGameOver(store)) {
      resolve();
    } else {
      PlayerTurn.executeSteps(resolve, store);
    }
  });

Object.freeze(PlayerTurn);

export default PlayerTurn;
