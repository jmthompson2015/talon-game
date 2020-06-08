/* eslint no-console: ["error", { allow: ["log"] }] */

import Board from "../artifact/Board.js";
import Die from "../artifact/Die.js";
import Resolver from "../artifact/Resolver.js";
import Ship from "../artifact/Ship.js";
import Weapon from "../artifact/Weapon.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

const isInFiringArc = (attackerId, weaponGroupIndex, defenderId, state) => {
  const attackerKey = Selector.shipKey(attackerId, state);
  const an1 = Selector.shipAN(attackerId, state);
  const heading = Selector.shipHeading(attackerId, state);

  const weaponGroup = Resolver.shipWeaponGroup(attackerKey, weaponGroupIndex);
  const arcKeys = weaponGroup ? weaponGroup.arcKeys : undefined;

  const an2 = Selector.shipAN(defenderId, state);
  const relativeArc = Board.relativeArc(an1, heading, an2);

  return arcKeys ? arcKeys.includes(relativeArc) : false;
};

const isInRange = (attackerId, weaponGroupIndex, defenderId, state) => {
  const attackerKey = Selector.shipKey(attackerId, state);
  const an1 = Selector.shipAN(attackerId, state);

  const weaponGroup = Resolver.shipWeaponGroup(attackerKey, weaponGroupIndex);
  const weaponKey = weaponGroup ? weaponGroup.weaponKey : undefined;

  const an2 = Selector.shipAN(defenderId, state);
  const distance = Board.distance(an1, an2);

  return weaponKey ? Weapon.isInRange(weaponKey, distance) : false;
};

const isLegal = (attackerId, weaponGroupIndex, defenderId, state) =>
  Selector.isShipWeaponGroupCharged(attackerId, weaponGroupIndex, state) &&
  isInRange(attackerId, weaponGroupIndex, defenderId, state) &&
  isInFiringArc(attackerId, weaponGroupIndex, defenderId, state);

const shipName = (shipId, state) => {
  const ship = Selector.ship(shipId, state);

  return Ship.name(ship.shipType, ship.nameIndex);
};

const WeaponFunction = {
  [Weapon.ANTI_MATTER_TORPEDO]: {
    execute: (weaponState, store) => {
      WeaponFunction.fireWeapon(weaponState, store);
    },
    isLegal,
    label: (weaponState, state) =>
      `${shipName(
        weaponState.attackerId,
        state
      )} fires anti-matter torpedo at ${shipName(
        weaponState.defenderIds[0],
        state
      )}`,
  },
  [Weapon.DISRUPTOR]: {
    execute: (weaponState, store) => {
      WeaponFunction.fireWeapon(weaponState, store);
    },
    isLegal,
    label: (weaponState, state) =>
      `${shipName(weaponState.attackerId, state)} fires disruptor at ${shipName(
        weaponState.defenderIds[0],
        state
      )}`,
  },
  [Weapon.FUSION_CANNON]: {
    execute: (weaponState, store) => {
      WeaponFunction.fireWeapon(weaponState, store);
    },
    isLegal,
    label: (weaponState, state) =>
      `${shipName(
        weaponState.attackerId,
        state
      )} fires fusion cannon at ${shipName(weaponState.defenderIds[0], state)}`,
  },
  [Weapon.MISSILE]: {
    execute: (/* weaponState, store */) => {},
    isLegal,
    label: (weaponState, state) =>
      `${shipName(weaponState.attackerId, state)} fires missile at ${shipName(
        weaponState.defenderIds[0],
        state
      )}`,
  },
  [Weapon.PHASER]: {
    execute: (weaponState, store) => {
      WeaponFunction.fireWeapon(weaponState, store);
    },
    isLegal,
    label: (weaponState, state) =>
      `${shipName(weaponState.attackerId, state)} fires phaser at ${shipName(
        weaponState.defenderIds[0],
        state
      )}`,
  },
  [Weapon.WAVE_MOTION_GUN]: {
    execute: (weaponState, store) => {
      WeaponFunction.fireWeapon(weaponState, store);
    },
    isLegal,
    label: (weaponState, state) =>
      `${shipName(
        weaponState.attackerId,
        state
      )} fires wave motion gun at ${shipName(
        weaponState.defenderIds[0],
        state
      )}`,
  },
};

WeaponFunction.applyDamage = (defender, shieldArc, damage, store) => {
  if (damage > 0) {
    const defenderId = defender.id;
    const shield = Selector.shipArcShieldCount(
      defenderId,
      shieldArc,
      store.getState()
    );

    if (damage <= shield) {
      store.dispatch(
        ActionCreator.setShipArcShieldCount(
          defenderId,
          shieldArc,
          shield - damage
        )
      );
    } else {
      store.dispatch(
        ActionCreator.setShipArcShieldCount(defenderId, shieldArc, 0)
      );
      const damage1 = damage - shield;

      if (damage1 > 0) {
        const hullIndex1 = Selector.shipHullIndex(defenderId, store.getState());
        store.dispatch(
          ActionCreator.setShipHullIndex(defenderId, hullIndex1 + damage1)
        );
        const hullIndex2 = Selector.shipHullIndex(defenderId, store.getState());

        if (hullIndex2 > defender.shipType.hullBoxes.length) {
          console.log(`${shipName(defenderId, store.getState())} destroyed`);
        }
      }
    }
  }
};

WeaponFunction.fireWeapon = (weaponState, store) => {
  const { attackerId, defenderIds, weaponGroupIndex } = weaponState;
  const an1 = Selector.shipAN(attackerId, store.getState());
  const attackerKey = Selector.shipKey(attackerId, store.getState());
  const weaponGroup = Resolver.shipWeaponGroup(attackerKey, weaponGroupIndex);

  const forEachFunction = (defenderId) => {
    const defender = Selector.ship(defenderId, store.getState());

    const heading2 = Selector.shipHeading(defenderId, store.getState());
    const an2 = Selector.shipAN(defenderId, store.getState());
    const shieldArc = Board.relativeArc(an2, heading2, an1);

    const range = Board.distance(an1, an2);
    const roll = Die.roll();
    const damage = Weapon.damage(weaponGroup.weaponKey, range, roll);

    WeaponFunction.applyDamage(defender, shieldArc, damage, store);
  };

  R.forEach(forEachFunction, defenderIds);

  store.dispatch(
    ActionCreator.setShipWeaponGroupRed(attackerId, weaponGroupIndex, 0)
  );
  store.dispatch(
    ActionCreator.setShipWeaponGroupYellow(attackerId, weaponGroupIndex, 0)
  );
};

Object.freeze(WeaponFunction);

export default WeaponFunction;
