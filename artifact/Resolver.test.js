import Arc from "./Arc.js";
import Hull from "./Hull.js";
import Phase from "./Phase.js";
import Resolver from "./Resolver.js";
import Ship from "./Ship.js";
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

QUnit.test("hull()", (assert) => {
  // Run / Verify.
  const forEachFunction = (key) => {
    assert.equal(Resolver.hull(key), Hull.properties[key]);
  };
  R.forEach(forEachFunction, Hull.keys());
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
