import ActionCreator from "./ActionCreator.js";
import ActionType from "./ActionType.js";

QUnit.module("ActionCreator");

QUnit.test("all action types", (assert) => {
  // Setup.
  const actionTypeKeys = Object.getOwnPropertyNames(ActionType);
  assert.equal(actionTypeKeys.length, 26);

  // Run / Verify.
  actionTypeKeys.forEach((key) => {
    assert.ok(
      ActionCreator[ActionType[key]],
      `actionType = ${key} ${ActionType[key]}`
    );
  });
});

const ActionCreatorTest = {};
export default ActionCreatorTest;
