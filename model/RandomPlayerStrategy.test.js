import RandomPlayerStrategy from "./RandomPlayerStrategy.js";
import TestData from "./TestData.js";

QUnit.module("RandomPlayerStrategy");

QUnit.test("choosePowerOption()", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const delay = 0;
  const options = [1, 2, 3, 4];

  // Run.
  const done = assert.async();
  const callback = (result) => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    assert.ok(result);
    assert.equal(options.includes(result), true);
    done();
  };

  RandomPlayerStrategy.choosePowerOption(options, store, delay).then(callback);
});

const RandomPlayerStrategyTest = {};
export default RandomPlayerStrategyTest;
