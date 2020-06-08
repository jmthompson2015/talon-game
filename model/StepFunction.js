/* eslint no-console: ["error", { allow: ["log"] }] */

import Arc from "../artifact/Arc.js";
import Step from "../artifact/Step.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameOver from "./GameOver.js";
import MoveFunction from "./MoveFunction.js";
import OptionGenerator from "./OptionGenerator.js";
import PowerFunction from "./PowerFunction.js";
import StrategyResolver from "./StrategyResolver.js";
import WeaponFunction from "./WeaponFunction.js";

const StepFunction = {};

StepFunction[Step.FIRE_WEAPONS] = (store) => {
  let finalAnswer;

  if (!GameOver.isGameOver(store)) {
    // 8 Firing: Any/all ships May Fire, if able.
    const currentPlayer = Selector.currentPlayer(store.getState());
    const delay = Selector.delay(store.getState());
    const shipIds = Selector.shipsByPlayer(currentPlayer.id, store.getState());

    const reduceFunction = (promise, shipId) => {
      const attacker = Selector.ship(shipId, store.getState());
      const options = OptionGenerator.generateShipWeaponOptions(
        attacker,
        store.getState()
      );

      if (options.length > 0) {
        const strategy = StrategyResolver.resolve(currentPlayer.strategy);
        return strategy
          .chooseWeaponOption(options, store.getState(), delay)
          .then((weaponState) => {
            const weaponFunction = WeaponFunction[weaponState.weaponKey];
            weaponFunction.execute(weaponState, store);
          });
      }

      return Promise.resolve();
    };

    finalAnswer = R.reduce(reduceFunction, Promise.resolve(), shipIds);
  } else {
    finalAnswer = Promise.resolve();
  }

  return finalAnswer;
};

StepFunction[Step.MOVE_SHIPS] = (store) => {
  let finalAnswer;

  if (!GameOver.isGameOver(store)) {
    // 7.1 Moving: Move Ships if required or use Afterburner if available.
    const currentPlayer = Selector.currentPlayer(store.getState());
    const phase = Selector.currentPhase(store.getState());
    const delay = Selector.delay(store.getState());
    const shipIds = Selector.shipsByPlayer(currentPlayer.id, store.getState());

    const reduceFunction = (promise, shipId) => {
      const ship = Selector.ship(shipId, store.getState());
      const speed = Selector.shipSpeed(shipId, store.getState());
      let answer;

      if (phase.numbers.includes(speed)) {
        const options = OptionGenerator.generateShipMoveOptions(
          ship,
          store.getState()
        );
        const strategy = StrategyResolver.resolve(currentPlayer.strategy);
        answer = strategy
          .chooseMoveOption(options, store.getState(), delay)
          .then((moveState) => {
            const moveFunction = MoveFunction[moveState.moveKey];
            moveFunction.execute(moveState, store);
          });
      } else {
        answer = Promise.resolve();
      }

      return answer;
    };

    finalAnswer = R.reduce(reduceFunction, Promise.resolve(), shipIds);
  } else {
    finalAnswer = Promise.resolve();
  }

  return finalAnswer;
};

StepFunction[Step.REMOVE_SHIELD_REINFORCEMENT] = (store) => {
  if (!GameOver.isGameOver(store)) {
    // 6.2.3 Remove all expired Shield Reinforcement.
    const currentImpulse = Selector.currentImpulseLetter(store.getState());
    const currentPlayer = Selector.currentPlayer(store.getState());
    const shipIds = Selector.shipsByPlayer(currentPlayer.id, store.getState());
    const arcKeys = Arc.keys();
    const forEachFunction1 = (shipId) => (arcKey) => {
      const reinforceImpulse = Selector.shipArcReinforceImpulse(
        shipId,
        arcKey,
        store.getState()
      );

      if (reinforceImpulse === currentImpulse) {
        store.dispatch(
          ActionCreator.setShipArcReinforceImpulse(shipId, arcKey, undefined)
        );
      }
    };
    const forEachFunction2 = (shipId) => {
      R.forEach(forEachFunction1(shipId), arcKeys);
    };

    R.forEach(forEachFunction2, shipIds);
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
  let finalAnswer;

  if (!GameOver.isGameOver(store)) {
    // 6.1 Spend Available Power: Spend AP, if able or use Battery if available.
    const currentPlayer = Selector.currentPlayer(store.getState());
    const phase = Selector.currentPhase(store.getState());
    const delay = Selector.delay(store.getState());
    const shipIds = Selector.shipsByPlayer(currentPlayer.id, store.getState());

    const reduceFunction = (promise, shipId) => {
      const ship = Selector.ship(shipId, store.getState());
      const power = Selector.shipPower(shipId, store.getState());
      let answer;

      if (phase.numbers.includes(power)) {
        const options = OptionGenerator.generateShipPowerOptions(
          ship,
          store.getState()
        );
        const strategy = StrategyResolver.resolve(currentPlayer.strategy);
        answer = strategy
          .choosePowerOption(options, store.getState(), delay)
          .then((powerState) => {
            const powerFunction = PowerFunction[powerState.powerKey];
            powerFunction.execute(powerState, store);
          });
      } else {
        answer = Promise.resolve();
      }

      return answer;
    };

    finalAnswer = R.reduce(reduceFunction, Promise.resolve(), shipIds);
  } else {
    finalAnswer = Promise.resolve();
  }

  return finalAnswer;
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
      const phaseKey = Selector.isImpulsePhase(store.getState())
        ? "impulse"
        : store.getState().currentPhaseKey;
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
