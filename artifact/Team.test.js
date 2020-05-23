import Team from "./Team.js";

QUnit.module("Team");

QUnit.test("keys and values", (assert) => {
  // Run.
  const result = Team.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(Team);

  // Verify.
  ownPropertyNames.forEach((key) => {
    const key2 = Team[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(Team.properties[key2], `Missing value for key = ${key}`);
    }
  });

  result.forEach((value) => {
    const p = ownPropertyNames.filter((key) => Team[key] === value);
    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  });
});

QUnit.test("Team.keys()", (assert) => {
  // Run.
  const result = Team.keys();

  // Verify.
  assert.ok(result);
  const length = 2;
  assert.equal(result.length, length);
  assert.equal(R.head(result), Team.TALON);
  assert.equal(R.last(result), Team.TERRAN);
});

const TeamTest = {};
export default TeamTest;
