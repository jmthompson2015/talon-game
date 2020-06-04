import Arc from "../artifact/Arc.js";
import Phase from "../artifact/Phase.js";
import PowerOption from "../artifact/PowerOption.js";

import ActionCreator from "../state/ActionCreator.js";
import PowerState from "../state/PowerState.js";
import Selector from "../state/Selector.js";

import PowerFunction from "./PowerFunction.js";
import TestData from "./TestData.js";

QUnit.module("PowerFunction");

QUnit.test("execute() change initiative", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerKey = PowerOption.CHANGE_INITIATIVE;
  const shipId = 1; // TERRAN_CA
  const powerState = PowerState.create({ powerKey, shipId });

  // Run.
  PowerFunction[powerKey].execute(powerState, store);
  const result = Selector.shipChangeInitiativeCount(shipId, store.getState());

  // Verify.
  assert.equal(result, 1);
});

QUnit.test("execute() charge battery", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerKey = PowerOption.CHARGE_BATTERY;
  const shipId = 1; // TERRAN_CA
  const powerState = PowerState.create({ powerKey, shipId });

  // Run.
  PowerFunction[powerKey].execute(powerState, store);
  const result = Selector.shipBatteryCount(shipId, store.getState());

  // Verify.
  assert.equal(result, 1);
});

QUnit.test("execute() charge red", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setCurrentPhase(Phase.POWER_PHASE));
  const powerKey = PowerOption.CHARGE_RED;
  const shipId = 1; // TERRAN_CA
  const weaponIndex = 0;
  const powerState = PowerState.create({ powerKey, shipId, weaponIndex });

  // Run.
  PowerFunction[powerKey].execute(powerState, store);
  const result = Selector.shipWeaponIndexRed(
    shipId,
    weaponIndex,
    store.getState()
  );

  // Verify.
  assert.equal(result, 1);
});

QUnit.test("execute() charge yellow", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerKey = PowerOption.CHARGE_YELLOW;
  const shipId = 1; // TERRAN_CA
  const weaponIndex = 0;
  const powerState = PowerState.create({ powerKey, shipId, weaponIndex });

  // Run.
  PowerFunction[powerKey].execute(powerState, store);
  const result = Selector.shipWeaponIndexYellow(
    shipId,
    weaponIndex,
    store.getState()
  );

  // Verify.
  assert.equal(result, 1);
});

QUnit.test("execute() defend initiative", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerKey = PowerOption.DEFEND_INITIATIVE;
  const shipId = 1; // TERRAN_CA
  const powerState = PowerState.create({ powerKey, shipId });

  // Run.
  PowerFunction[powerKey].execute(powerState, store);
  const result = Selector.shipDefendInitiativeCount(shipId, store.getState());

  // Verify.
  assert.equal(result, 1);
});

QUnit.test("execute() enable side slip", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerKey = PowerOption.ENABLE_SIDE_SLIP;
  const shipId = 1; // TERRAN_CA
  const powerState = PowerState.create({ powerKey, shipId });

  // Run.
  PowerFunction[powerKey].execute(powerState, store);
  const result = Selector.isShipSideSlipped(shipId, store.getState());

  // Verify.
  assert.equal(result, true);
});

QUnit.test("execute() reinforce shield", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setVerbose(true));
  const powerKey = PowerOption.REINFORCE_SHIELD;
  const shipId = 1; // TERRAN_CA
  const arcKey = Arc.FORWARD;
  const impulse = "B";
  const powerState = PowerState.create({ powerKey, shipId, arcKey, impulse });

  // Run.
  PowerFunction[powerKey].execute(powerState, store);
  const result = Selector.shipArcReinforceImpulse(
    shipId,
    arcKey,
    store.getState()
  );

  // Verify.
  assert.equal(result, impulse);
});

// /////////////////////////////////////////////////////////////////////////////
QUnit.test("isLegal() change initiative", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerOption = PowerOption.CHANGE_INITIATIVE;
  const shipId = 1; // TERRAN_CA

  // Run.
  const result1 = PowerFunction[powerOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result1, true);

  // Run.
  store.dispatch(ActionCreator.setShipChangeInitiativeCount(shipId, 1));
  const result2 = PowerFunction[powerOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result2, false);
});

QUnit.test("isLegal() charge battery", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerOption = PowerOption.CHARGE_BATTERY;
  const shipId = 1; // TERRAN_CA

  // Run.
  const result1 = PowerFunction[powerOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result1, true);

  // Run.
  store.dispatch(ActionCreator.setShipBatteryCount(shipId, 1));
  const result2 = PowerFunction[powerOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result2, false);
});

QUnit.test("isLegal() charge red", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setCurrentPhase(Phase.POWER_PHASE));
  const powerOption = PowerOption.CHARGE_RED;
  const shipId = 1; // TERRAN_CA
  const weaponIndex = 0;

  // Run.
  const result1 = PowerFunction[powerOption].isLegal(
    shipId,
    weaponIndex,
    store.getState()
  );

  // Verify.
  assert.equal(result1, false);

  // Run.
  store.dispatch(ActionCreator.setShipWeaponIndexRed(shipId, weaponIndex, 0));
  const result2 = PowerFunction[powerOption].isLegal(
    shipId,
    weaponIndex,
    store.getState()
  );

  // Verify.
  assert.equal(result2, true);
});

