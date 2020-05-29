import PhaseFunction from "./PhaseFunction.js";
import TestData from "./TestData.js";

QUnit.module("PhaseFunction");

QUnit.skip("impulseA.execute()", (assert) => {
  // Setup.
  const store = TestData.createStore();

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    done();
  };

  PhaseFunction.impulseA.execute(store).then(callback);
});

const PhaseFunctionTest = {};
export default PhaseFunctionTest;
