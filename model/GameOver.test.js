import Team from "../artifact/Team.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameOver from "./GameOver.js";
import TestData from "./TestData.js";

QUnit.module("GameOver");

QUnit.test("getWinner() undefined", (assert) => {
  // Setup.
  const store = TestData.createStore();

  // Run.
  const result = GameOver.getWinner(store.getState());

  // Verify.
  assert.equal(result, undefined);
});

QUnit.test("getWinner() Talon", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.clearShip("a10"));
  store.dispatch(ActionCreator.clearShip("b10"));

  // Run.
  const result = GameOver.getWinner(store.getState());

  // Verify.
  assert.equal(result, Team.TALON);
});

QUnit.test("getWinner() Terran", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.clearShip("a2"));
  store.dispatch(ActionCreator.clearShip("b2"));

  // Run.
  const result = GameOver.getWinner(store.getState());

  // Verify.
  assert.equal(result, Team.TERRAN);
});

QUnit.test("isGameOver() false", (assert) => {
  // Setup.
  const store = TestData.createStore();

  // Run.
  const result = GameOver.isGameOver(store);

  // Verify.
  assert.equal(result, false);
});

QUnit.test("isGameOver() Talon true", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.clearShip("a10"));
  store.dispatch(ActionCreator.clearShip("b10"));

  // Run.
  const result = GameOver.isGameOver(store);

  // Verify.
  assert.equal(result, true);
  const team = Selector.winner(store.getState());
  assert.ok(team);
  assert.equal(team.key, Team.TALON);
});

QUnit.test("isGameOver() Terran true", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.clearShip("a2"));
  store.dispatch(ActionCreator.clearShip("b2"));

  // Run.
  const result = GameOver.isGameOver(store);

  // Verify.
  assert.equal(result, true);
  const team = Selector.winner(store.getState());
  assert.ok(team);
  assert.equal(team.key, Team.TERRAN);
});

const GameOverTest = {};
export default GameOverTest;
