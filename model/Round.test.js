import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import Round from "./Round.js";
import TestData from "./TestData.js";

QUnit.module("Round");

const ROUND_LIMIT = 2;

QUnit.test("execute() ", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(0));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    assert.equal(Selector.currentRound(state), 3);
    assert.equal(Selector.currentPhase(state), undefined);
    assert.equal(Selector.currentPlayer(state), undefined);
    assert.equal(Selector.currentStep(state), undefined);
    done();
  };

  Round.execute(store, ROUND_LIMIT).then(callback);
});

const RoundTest = {};
export default RoundTest;
