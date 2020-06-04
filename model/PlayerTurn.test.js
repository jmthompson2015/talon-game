import Phase from "../artifact/Phase.js";

import Selector from "../state/Selector.js";

import ActionCreator from "../state/ActionCreator.js";
import PlayerTurn from "./PlayerTurn.js";
import TestData from "./TestData.js";

QUnit.module("PlayerTurn");

QUnit.test("execute() change initiative", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.IMPULSE_A));
  store.dispatch(ActionCreator.setCurrentPlayerOrder([1, 2]));
  store.dispatch(ActionCreator.setShipChangeInitiativeCount(1, 1)); // Terran CA
  store.dispatch(ActionCreator.setShipChangeInitiativeCount(3, 1)); // Terran CA
  store.dispatch(ActionCreator.setShipDefendInitiativeCount(2, 1)); // Talon CA

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    const state = store.getState();
    assert.equal(Selector.initiativePlayer(state).id, 2); // Terran player
    // Verify.
    done();
  };

  PlayerTurn.execute(store).then(callback);
});

QUnit.test("execute() two player", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.IMPULSE_A));
  store.dispatch(ActionCreator.setCurrentPlayerOrder([1, 2]));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    const state = store.getState();
    assert.equal(Selector.currentRound(state), 1);
    assert.equal(Selector.currentPhase(state).key, Phase.IMPULSE_A);
    assert.equal(Selector.currentPlayer(state), undefined);
    assert.equal(Selector.currentStep(state), undefined);
    // Verify.
    done();
  };

  PlayerTurn.execute(store).then(callback);
});

QUnit.test("execute() four player", (assert) => {
  // Setup.
  const store = TestData.createStore(4);
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.IMPULSE_A));
  store.dispatch(ActionCreator.setCurrentPlayerOrder([1, 3, 2, 4]));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    const state = store.getState();
    assert.equal(Selector.currentRound(state), 1);
    assert.equal(Selector.currentPhase(state).key, Phase.IMPULSE_A);
    assert.equal(Selector.currentPlayer(state), undefined);
    assert.equal(Selector.currentStep(state), undefined);
    // Verify.
    done();
  };

  PlayerTurn.execute(store).then(callback);
});

QUnit.test("execute() six player", (assert) => {
  // Setup.
  const store = TestData.createStore(6);
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.IMPULSE_A));
  store.dispatch(ActionCreator.setCurrentPlayerOrder([1, 3, 5, 2, 4, 6]));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    const state = store.getState();
    assert.equal(Selector.currentRound(state), 1);
    assert.equal(Selector.currentPhase(state).key, Phase.IMPULSE_A);
    assert.equal(Selector.currentPlayer(state), undefined);
    assert.equal(Selector.currentStep(state), undefined);
    // Verify.
    done();
  };

  PlayerTurn.execute(store).then(callback);
});

const PlayerTurnTest = {};
export default PlayerTurnTest;
