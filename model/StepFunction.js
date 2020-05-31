/* eslint no-console: ["error", { allow: ["log"] }] */

import Phase from "../artifact/Phase.js";
import Step from "../artifact/Step.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameOver from "./GameOver.js";

const StepFunction = {};

const checkInitiative = (store) => {
  // 4.2 Check for initiative change.
  store.dispatch(ActionCreator.setCurrentStep(Step.CHECK_INITIATIVE));
  const currentPlayer = Selector.currentPlayer(store.getState());
  console.log(`StepFunction.checkInitiative() ${currentPlayer.name}`);
};

const fireWeapons = (store) => {
  // 8 Firing: Any/all ships May Fire, if able.
  store.dispatch(ActionCreator.setCurrentStep(Step.FIRE_WEAPONS));
  const currentPlayer = Selector.currentPlayer(store.getState());
  console.log(`StepFunction.fireWeapons() ${currentPlayer.name}`);
};

const moveShips = (store) => {
  // 7.1 Moving: Move Ships if required or use Afterburner if available.
  store.dispatch(ActionCreator.setCurrentStep(Step.MOVE_SHIPS));
  const currentPlayer = Selector.currentPlayer(store.getState());
  console.log(`StepFunction.moveShips() ${currentPlayer.name}`);
};

const removeShieldReinforcement = (store) => {
  // 6.2.3 Remove all expired Shield Reinforcement.
  store.dispatch(
    ActionCreator.setCurrentStep(Step.REMOVE_SHIELD_REINFORCEMENT)
  );
  const currentPlayer = Selector.currentPlayer(store.getState());
  console.log(`StepFunction.removeShieldReinforcement() ${currentPlayer.name}`);
};

const repairCriticalDamage = (store) => {
  // 8.7 Repair of Critical Damage: Attempt to Repair all Repairable Damage.
  store.dispatch(ActionCreator.setCurrentStep(Step.REPAIR_CRITICAL_DAMAGE));
  const currentPlayer = Selector.currentPlayer(store.getState());
  console.log(`StepFunction.repairCriticalDamage() ${currentPlayer.name}`);
};

const spendAvailablePower = (store) => {
  // 6.1 Spend Available Power: Spend AP, if able or use Battery if available.
  store.dispatch(ActionCreator.setCurrentStep(Step.SPEND_AVAILABLE_POWER));
  const currentPlayer = Selector.currentPlayer(store.getState());
  console.log(`StepFunction.spendAvailablePower() ${currentPlayer.name}`);
};

const executeImpulse = (store) =>
  new Promise((resolve) => {
    if (!GameOver.isGameOver(store)) {
      removeShieldReinforcement(store);
    }
    resolve();
  })
    .then(() => {
      if (!GameOver.isGameOver(store)) {
        spendAvailablePower(store);
      }
    })
    .then(() => {
      if (!GameOver.isGameOver(store)) {
        moveShips(store);
      }
    })
    .then(() => {
      if (!GameOver.isGameOver(store)) {
        fireWeapons(store);
      }
    })
    .then(() => {
      if (!GameOver.isGameOver(store)) {
        repairCriticalDamage(store);
      }
    })
    .then(() => {
      if (!GameOver.isGameOver(store)) {
        checkInitiative(store);
      }
    })
    .then(() => {
      store.dispatch(ActionCreator.setCurrentStep(undefined));
    });

// /////////////////////////////////////////////////////////////////////////////
const adjustPowerCurve = (store) => {
  store.dispatch(ActionCreator.setCurrentStep(Step.ADJUST_POWER_CURVE));
  const currentPlayer = Selector.currentPlayer(store.getState());
  console.log(`StepFunction.adjustPowerCurve() ${currentPlayer.name}`);
};

const chargeWeapon = (store) => {
  store.dispatch(ActionCreator.setCurrentStep(Step.CHARGE_WEAPON));
  const currentPlayer = Selector.currentPlayer(store.getState());
  console.log(`StepFunction.chargeWeapon() ${currentPlayer.name}`);
};

const executePowerPhase = (store) =>
  new Promise((resolve) => {
    if (!GameOver.isGameOver(store)) {
      chargeWeapon(store);
    }
    resolve();
  })
    .then(() => {
      if (!GameOver.isGameOver(store)) {
        adjustPowerCurve(store);
      }
    })
    .then(() => {
      store.dispatch(ActionCreator.setCurrentStep(undefined));
    });

// /////////////////////////////////////////////////////////////////////////////
const reinforcement = (store) => {
  store.dispatch(ActionCreator.setCurrentStep(Step.REINFORCEMENT));
  const currentPlayer = Selector.currentPlayer(store.getState());
  console.log(`StepFunction.reinforcement() ${currentPlayer.name}`);
};

const executeReinforcementPhase = (store) =>
  new Promise((resolve) => {
    if (!GameOver.isGameOver(store)) {
      reinforcement(store);
    }
    resolve();
  }).then(() => {
    store.dispatch(ActionCreator.setCurrentStep(undefined));
  });

// /////////////////////////////////////////////////////////////////////////////
const retreat = (store) => {
  store.dispatch(ActionCreator.setCurrentStep(Step.RETREAT));
  const currentPlayer = Selector.currentPlayer(store.getState());
  console.log(`StepFunction.retreat() ${currentPlayer.name}`);
};

const executeRetreatPhase = (store) =>
  new Promise((resolve) => {
    if (!GameOver.isGameOver(store)) {
      retreat(store);
    }
    resolve();
  }).then(() => {
    store.dispatch(ActionCreator.setCurrentStep(undefined));
  });

// /////////////////////////////////////////////////////////////////////////////
StepFunction.execute = (store) => {
  const phaseKey = store.getState().currentPhaseKey;

  if (phaseKey && phaseKey.startsWith("impulse")) {
    return executeImpulse(store);
  }

  if (phaseKey === Phase.POWER_PHASE) {
    return executePowerPhase(store);
  }

  if (phaseKey === Phase.REINFORCEMENT_PHASE) {
    return executeReinforcementPhase(store);
  }

  if (phaseKey === Phase.RETREAT_PHASE) {
    return executeRetreatPhase(store);
  }

  return null;
};

Object.freeze(StepFunction);

export default StepFunction;
