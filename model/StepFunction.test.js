import Arc from "../artifact/Arc.js";
import Phase from "../artifact/Phase.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import StepFunction from "./StepFunction.js";
import TestData from "./TestData.js";

QUnit.module("StepFunction");

QUnit.test("execute()", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.IMPULSE_A));
  store.dispatch(ActionCreator.setCurrentPlayerOrder([1, 2]));
  store.dispatch(ActionCreator.setCurrentPlayer(1));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    const state = store.getState();
    assert.equal(Selector.currentRound(state), 1);
    assert.equal(Selector.currentPhase(state).key, Phase.IMPULSE_A);
    assert.equal(Selector.currentPlayer(state).id, 1);
    assert.equal(Selector.currentStep(state), undefined);
    // Verify.
    done();
  };

  StepFunction.execute(store).then(callback);
});

QUnit.test("removeShieldReinforcement()", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.IMPULSE_A));
  store.dispatch(ActionCreator.setCurrentPlayerOrder([1, 2]));
  store.dispatch(ActionCreator.setCurrentPlayer(1));
  store.dispatch(ActionCreator.setShipArcReinforced(3, Arc.FORWARD, true));
  store.dispatch(ActionCreator.setShipArcReinforced(4, Arc.RIGHT, true));
  store.dispatch(ActionCreator.setVerbose(true));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    const state = store.getState();
    assert.equal(Selector.currentRound(state), 1);
    assert.equal(Selector.currentPhase(state).key, Phase.IMPULSE_A);
    assert.equal(Selector.currentPlayer(state).id, 1);
    assert.equal(Selector.currentStep(state), undefined);
    assert.equal(Selector.isShipArcReinforced(3, Arc.FORWARD, state), false);
    assert.equal(Selector.isShipArcReinforced(4, Arc.RIGHT, state), false);
    // Verify.
    done();
  };

  StepFunction.removeShieldReinforcement(store).then(callback);
});

const StepFunctionTest = {};
export default StepFunctionTest;
