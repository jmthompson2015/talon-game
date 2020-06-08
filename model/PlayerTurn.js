/* eslint no-console: ["error", { allow: ["log"] }] */

import Team from "../artifact/Team.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameOver from "./GameOver.js";
import StepFunction from "./StepFunction.js";

const PlayerTurn = {};

const checkInitiative = (store) => {
  // 4.2 Check for initiative change.
  const initiativePlayer = Selector.initiativePlayer(store.getState());
  const team1Key = initiativePlayer ? initiativePlayer.teamKey : undefined;

  if (team1Key) {
    const team2Key = Team.other(team1Key);
    const team2Change = Selector.changeInitiativeCount(
      team2Key,
      store.getState()
    );
    const team1Defend = Selector.defendInitiativeCount(
      team1Key,
      store.getState()
    );

    if (team2Change > team1Defend) {
      const players = Selector.playersByTeam(team2Key, store.getState());
      const playerId = R.head(players).id;
      store.dispatch(ActionCreator.setInitiativePlayer(playerId));
    }
  }
};

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
        if (
          !GameOver.isGameOver(store) &&
          Selector.isImpulsePhase(store.getState())
        ) {
          checkInitiative(store);
        }

        store.dispatch(ActionCreator.setCurrentPlayer(undefined));
        resolve();
      });
    }
  });

Object.freeze(PlayerTurn);

export default PlayerTurn;
