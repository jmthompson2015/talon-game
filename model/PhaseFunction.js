/* eslint no-console: ["error", { allow: ["log"] }] */

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameOver from "./GameOver.js";

const PhaseFunction = {};

const checkInitiativeChange = (store) => {
  // 4.2 Check for initiative change.
  const currentPlayer = Selector.currentPlayer(store.getState());
  console.log(`PhaseFunction.checkInitiativeChange() ${currentPlayer.name}`);
};

const fireWeapons = (store) =>
  new Promise((resolve) => {
    // 8 Firing: Any/all ships May Fire, if able.
    const currentPlayer = Selector.currentPlayer(store.getState());
    console.log(`PhaseFunction.fireWeapons() ${currentPlayer.name}`);
    resolve();
  });

const moveShips = (store) =>
  new Promise((resolve) => {
    // 7.1 Moving: Move Ships if required or use Afterburner if available.
    const currentPlayer = Selector.currentPlayer(store.getState());
    console.log(`PhaseFunction.moveShips() ${currentPlayer.name}`);
    resolve();
  });

const removeExpiredShieldReinforcement = (store) => {
  // 6.2.3 Remove all expired Shield Reinforcement.
  const currentPlayer = Selector.currentPlayer(store.getState());
  console.log(
    `PhaseFunction.removeExpiredShieldReinforcement() ${currentPlayer.name}`
  );
};

const repairCriticalDamage = (store) =>
  new Promise((resolve) => {
    // 8.7 Repair of Critical Damage: Attempt to Repair all Repairable Damage.
    const currentPlayer = Selector.currentPlayer(store.getState());
    console.log(`PhaseFunction.repairCriticalDamage() ${currentPlayer.name}`);
    resolve();
  });

const spendAP = (store) =>
  new Promise((resolve) => {
    // 6.1 Spend Available Power: Spend AP, if able or use Battery if available.
    const currentPlayer = Selector.currentPlayer(store.getState());
    console.log(`PhaseFunction.spendAP() ${currentPlayer.name}`);
    // AP Use
    // 4.2 Change Initiative
    // 4.2 Defend Initiative
    // 6.2 Shield Reinforcement
    // 7.2 Power Through a Turn
    // 7.3 Enable Side Slip
    // 8.1 Charge a Yellow Box
    // 10.1 Charge a Battery
    // 12.2.2 (Bases and CVs) Transmit Power to Fighters
    // 13.7 (Ships with Missiles) Redirect Missile
    resolve();
  });

const executePlayerTurn = (store) =>
  new Promise((resolve) => {
    if (!GameOver.isGameOver(store)) {
      // 1: 6.2.3 Remove all expired Shield Reinforcement.
      removeExpiredShieldReinforcement(store);
      resolve();
    }
  })
    .then(() => {
      if (!GameOver.isGameOver(store)) {
        // 2: 6.1 Spend Available Power: Spend AP, if able or use Battery if available.
        spendAP(store);
      }
    })
    .then(() => {
      if (!GameOver.isGameOver(store)) {
        // 3: 7.1 Moving: After spending AP, Move Ships if required or use Afterburner if available.
        moveShips(store);
      }
    })
    .then(() => {
      if (!GameOver.isGameOver(store)) {
        // 4: 8 Firing: After Moving, any/all ships May Fire, if able.
        fireWeapons(store);
      }
    })
    .then(() => {
      if (!GameOver.isGameOver(store)) {
        // 5: 8.7 Repair of Critical Damage: Attempt to Repair all Repairable Damage.
        repairCriticalDamage(store);
      }
    })
    .then(() => {
      if (!GameOver.isGameOver(store)) {
        // 6: 4.2 Check for initiative change.
        checkInitiativeChange(store);
      }
    });

const executePlayerTurns = (store) => {
  const playerIds = Selector.currentPlayerOrder(store.getState());

  const reduceFunction = (lastProm, playerId) =>
    lastProm.then(() => {
      store.dispatch(ActionCreator.setCurrentPlayer(playerId));

      return executePlayerTurn(store);
    });
  return playerIds.reduce(reduceFunction, Promise.resolve());
};

const executePowerPhase = (store) =>
  new Promise((resolve) => {
    const currentPlayer = Selector.currentPlayer(store.getState());
    console.log(`PhaseFunction.executePowerPhase() ${currentPlayer.name}`);
    if (!GameOver.isGameOver(store)) {
      resolve();
    }
  });

const executePowerPhases = (store) => {
  const playerIds = Selector.currentPlayerOrder(store.getState());

  const reduceFunction = (lastProm, playerId) =>
    lastProm.then(() => {
      store.dispatch(ActionCreator.setCurrentPlayer(playerId));

      return executePowerPhase(store);
    });
  return playerIds.reduce(reduceFunction, Promise.resolve());
};

PhaseFunction.impulseA = {
  execute: (store) =>
    new Promise((resolve) => {
      if (!GameOver.isGameOver(store)) {
        executePlayerTurns(store).then(resolve);
      }
    }),
};

PhaseFunction.impulseB = {
  execute: (store) =>
    new Promise((resolve) => {
      if (!GameOver.isGameOver(store)) {
        executePlayerTurns(store).then(resolve);
      }
    }),
};

PhaseFunction.impulseC = {
  execute: (store) =>
    new Promise((resolve) => {
      if (!GameOver.isGameOver(store)) {
        executePlayerTurns(store).then(resolve);
      }
    }),
};

PhaseFunction.impulseD = {
  execute: (store) =>
    new Promise((resolve) => {
      if (!GameOver.isGameOver(store)) {
        executePlayerTurns(store).then(resolve);
      }
    }),
};

PhaseFunction.impulseE = {
  execute: (store) =>
    new Promise((resolve) => {
      if (!GameOver.isGameOver(store)) {
        executePlayerTurns(store).then(resolve);
      }
    }),
};

PhaseFunction.impulseF = {
  execute: (store) =>
    new Promise((resolve) => {
      if (!GameOver.isGameOver(store)) {
        executePlayerTurns(store).then(resolve);
      }
    }),
};

PhaseFunction.powerPhase = {
  execute: (store) =>
    new Promise((resolve) => {
      if (!GameOver.isGameOver(store)) {
        executePowerPhases(store).then(resolve);
      }
    }),
};

PhaseFunction.reinforcementPhase = {
  execute: (/* store */) =>
    new Promise((resolve) => {
      resolve();
    }),
};

PhaseFunction.retreatPhase = {
  execute: (/* store */) =>
    new Promise((resolve) => {
      resolve();
    }),
};

Object.freeze(PhaseFunction);

export default PhaseFunction;
