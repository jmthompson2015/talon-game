import Phase from "../artifact/Phase.js";
import PowerOption from "../artifact/PowerOption.js";
import Resolver from "../artifact/Resolver.js";
import Ship from "../artifact/Ship.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

const shipName = (shipId, state) => {
  const ship = Selector.ship(shipId, state);

  return Ship.name(ship.shipType, ship.nameIndex);
};

const PowerFunction = {
  [PowerOption.CHANGE_INITIATIVE]: {
    execute: (powerState, store) => {
      const oldCount = Selector.shipChangeInitiativeCount(
        powerState.shipId,
        store.getState()
      );
      store.dispatch(
        ActionCreator.setShipChangeInitiativeCount(
          powerState.shipId,
          oldCount + 1
        )
      );
    },
    isLegal: (shipId, state) =>
      Selector.shipChangeInitiativeCount(shipId, state) === 0,
    label: (powerState, state) =>
      `${shipName(powerState.shipId, state)} change initiative`,
  },
  [PowerOption.CHARGE_BATTERY]: {
    execute: (powerState, store) => {
      const oldCount = Selector.shipBatteryCount(
        powerState.shipId,
        store.getState()
      );
      store.dispatch(
        ActionCreator.setShipBatteryCount(powerState.shipId, oldCount + 1)
      );
    },
    isLegal: (shipId, state) =>
      Selector.ship(shipId, state).shipType.batteries > 0 &&
      Selector.shipBatteryCount(shipId, state) === 0,
    label: (powerState, state) =>
      `${shipName(powerState.shipId, state)} charge battery`,
  },
  [PowerOption.CHARGE_RED]: {
    execute: (powerState, store) => {
      const oldCount = Selector.shipWeaponIndexRed(
        powerState.shipId,
        powerState.weaponIndex,
        store.getState()
      );
      store.dispatch(ActionCreator.setShipWeaponIndexRed(oldCount + 1));
    },
    isLegal: (shipId, weaponIndex, state) => {
      const currentRed = Selector.shipWeaponIndexRed(
        shipId,
        weaponIndex,
        state
      );
      const ship = Selector.ship(shipId, state);
      const weaponGroup = Resolver.shipWeaponGroup(ship.shipKey, weaponIndex);
      const maxRed = weaponGroup.red;

      return state.currentPhaseKey === Phase.POWER_PHASE && currentRed < maxRed;
    },
    label: (powerState, state) =>
      `${shipName(powerState.shipId, state)} charge red`,
  },
  [PowerOption.CHARGE_YELLOW]: {
    execute: (powerState, store) => {
      const oldCount = Selector.shipWeaponIndexRed(
        powerState.shipId,
        powerState.weaponIndex,
        store.getState()
      );
      store.dispatch(ActionCreator.setShipWeaponIndexRed(oldCount + 1));
    },
    isLegal: (shipId, weaponIndex, state) => {
      const currentYellow = Selector.shipWeaponIndexYellow(
        shipId,
        weaponIndex,
        state
      );
      const ship = Selector.ship(shipId, state);
      const weaponGroup = Resolver.shipWeaponGroup(ship.shipKey, weaponIndex);
      const maxYellow = weaponGroup.yellow;

      return currentYellow < maxYellow;
    },
    label: (powerState, state) =>
      `${shipName(powerState.shipId, state)} charge yellow`,
  },
  [PowerOption.DEFEND_INITIATIVE]: {
    execute: (powerState, store) => {
      const oldCount = Selector.shipDefendInitiativeCount(
        powerState.shipId,
        store.getState()
      );
      store.dispatch(
        ActionCreator.setShipDefendInitiativeCount(
          powerState.shipId,
          oldCount + 1
        )
      );
    },
    isLegal: (shipId, state) =>
      Selector.shipDefendInitiativeCount(shipId, state) === 0,
    label: (powerState, state) =>
      `${shipName(powerState.shipId, state)} defend initiative`,
  },
  [PowerOption.ENABLE_SIDE_SLIP]: {
    execute: (powerState, store) => {
      store.dispatch(ActionCreator.setShipSideSlipped(powerState.shipId, true));
    },
    isLegal: (shipId, state) => !Selector.isShipSideSlipped(shipId, state),
    label: (powerState, state) =>
      `${shipName(powerState.shipId, state)} enable side slip`,
  },
  [PowerOption.POWER_THROUGH_TURN]: {
    execute: (powerState, store) => {
      const oldCount = Selector.shipTurnRadius(
        powerState.shipId,
        store.getState()
      );
      store.dispatch(
        ActionCreator.setShipCurrentTurnRadius(powerState.shipId, oldCount - 1)
      );
    },
    isLegal: (shipId, state) =>
      Selector.shipCurrentTurnRadius(shipId, state) > 0,
    label: (powerState, state) =>
      `${shipName(powerState.shipId, state)} power through turn`,
  },
  // [PowerOption.REDIRECT_MISSILE]: {
  //   execute: (powerState, store) => {},
  //   isLegal: (shipId, missileId, state) => false,
  //   label: (powerState, state) => `missing label`,
  // },
  [PowerOption.REINFORCE_SHIELD]: {
    execute: (powerState, store) => {
      store.dispatch(
        ActionCreator.setShipArcReinforceImpulse(
          powerState.shipId,
          powerState.arcKey,
          powerState.impulse
        )
      );
    },
    isLegal: (shipId, arcKey, state) =>
      Selector.shipArcReinforceImpulse(shipId, arcKey, state) === undefined,
    label: (powerState, state) =>
      `${shipName(powerState.shipId, state)} reinforce ${
        powerState.arcKey
      } shield`,
  },
  // [PowerOption.TRANSMIT_POWER]: {
  //   execute: (powerState, store) => {},
  //   isLegal: (shipId, fighterId, state) => false,
  //   label: (powerState, state) => `missing label`,
  // },
};

Object.freeze(PowerFunction);

export default PowerFunction;
