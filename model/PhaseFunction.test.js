import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import PhaseFunction from "./PhaseFunction.js";
import TestData from "./TestData.js";

QUnit.module("PhaseFunction");

QUnit.test("execute()", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setRound(1));
  store.dispatch(ActionCreator.setCurrentPlayerOrder([1, 2]));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    const state = store.getState();
    assert.equal(Selector.round(state), 1);
    assert.equal(Selector.currentPhase(state), undefined);
    assert.equal(Selector.currentPlayer(state), undefined);
    assert.equal(Selector.currentStep(state), undefined);
    // Verify.
    done();
  };

  PhaseFunction.execute(store).then(callback);
});

const PhaseFunctionTest = {};
export default PhaseFunctionTest;
