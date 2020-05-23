import Arc from "./Arc.js";
import Hull from "./Hull.js";
import Ship from "./Ship.js";
import Team from "./Team.js";

QUnit.module("Ship");

QUnit.test("Ship properties Terran CA", (assert) => {
  const shipKey = Ship.TERRAN_CA;
  const properties = Ship.properties[shipKey];
  assert.equal(properties.hull, Hull.HEAVY_CRUISER);
  assert.equal(properties.names.length, 4);
  assert.equal(properties.points, 115);
  assert.equal(properties.teamKey, Team.TERRAN);
  assert.equal(properties.key, "terranCA");

  const powerCurve2 = properties.powerCurves[2];
  assert.equal(powerCurve2.power, 3);
  assert.equal(powerCurve2.speed, 3);
  assert.equal(powerCurve2.turnRadius, 2);
  assert.equal(powerCurve2.isDefault, true);

  const { shields } = properties;
  assert.equal(shields[Arc.FORWARD], 6);
  assert.equal(shields[Arc.RIGHT], 5);
  assert.equal(shields[Arc.REAR], 4);
  assert.equal(shields[Arc.LEFT], 5);
});

QUnit.test("defaultPowerCurveIndex() Talon DN", (assert) => {
  // Setup.
  const shipKey = Ship.TALON_DN;

  // Run.
  const result = Ship.defaultPowerCurveIndex(shipKey);

  // Verify.
  assert.equal(result, 1);
});

QUnit.test("defaultPowerCurveIndex() Terran CA", (assert) => {
  // Setup.
  const shipKey = Ship.TERRAN_CA;

  // Run.
  const result = Ship.defaultPowerCurveIndex(shipKey);

  // Verify.
  assert.equal(result, 2);
});

QUnit.test("required properties", (assert) => {
  // Setup.
  const ships = Ship.values();

  // Run / Verify.
  const forEachFunction = (ship) => {
    assert.ok(ship.hull, `ship.hull = ${ship.hull}`);
    assert.ok(ship.names, `ship.names = ${ship.names}`);
    assert.ok(ship.points, `ship.points = ${ship.points}`);
    assert.ok(ship.powerCurves, `ship.powerCurves = ${ship.powerCurves}`);
    assert.ok(ship.shields, `ship.shields = ${ship.shields}`);
    assert.ok(ship.teamKey, `ship.teamKey = ${ship.teamKey}`);
    if (ship.hull !== Hull.TRANSPORT) {
      assert.ok(ship.weaponGroups, `ship.weaponGroups = ${ship.weaponGroups}`);
    }
    assert.ok(ship.key, `ship.key = ${ship.key}`);
  };
  R.forEach(forEachFunction, ships);
});

QUnit.test("keys and values", (assert) => {
  // Run.
  const result = Ship.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(Ship);

  // Verify.
  ownPropertyNames.forEach((key) => {
    const key2 = Ship[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(Ship.properties[key2], `Missing value for key = ${key}`);
    }
  });

  result.forEach((value) => {
    const p = ownPropertyNames.filter((key) => Ship[key] === value);
    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  });
});

QUnit.test("Ship.keys()", (assert) => {
  // Run.
  const result = Ship.keys();

  // Verify.
  assert.ok(result);
  const length = 19;
  assert.equal(result.length, length);
  assert.equal(R.head(result), Ship.TALON_BASE);
  assert.equal(R.last(result), Ship.TERRAN_TRAN);
});

const ShipTest = {};
export default ShipTest;
