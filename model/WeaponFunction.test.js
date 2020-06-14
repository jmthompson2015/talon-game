import Arc from "../artifact/Arc.js";
import Weapon from "../artifact/Weapon.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";
import WeaponState from "../state/WeaponState.js";

import WeaponFunction from "./WeaponFunction.js";
import TestData from "./TestData.js";

QUnit.module("WeaponFunction");

QUnit.test("applyDamage() forward 2", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const defenderId = 3;
  const defender = Selector.ship(defenderId, store.getState());
  const shieldArc = Arc.FORWARD;
  const damage = 2;
  store.dispatch(ActionCreator.setVerbose(true));

  // Run.
  WeaponFunction.applyDamage(defender, shieldArc, damage, store);

  // Verify.
  const state = store.getState();
  const shield = Selector.shipArcShieldCount(defenderId, shieldArc, state);
  assert.equal(shield, 5, `shield = ${shield}`);
  const hull = Selector.shipHullIndex(defenderId, state);
  assert.equal(hull, 0, `hull = ${hull}`);
});

QUnit.test("applyDamage() rear 7", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const defenderId = 3;
  const defender = Selector.ship(defenderId, store.getState());
  const shieldArc = Arc.REAR;
  const damage = 7;
  store.dispatch(ActionCreator.setVerbose(true));

  // Run.
  WeaponFunction.applyDamage(defender, shieldArc, damage, store);

  // Verify.
  const state = store.getState();
  const shield = Selector.shipArcShieldCount(defenderId, shieldArc, state);
  assert.equal(shield, 0, `shield = ${shield}`);
  const hull = Selector.shipHullIndex(defenderId, state);
  assert.equal(hull, 4, `hull = ${hull}`);
});

QUnit.test("execute() fire anti-matter torpedo", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.clearShip("m1"));
  store.dispatch(ActionCreator.setShip("h11", 3));
  const weaponKey = Weapon.ANTI_MATTER_TORPEDO;
  const attackerId = 1; // TERRAN_CA
  const defenderIds = [3];
  const weaponGroupIndex = 0;
  const weaponState = WeaponState.create({
    weaponKey,
    attackerId,
    weaponGroupIndex,
    defenderIds,
  });
  store.dispatch(ActionCreator.setVerbose(true));

  // Run.
  WeaponFunction[weaponKey].execute(weaponState, store);

  // Verify.
  const state = store.getState();
  const shield = Selector.shipArcShieldCount(
    defenderIds[0],
    Arc.FORWARD,
    state
  );
  assert.equal([5, 6].includes(shield), true, `shield = ${shield}`);
  const hull = Selector.shipHullIndex(defenderIds[0], state);
  assert.equal([0].includes(hull), true, `hull = ${hull}`);
  assert.equal(
    Selector.shipWeaponGroupRed(attackerId, weaponGroupIndex, state),
    0
  );
  assert.equal(
    Selector.shipWeaponGroupYellow(attackerId, weaponGroupIndex, state),
    0
  );
});

QUnit.test("execute() fire disruptor", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.clearShip("m1"));
  store.dispatch(ActionCreator.setShip("h11", 3));
  const weaponKey = Weapon.DISRUPTOR;
  const attackerId = 3; // TALON_CA
  const defenderIds = [1, 2];
  const weaponGroupIndex = 0;
  const weaponState = WeaponState.create({
    weaponKey,
    attackerId,
    weaponGroupIndex,
    defenderIds,
  });
  store.dispatch(ActionCreator.setVerbose(true));

  // Run.
  WeaponFunction[weaponKey].execute(weaponState, store);

  // Verify.
  const state = store.getState();
  const shield1 = Selector.shipArcShieldCount(1, Arc.LEFT, state);
  assert.equal([3, 5].includes(shield1), true, `shield1 = ${shield1}`);
  const hull1 = Selector.shipHullIndex(1, state);
  assert.equal(hull1, 0, `hull1 = ${hull1}`);

  const shield2 = Selector.shipArcShieldCount(2, Arc.FORWARD, state);
  assert.equal([5, 6].includes(shield2), true, `shield2 = ${shield2}`);
  const hull2 = Selector.shipHullIndex(2, state);
  assert.equal(hull2, 0, `hull2 = ${hull2}`);

  assert.equal(
    Selector.shipWeaponGroupRed(attackerId, weaponGroupIndex, state),
    0
  );
  assert.equal(
    Selector.shipWeaponGroupYellow(attackerId, weaponGroupIndex, state),
    0
  );
});

