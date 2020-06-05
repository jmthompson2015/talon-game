import Arc from "./Arc.js";
import Heading from "./Heading.js";
import Hull from "./Hull.js";
import MoveOption from "./MoveOption.js";
import Phase from "./Phase.js";
import Resolver from "./Resolver.js";
import Ship from "./Ship.js";
import Step from "./Step.js";
import Team from "./Team.js";
import Weapon from "./Weapon.js";

QUnit.module("Resolver");

QUnit.test("arc()", (assert) => {
  // Run / Verify.
  const forEachFunction = (key) => {
    assert.equal(Resolver.arc(key), Arc.properties[key]);
  };
  R.forEach(forEachFunction, Arc.keys());
});

QUnit.test("heading()", (assert) => {
  // Run / Verify.
  const forEachFunction = (key) => {
    assert.equal(Resolver.heading(key), Heading.properties[key]);
  };
  R.forEach(forEachFunction, Heading.keys());
});

QUnit.test("hull()", (assert) => {
  // Run / Verify.
  const forEachFunction = (key) => {
    assert.equal(Resolver.hull(key), Hull.properties[key]);
  };
  R.forEach(forEachFunction, Hull.keys());
});

QUnit.test("moveOption()", (assert) => {
  // Run / Verify.
  const forEachFunction = (key) => {
    assert.equal(Resolver.moveOption(key), MoveOption.properties[key]);
  };
  R.forEach(forEachFunction, MoveOption.keys());
});

QUnit.test("phase()", (assert) => {
  // Run / Verify.
  const forEachFunction = (key) => {
    assert.equal(Resolver.phase(key), Phase.properties[key]);
  };
  R.forEach(forEachFunction, Phase.keys());
});

QUnit.test("ship()", (assert) => {
  // Run / Verify.
  const forEachFunction = (key) => {
    assert.equal(Resolver.ship(key), Ship.properties[key]);
  };
  R.forEach(forEachFunction, Ship.keys());
});

QUnit.test("shipHullBox() Talon CA", (assert) => {
  // Setup.
  const shipKey = Ship.TALON_CA;

  // Run / Verify.
  const hullBox0 = Resolver.shipHullBox(shipKey, 0);
  assert.equal(hullBox0.power, 0);
  assert.equal(hullBox0.type, "hull");
  const hullBox6 = Resolver.shipHullBox(shipKey, 6);
  assert.equal(hullBox6.power, -2);
  assert.equal(hullBox6.type, "hull");
});

QUnit.test("shipName() Talon CA", (assert) => {
  // Setup.
  const shipKey = Ship.TALON_CA;

  // Run / Verify.
  assert.equal(Resolver.shipName(shipKey, 0), "Justice");
  assert.equal(Resolver.shipName(shipKey, 3), "Unity");
});

QUnit.test("shipPowerCurve() Talon CA", (assert) => {
  // Setup.
  const shipKey = Ship.TALON_CA;

  // Run / Verify.
  const powerCurve0 = Resolver.shipPowerCurve(shipKey, 0);
  assert.equal(powerCurve0.power, 1);
  assert.equal(powerCurve0.speed, 5);
  assert.equal(powerCurve0.turnRadius, 2);
  const powerCurve4 = Resolver.shipPowerCurve(shipKey, 4);
  assert.equal(powerCurve4.power, 5);
  assert.equal(powerCurve4.speed, 1);
  assert.equal(powerCurve4.turnRadius, 0);
});

QUnit.test("shipShield() Talon CA", (assert) => {
  // Setup.
  const shipKey = Ship.TALON_CA;

  // Run / Verify.
  assert.equal(Resolver.shipShield(shipKey, Arc.FORWARD), 7);
  assert.equal(Resolver.shipShield(shipKey, Arc.RIGHT), 4);
  assert.equal(Resolver.shipShield(shipKey, Arc.REAR), 3);
  assert.equal(Resolver.shipShield(shipKey, Arc.LEFT), 4);
});

QUnit.test("shipWeaponGroup() Talon CA", (assert) => {
  // Setup.
  const shipKey = Ship.TALON_CA;

  // Run / Verify.
  const weaponGroup0 = Resolver.shipWeaponGroup(shipKey, 0);
  assert.equal(weaponGroup0.weaponKey, Weapon.DISRUPTOR);
  assert.equal(weaponGroup0.red, 1);
  assert.equal(weaponGroup0.yellow, 4);
  assert.equal(weaponGroup0.count, 2);
  const weaponGroup1 = Resolver.shipWeaponGroup(shipKey, 1);
  assert.equal(weaponGroup1.weaponKey, Weapon.DISRUPTOR);
  assert.equal(weaponGroup1.red, 1);
  assert.equal(weaponGroup1.yellow, 4);
  assert.equal(weaponGroup1.count, 2);
});

QUnit.test("step()", (assert) => {
  // Run / Verify.
  const forEachFunction = (key) => {
    assert.equal(Resolver.step(key), Step.properties[key]);
  };
  R.forEach(forEachFunction, Step.keys());
});

QUnit.test("team()", (assert) => {
  // Run / Verify.
  const forEachFunction = (key) => {
    assert.equal(Resolver.team(key), Team.properties[key]);
  };
  R.forEach(forEachFunction, Team.keys());
});

QUnit.test("weapon()", (assert) => {
  // Run / Verify.
  const forEachFunction = (key) => {
    assert.equal(Resolver.weapon(key), Weapon.properties[key]);
  };
  R.forEach(forEachFunction, Weapon.keys());
});

const ResolverTest = {};
export default ResolverTest;
