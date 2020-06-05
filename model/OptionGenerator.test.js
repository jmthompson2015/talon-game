import Arc from "../artifact/Arc.js";
import Heading from "../artifact/Heading.js";
import MoveOption from "../artifact/MoveOption.js";
import PowerOption from "../artifact/PowerOption.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import OptionGenerator from "./OptionGenerator.js";
import TestData from "./TestData.js";

QUnit.module("OptionGenerator");

const verifyMoveState = (
  assert,
  moveState,
  moveKey,
  shipId,
  an1,
  an2,
  headingKey
) => {
  assert.ok(moveState);
  assert.equal(moveState.moveKey, moveKey, "moveKey");
  assert.equal(moveState.shipId, shipId, "shipId");
  assert.equal(moveState.an1, an1, "an1");
  assert.equal(moveState.an2, an2, "an2");
  assert.equal(moveState.headingKey, headingKey, "headingKey");
};

QUnit.test("generateShipMoveOptions()", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const shipId = 1; // TERRAN_CA
  const ship = Selector.ship(shipId, store.getState());
  store.dispatch(ActionCreator.setShipSideSlipped(shipId, true));

  // Run.
  const result = OptionGenerator.generateShipMoveOptions(
    ship,
    store.getState()
  );

  // Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 5);
  const moveState0 = result[0];
  assert.ok(moveState0);
  verifyMoveState(
    assert,
    moveState0,
    MoveOption.MOVE_STRAIGHT,
    shipId,
    "a10",
    "b10"
  );

  const moveState1 = result[1];
  assert.ok(moveState1);
  verifyMoveState(
    assert,
    moveState1,
    MoveOption.SIDE_SLIP_RIGHT,
    shipId,
    "a10",
    "b9"
  );

  const moveState2 = result[2];
  assert.ok(moveState2);
  verifyMoveState(
    assert,
    moveState2,
    MoveOption.SIDE_SLIP_LEFT,
    shipId,
    "a10",
    "a11"
  );

  const moveState3 = result[3];
  assert.ok(moveState3);
  verifyMoveState(
    assert,
    moveState3,
    MoveOption.TURN_RIGHT_AND_MOVE,
    shipId,
    "a10",
    "b9",
    Heading.EAST
  );

  const moveState4 = result[4];
  assert.ok(moveState4);
  verifyMoveState(
    assert,
    moveState4,
    MoveOption.TURN_LEFT_AND_MOVE,
    shipId,
    "a10",
    "a11",
    Heading.THREE_THIRTY_DEGREES
  );
});

// /////////////////////////////////////////////////////////////////////////////
const verifyPowerState = (
  assert,
  powerState,
  powerKey,
  shipId,
  arcKey,
  weaponIndex
) => {
  assert.ok(powerState);
  assert.equal(powerState.powerKey, powerKey, "powerKey");
  assert.equal(powerState.shipId, shipId, "shipId");
  assert.equal(powerState.arcKey, arcKey, "arcKey");
  assert.equal(powerState.weaponIndex, weaponIndex, "weaponIndex");
};

QUnit.test("generateShipPowerOptions()", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const shipId = 1; // TERRAN_CA
  const ship = Selector.ship(shipId, store.getState());

  // Run.
  const result = OptionGenerator.generateShipPowerOptions(
    ship,
    store.getState()
  );

  // Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 8);
  const powerState0 = result[0];
  assert.ok(powerState0);
  verifyPowerState(assert, powerState0, PowerOption.CHANGE_INITIATIVE, shipId);

  const powerState1 = result[1];
  assert.ok(powerState1);
  verifyPowerState(assert, powerState1, PowerOption.CHARGE_BATTERY, shipId);

  const powerState2 = result[2];
  assert.ok(powerState2);
  verifyPowerState(assert, powerState2, PowerOption.DEFEND_INITIATIVE, shipId);

  const powerState3 = result[3];
  assert.ok(powerState3);
  verifyPowerState(assert, powerState3, PowerOption.ENABLE_SIDE_SLIP, shipId);

  const powerState4 = result[4];
  assert.ok(powerState4);
  verifyPowerState(
    assert,
    powerState4,
    PowerOption.REINFORCE_SHIELD,
    shipId,
    Arc.FORWARD
  );

  const powerState5 = result[5];
  assert.ok(powerState5);
  verifyPowerState(
    assert,
    powerState5,
    PowerOption.REINFORCE_SHIELD,
    shipId,
    Arc.RIGHT
  );

  const powerState6 = result[6];
  assert.ok(powerState6);
  verifyPowerState(
    assert,
    powerState6,
    PowerOption.REINFORCE_SHIELD,
    shipId,
    Arc.REAR
  );

  const powerState7 = result[7];
  assert.ok(powerState7);
  verifyPowerState(
    assert,
    powerState7,
    PowerOption.REINFORCE_SHIELD,
    shipId,
    Arc.LEFT
  );
});

const OptionGeneratorTest = {};
export default OptionGeneratorTest;