QUnit.test("execute() fire fusion cannon", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.clearShip("m1"));
  store.dispatch(ActionCreator.setShip("h11", 3));
  const weaponKey = Weapon.FUSION_CANNON;
  const attackerId = 3; // TALON_CA
  const defenderIds = [1, 2];
  const weaponGroupIndex = 0;
  const weaponState = WeaponState.create({
    weaponKey,
    attackerId,
    weaponGroupIndex,
    defenderIds,
  });
  store.dispatch(ActionCreator.setVerbose(true));

  // Run.
  WeaponFunction[weaponKey].execute(weaponState, store);

  // Verify.
  const state = store.getState();
  const shield1 = Selector.shipArcShieldCount(1, Arc.LEFT, state);
  assert.equal([3, 5].includes(shield1), true, `shield1 = ${shield1}`);
  const hull1 = Selector.shipHullIndex(1, state);
  assert.equal(hull1, 0, `hull1 = ${hull1}`);

  const shield2 = Selector.shipArcShieldCount(2, Arc.FORWARD, state);
  assert.equal([5, 6].includes(shield2), true, `shield2 = ${shield2}`);
  const hull2 = Selector.shipHullIndex(2, state);
  assert.equal(hull2, 0, `hull2 = ${hull2}`);

  assert.equal(
    Selector.shipWeaponGroupRed(attackerId, weaponGroupIndex, state),
    0
  );
  assert.equal(
    Selector.shipWeaponGroupYellow(attackerId, weaponGroupIndex, state),
    0
  );
});

QUnit.test("execute() fire phaser", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.clearShip("m1"));
  store.dispatch(ActionCreator.setShip("h11", 3));
  const weaponKey = Weapon.PHASER;
  const attackerId = 1; // TERRAN_CA
  const defenderIds = [3];
  const weaponGroupIndex = 0;
  const weaponState = WeaponState.create({
    weaponKey,
    attackerId,
    weaponGroupIndex,
    defenderIds,
  });
  store.dispatch(ActionCreator.setVerbose(true));

  // Run.
  WeaponFunction[weaponKey].execute(weaponState, store);

  // Verify.
  const state = store.getState();
  const shield = Selector.shipArcShieldCount(
    defenderIds[0],
    Arc.FORWARD,
    state
  );
  assert.equal([5, 6].includes(shield), true, `shield = ${shield}`);
  const hull = Selector.shipHullIndex(defenderIds[0], state);
  assert.equal([0].includes(hull), true, `hull = ${hull}`);
  assert.equal(
    Selector.shipWeaponGroupRed(attackerId, weaponGroupIndex, state),
    0
  );
  assert.equal(
    Selector.shipWeaponGroupYellow(attackerId, weaponGroupIndex, state),
    0
  );
});

QUnit.test("execute() fire wave motion gun", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.clearShip("m1"));
  store.dispatch(ActionCreator.setShip("h11", 3));
  const weaponKey = Weapon.WAVE_MOTION_GUN;
  const attackerId = 1; // TERRAN_CA
  const defenderIds = [3];
  const weaponGroupIndex = 0;
  const weaponState = WeaponState.create({
    weaponKey,
    attackerId,
    weaponGroupIndex,
    defenderIds,
  });
  store.dispatch(ActionCreator.setVerbose(true));

  // Run.
  WeaponFunction[weaponKey].execute(weaponState, store);

  // Verify.
  const state = store.getState();
  const shield = Selector.shipArcShieldCount(
    defenderIds[0],
    Arc.FORWARD,
    state
  );
  assert.equal([5, 6].includes(shield), true, `shield = ${shield}`);
  const hull = Selector.shipHullIndex(defenderIds[0], state);
  assert.equal([0].includes(hull), true, `hull = ${hull}`);
  assert.equal(
    Selector.shipWeaponGroupRed(attackerId, weaponGroupIndex, state),
    0
  );
  assert.equal(
    Selector.shipWeaponGroupYellow(attackerId, weaponGroupIndex, state),
    0
  );
});

// // /////////////////////////////////////////////////////////////////////////////
QUnit.test("isLegal() fire anti-matter torpedo", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const attackerId = 1; // TERRAN_CA
  const weaponGroupIndex = 0;
  const defenderId = 3;
  const weaponKey = Weapon.ANTI_MATTER_TORPEDO;
  store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.clearShip("m1"));
  store.dispatch(ActionCreator.setShip("h9", defenderId));

  // Run.
  const result1 = WeaponFunction[weaponKey].isLegal(
    attackerId,
    weaponGroupIndex,
    defenderId,
    store.getState()
  );

  // Verify.
  assert.equal(result1, true);
});

QUnit.test("isLegal() fire disruptor", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const attackerId = 1; // TERRAN_CA
  const weaponGroupIndex = 0;
  const defenderId = 3;
  const weaponKey = Weapon.DISRUPTOR;
  store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.clearShip("m1"));
  store.dispatch(ActionCreator.setShip("h9", defenderId));

  // Run.
  const result1 = WeaponFunction[weaponKey].isLegal(
    attackerId,
    weaponGroupIndex,
    defenderId,
    store.getState()
  );

  // Verify.
  assert.equal(result1, true);
});

QUnit.test("isLegal() fire fusion cannon", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const attackerId = 1; // TERRAN_CA
  const weaponGroupIndex = 0;
  const defenderId = 3;
  const weaponKey = Weapon.FUSION_CANNON;
  store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.clearShip("m1"));
  store.dispatch(ActionCreator.setShip("h9", defenderId));

  // Run.
  const result1 = WeaponFunction[weaponKey].isLegal(
    attackerId,
    weaponGroupIndex,
    defenderId,
    store.getState()
  );

  // Verify.
  assert.equal(result1, true);
});

