import Arc from "../artifact/Arc.js";
import PowerOption from "../artifact/PowerOption.js";

import Selector from "../state/Selector.js";

import OptionGenerator from "./OptionGenerator.js";
import TestData from "./TestData.js";

QUnit.module("OptionGenerator");

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
