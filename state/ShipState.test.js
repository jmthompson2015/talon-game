import ShipState from "./ShipState.js";

QUnit.module("ShipState");

const PROPS = ["id", "shipKey", "nameIndex"];

const createTestData = () =>
  ShipState.create({ id: 1, shipKey: 2, nameIndex: 3 });

QUnit.test("create()", (assert) => {
  // Run.
  const ship = createTestData();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(ship[prop], i + 1);
  });
});

QUnit.test("create() immutable", (assert) => {
  // Setup.
  const ship = createTestData();

  // Run / Verify.
  try {
    ship.nameIndex = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

QUnit.test("toString()", (assert) => {
  // Setup.
  const ship = createTestData();

  // Run.
  const result = ShipState.toString(ship);

  // Verify.
  assert.ok(result);
  assert.equal(result, '{"id":1,"shipKey":2,"nameIndex":3}');
});

const ShipStateTest = {};
export default ShipStateTest;