QUnit.test("isLegal() charge yellow", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerOption = PowerOption.CHARGE_YELLOW;
  const shipId = 1; // TERRAN_CA
  const weaponIndex = 0;

  // Run.
  const result1 = PowerFunction[powerOption].isLegal(
    shipId,
    weaponIndex,
    store.getState()
  );

  // Verify.
  assert.equal(result1, false);

  // Run.
  store.dispatch(
    ActionCreator.setShipWeaponIndexYellow(shipId, weaponIndex, 0)
  );
  const result2 = PowerFunction[powerOption].isLegal(
    shipId,
    weaponIndex,
    store.getState()
  );

  // Verify.
  assert.equal(result2, true);
});

QUnit.test("isLegal() defend initiative", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerOption = PowerOption.DEFEND_INITIATIVE;
  const shipId = 1; // TERRAN_CA

  // Run.
  const result1 = PowerFunction[powerOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result1, true);

  // Run.
  store.dispatch(ActionCreator.setShipDefendInitiativeCount(shipId, 1));
  const result2 = PowerFunction[powerOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result2, false);
});

QUnit.test("isLegal() enable side slip", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerOption = PowerOption.ENABLE_SIDE_SLIP;
  const shipId = 1; // TERRAN_CA

  // Run.
  const result1 = PowerFunction[powerOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result1, true);

  // Run.
  store.dispatch(ActionCreator.setShipSideSlipped(shipId, true));
  const result2 = PowerFunction[powerOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result2, false);
});

QUnit.test("isLegal() power through turn", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerOption = PowerOption.POWER_THROUGH_TURN;
  const shipId = 1; // TERRAN_CA

  // Run.
  const result1 = PowerFunction[powerOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result1, false);

  // Run.
  store.dispatch(ActionCreator.setShipCurrentTurnRadius(shipId, 1));
  const result2 = PowerFunction[powerOption].isLegal(shipId, store.getState());

  // Verify.
  assert.equal(result2, true);
});

QUnit.test("isLegal() reinforce shield", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerOption = PowerOption.REINFORCE_SHIELD;
  const shipId = 1; // TERRAN_CA
  const arcKey = Arc.FORWARD;
  const impulse = "B";

  // Run.
  const result1 = PowerFunction[powerOption].isLegal(
    shipId,
    arcKey,
    store.getState()
  );

  // Verify.
  assert.equal(result1, true);

  // Run.
  store.dispatch(
    ActionCreator.setShipArcReinforceImpulse(shipId, arcKey, impulse)
  );
  const result2 = PowerFunction[powerOption].isLegal(
    shipId,
    arcKey,
    store.getState()
  );

  // Verify.
  assert.equal(result2, false);
});

// /////////////////////////////////////////////////////////////////////////////
QUnit.test("label() change initiative", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerKey = PowerOption.CHANGE_INITIATIVE;
  const shipId = 1; // TERRAN_CA
  const powerState = PowerState.create({ powerKey, shipId });

  // Run.
  const result = PowerFunction[powerKey].label(powerState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon change initiative");
});

QUnit.test("label() charge battery", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerKey = PowerOption.CHARGE_BATTERY;
  const shipId = 1; // TERRAN_CA
  const powerState = PowerState.create({ powerKey, shipId });

  // Run.
  const result = PowerFunction[powerKey].label(powerState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon charge battery");
});

QUnit.test("label() charge red", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerKey = PowerOption.CHARGE_RED;
  const shipId = 1; // TERRAN_CA
  const powerState = PowerState.create({ powerKey, shipId });

  // Run.
  const result = PowerFunction[powerKey].label(powerState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon charge red");
});

QUnit.test("label() charge yellow", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerKey = PowerOption.CHARGE_YELLOW;
  const shipId = 1; // TERRAN_CA
  const powerState = PowerState.create({ powerKey, shipId });

  // Run.
  const result = PowerFunction[powerKey].label(powerState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon charge yellow");
});

QUnit.test("label() defend initiative", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerKey = PowerOption.DEFEND_INITIATIVE;
  const shipId = 1; // TERRAN_CA
  const powerState = PowerState.create({ powerKey, shipId });

  // Run.
  const result = PowerFunction[powerKey].label(powerState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon defend initiative");
});

QUnit.test("label() enable side slip", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerKey = PowerOption.ENABLE_SIDE_SLIP;
  const shipId = 1; // TERRAN_CA
  const powerState = PowerState.create({ powerKey, shipId });

  // Run.
  const result = PowerFunction[powerKey].label(powerState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon enable side slip");
});

QUnit.test("label() power through turn", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerKey = PowerOption.POWER_THROUGH_TURN;
  const shipId = 1; // TERRAN_CA
  const powerState = PowerState.create({ powerKey, shipId });

  // Run.
  const result = PowerFunction[powerKey].label(powerState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon power through turn");
});

QUnit.test("label() reinforce shield", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const powerKey = PowerOption.REINFORCE_SHIELD;
  const shipId = 1; // TERRAN_CA
  const arcKey = Arc.FORWARD;
  const powerState = PowerState.create({ powerKey, shipId, arcKey });

  // Run.
  const result = PowerFunction[powerKey].label(powerState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon reinforce forward shield");
});

const PowerFunctionTest = {};
export default PowerFunctionTest;
