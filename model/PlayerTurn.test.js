import Phase from "../artifact/Phase.js";

import Selector from "../state/Selector.js";

import ActionCreator from "../state/ActionCreator.js";
import PlayerTurn from "./PlayerTurn.js";
import TestData from "./TestData.js";

QUnit.module("PlayerTurn");

QUnit.test("execute()", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.IMPULSE_A));
  store.dispatch(ActionCreator.setCurrentPlayerOrder([1, 2]));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    const state = store.getState();
    assert.equal(Selector.round(state), 1);
    assert.equal(Selector.currentPhase(state).key, Phase.IMPULSE_A);
    assert.equal(Selector.currentPlayer(state), undefined);
    // Verify.
    done();
  };

  PlayerTurn.execute(store).then(callback);
});

const PlayerTurnTest = {};
export default PlayerTurnTest;
