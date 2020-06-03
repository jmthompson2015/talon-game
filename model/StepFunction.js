/* eslint no-console: ["error", { allow: ["log"] }] */

import Step from "../artifact/Step.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameOver from "./GameOver.js";

const StepFunction = {};

StepFunction[Step.CHECK_INITIATIVE] = (store) => {
  if (!GameOver.isGameOver(store)) {
    // 4.2 Check for initiative change.
    const currentPlayer = Selector.currentPlayer(store.getState());
    console.log(`StepFunction.checkInitiative() ${currentPlayer.name}`);
  }

  return Promise.resolve();
};

StepFunction[Step.FIRE_WEAPONS] = (store) => {
  if (!GameOver.isGameOver(store)) {
    // 8 Firing: Any/all ships May Fire, if able.
    const currentPlayer = Selector.currentPlayer(store.getState());
    console.log(`StepFunction.fireWeapons() ${currentPlayer.name}`);
  }

  return Promise.resolve();
};

StepFunction[Step.MOVE_SHIPS] = (store) => {
  if (!GameOver.isGameOver(store)) {
    // 7.1 Moving: Move Ships if required or use Afterburner if available.
    const currentPlayer = Selector.currentPlayer(store.getState());
    console.log(`StepFunction.moveShips() ${currentPlayer.name}`);
  }

  return Promise.resolve();
};

StepFunction[Step.REMOVE_SHIELD_REINFORCEMENT] = (store) => {
  if (!GameOver.isGameOver(store)) {
    // 6.2.3 Remove all expired Shield Reinforcement.
    const currentPlayer = Selector.currentPlayer(store.getState());
    console.log(
      `StepFunction.removeShieldReinforcement() ${currentPlayer.name}`
    );
  }

  return Promise.resolve();
};

StepFunction[Step.REPAIR_CRITICAL_DAMAGE] = (store) => {
  if (!GameOver.isGameOver(store)) {
    // 8.7 Repair of Critical Damage: Attempt to Repair all Repairable Damage.
    const currentPlayer = Selector.currentPlayer(store.getState());
    console.log(`StepFunction.repairCriticalDamage() ${currentPlayer.name}`);
  }

  return Promise.resolve();
};

StepFunction[Step.SPEND_AVAILABLE_POWER] = (store) => {
  if (!GameOver.isGameOver(store)) {
    // 6.1 Spend Available Power: Spend AP, if able or use Battery if available.
    const currentPlayer = Selector.currentPlayer(store.getState());
    console.log(`StepFunction.spendAvailablePower() ${currentPlayer.name}`);
  }

  return Promise.resolve();
};

// /////////////////////////////////////////////////////////////////////////////
StepFunction[Step.ADJUST_POWER_CURVE] = (store) => {
  if (!GameOver.isGameOver(store)) {
    const currentPlayer = Selector.currentPlayer(store.getState());
    console.log(`StepFunction.adjustPowerCurve() ${currentPlayer.name}`);
  }

  return Promise.resolve();
};

StepFunction[Step.CHARGE_WEAPON] = (store) => {
  if (!GameOver.isGameOver(store)) {
    const currentPlayer = Selector.currentPlayer(store.getState());
    console.log(`StepFunction.chargeWeapon() ${currentPlayer.name}`);
  }

  return Promise.resolve();
};

// /////////////////////////////////////////////////////////////////////////////
StepFunction[Step.REINFORCEMENT] = (store) => {
  if (!GameOver.isGameOver(store)) {
    store.dispatch(ActionCreator.setCurrentStep(Step.REINFORCEMENT));
    const currentPlayer = Selector.currentPlayer(store.getState());
    console.log(`StepFunction.reinforcement() ${currentPlayer.name}`);
  }

  return Promise.resolve();
};

// /////////////////////////////////////////////////////////////////////////////
StepFunction[Step.RETREAT] = (store) => {
  if (!GameOver.isGameOver(store)) {
    store.dispatch(ActionCreator.setCurrentStep(Step.RETREAT));
    const currentPlayer = Selector.currentPlayer(store.getState());
    console.log(`StepFunction.retreat() ${currentPlayer.name}`);
  }

  return Promise.resolve();
};

// /////////////////////////////////////////////////////////////////////////////
StepFunction.execute = (store) =>
  new Promise((resolve) => {
    if (GameOver.isGameOver(store)) {
      resolve();
    } else {
      const phaseKey0 = store.getState().currentPhaseKey;
      // const phaseKey =
      //   phaseKey0 && phaseKey0.startsWith("impulse") ? "impulse" : phaseKey0;
      const phaseKey = Selector.isImpulsePhase(store.getState())
        ? "impulse"
        : phaseKey0;
      const stepKeys = Step.keysByPhase(phaseKey);
      const reduceFunction = (promise, stepKey) =>
        promise.then(() => {
          store.dispatch(ActionCreator.setCurrentStep(stepKey));
          return StepFunction[stepKey](store);
        });
      R.reduce(reduceFunction, Promise.resolve(), stepKeys).then(() => {
        store.dispatch(ActionCreator.setCurrentStep(undefined));
        resolve();
      });
    }
  });

Object.freeze(StepFunction);

export default StepFunction;