QUnit.test("isLegal() fire missile", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const attackerId = 1; // TERRAN_CA
  const weaponGroupIndex = 0;
  const defenderId = 3;
  const weaponKey = Weapon.MISSILE;
  store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.clearShip("m1"));
  store.dispatch(ActionCreator.setShip("h9", defenderId));

  // Run.
  const result1 = WeaponFunction[weaponKey].isLegal(
    attackerId,
    weaponGroupIndex,
    defenderId,
    store.getState()
  );

  // Verify.
  assert.equal(result1, true);
});

QUnit.test("isLegal() fire phaser", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const attackerId = 1; // TERRAN_CA
  const weaponGroupIndex = 0;
  const defenderId = 3;
  const weaponKey = Weapon.PHASER;
  store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.clearShip("m1"));
  store.dispatch(ActionCreator.setShip("h9", defenderId));

  // Run.
  const result1 = WeaponFunction[weaponKey].isLegal(
    attackerId,
    weaponGroupIndex,
    defenderId,
    store.getState()
  );

  // Verify.
  assert.equal(result1, true);
});

QUnit.test("isLegal() fire wave motion gun", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const attackerId = 1; // TERRAN_CA
  const weaponGroupIndex = 0;
  const defenderId = 3;
  const weaponKey = Weapon.WAVE_MOTION_GUN;
  store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.clearShip("m1"));
  store.dispatch(ActionCreator.setShip("h9", defenderId));

  // Run.
  const result1 = WeaponFunction[weaponKey].isLegal(
    attackerId,
    weaponGroupIndex,
    defenderId,
    store.getState()
  );

  // Verify.
  assert.equal(result1, true);
});

// // /////////////////////////////////////////////////////////////////////////////
QUnit.test("label() fire anti-matter torpedo", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const attackerId = 1; // TERRAN_CA
  const weaponGroupIndex = 1;
  const defenderIds = [3]; // TALON_CA
  const weaponState = WeaponState.create({
    attackerId,
    weaponGroupIndex,
    defenderIds,
  });
  const weaponKey = Weapon.ANTI_MATTER_TORPEDO;

  // Run.
  const result = WeaponFunction[weaponKey].label(weaponState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon fires anti-matter torpedo at CA Justice");
});

QUnit.test("label() fire disruptor", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const attackerId = 1; // TERRAN_CA
  const weaponGroupIndex = 1;
  const defenderIds = [3]; // TALON_CA
  const weaponState = WeaponState.create({
    attackerId,
    weaponGroupIndex,
    defenderIds,
  });
  const weaponKey = Weapon.DISRUPTOR;

  // Run.
  const result = WeaponFunction[weaponKey].label(weaponState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon fires disruptor at CA Justice");
});

QUnit.test("label() fire fusion cannon", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const attackerId = 1; // TERRAN_CA
  const weaponGroupIndex = 1;
  const defenderIds = [3]; // TALON_CA
  const weaponState = WeaponState.create({
    attackerId,
    weaponGroupIndex,
    defenderIds,
  });
  const weaponKey = Weapon.FUSION_CANNON;

  // Run.
  const result = WeaponFunction[weaponKey].label(weaponState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon fires fusion cannon at CA Justice");
});

QUnit.test("label() fire missile", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const attackerId = 1; // TERRAN_CA
  const weaponGroupIndex = 1;
  const defenderIds = [3]; // TALON_CA
  const weaponState = WeaponState.create({
    attackerId,
    weaponGroupIndex,
    defenderIds,
  });
  const weaponKey = Weapon.MISSILE;

  // Run.
  const result = WeaponFunction[weaponKey].label(weaponState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon fires missile at CA Justice");
});

QUnit.test("label() fire phaser", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const attackerId = 1; // TERRAN_CA
  const weaponGroupIndex = 1;
  const defenderIds = [3]; // TALON_CA
  const weaponState = WeaponState.create({
    attackerId,
    weaponGroupIndex,
    defenderIds,
  });
  const weaponKey = Weapon.PHASER;

  // Run.
  const result = WeaponFunction[weaponKey].label(weaponState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon fires phaser at CA Justice");
});

QUnit.test("label() fire wave motion gun", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const attackerId = 1; // TERRAN_CA
  const weaponGroupIndex = 1;
  const defenderIds = [3]; // TALON_CA
  const weaponState = WeaponState.create({
    attackerId,
    weaponGroupIndex,
    defenderIds,
  });
  const weaponKey = Weapon.WAVE_MOTION_GUN;

  // Run.
  const result = WeaponFunction[weaponKey].label(weaponState, store.getState());

  // Verify.
  assert.equal(result, "CA Napoleon fires wave motion gun at CA Justice");
});

const WeaponFunctionTest = {};
export default WeaponFunctionTest;
