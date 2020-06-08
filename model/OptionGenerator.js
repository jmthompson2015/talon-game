import Arc from "../artifact/Arc.js";
import Board from "../artifact/Board.js";
import Heading from "../artifact/Heading.js";
import MoveOption from "../artifact/MoveOption.js";
import PowerOption from "../artifact/PowerOption.js";
import Resolver from "../artifact/Resolver.js";
import Team from "../artifact/Team.js";
import Weapon from "../artifact/Weapon.js";

import MoveState from "../state/MoveState.js";
import PowerState from "../state/PowerState.js";
import Selector from "../state/Selector.js";
import WeaponState from "../state/WeaponState.js";

import MoveFunction from "./MoveFunction.js";
import PowerFunction from "./PowerFunction.js";
import WeaponFunction from "./WeaponFunction.js";

const OptionGenerator = {};

const concat = (array1, array2) => {
  if (array2.length === 0) {
    return array1;
  }

  if (array1.length === 0) {
    return array2;
  }

  return [...array1, ...array2];
};

const push = (array, element) => {
  if (element) {
    array.push(element);
  }

  return array;
};

const createPowerState = (powerKey, ship, state) => {
  const shipId = ship.id;
  const pp = PowerFunction[powerKey];
  let answer;

  if (pp.isLegal(shipId, state)) {
    answer = PowerState.create({ powerKey, shipId });
  }

  return answer;
};

const directionIndex = (headingKey) => Heading.keys().indexOf(headingKey);

const reduceIndexed = R.addIndex(R.reduce);

// /////////////////////////////////////////////////////////////////////////////
const generateShipMove = (ship, state) => {
  const moveKey = MoveOption.MOVE_STRAIGHT;
  const shipId = ship.id;
  const an1 = Selector.shipAN(shipId, state);
  const headingKey = Selector.shipHeading(shipId, state).key;
  const direction = directionIndex(headingKey);
  const an2 = Board.neighborInDirection(an1, direction);
  const mm = MoveFunction[moveKey];
  let answer;

  if (mm.isLegal(shipId, state)) {
    answer = MoveState.create({ moveKey, shipId, an1, an2 });
  }

  return answer;
};

const generateSideSlip = (moveKey, ship, state) => {
  const shipId = ship.id;
  const an1 = Selector.shipAN(shipId, state);
  const headingKey0 = Selector.shipHeading(shipId, state).key;
  const headingKey =
    moveKey === MoveOption.SIDE_SLIP_RIGHT
      ? Heading.right(headingKey0)
      : Heading.left(headingKey0);
  const direction = directionIndex(headingKey);
  const an2 = Board.neighborInDirection(an1, direction);
  const mm = MoveFunction[moveKey];
  let answer;

  if (mm.isLegal(shipId, state)) {
    answer = MoveState.create({ moveKey, shipId, an1, an2 });
  }

  return answer;
};

const generateTurnMove = (moveKey, ship, state) => {
  const shipId = ship.id;
  const an1 = Selector.shipAN(shipId, state);
  const headingKey0 = Selector.shipHeading(shipId, state).key;
  const headingKey =
    moveKey === MoveOption.TURN_RIGHT_AND_MOVE
      ? Heading.right(headingKey0)
      : Heading.left(headingKey0);
  const direction = directionIndex(headingKey);
  const an2 = Board.neighborInDirection(an1, direction);
  const mm = MoveFunction[moveKey];
  let answer;

  if (mm.isLegal(shipId, state)) {
    answer = MoveState.create({ moveKey, shipId, an1, an2, headingKey });
  }

  return answer;
};

OptionGenerator.generateShipMoveOptions = (ship, state) => {
  const moveKeys = MoveOption.keys();
  const reduceFunction = (accum, moveKey) => {
    switch (moveKey) {
      case MoveOption.MOVE_STRAIGHT:
        return push(accum, generateShipMove(ship, state));
      case MoveOption.SIDE_SLIP_LEFT:
      case MoveOption.SIDE_SLIP_RIGHT:
        return push(accum, generateSideSlip(moveKey, ship, state));
      case MoveOption.TURN_LEFT_AND_MOVE:
      case MoveOption.TURN_RIGHT_AND_MOVE:
        return push(accum, generateTurnMove(moveKey, ship, state));
      default:
      // Nothing to do.
    }

    return accum;
  };

  return R.reduce(reduceFunction, [], moveKeys);
};

OptionGenerator.generateMoveOptions = (player, state) => {
  const shipIds = Selector.shipsByPlayer(player.id, state);
  const reduceFunction = (accum, shipId) => {
    const ship = Selector.ship(shipId, state);

    return concat(OptionGenerator.generateShipMoveOptions(ship, state), accum);
  };

  return R.reduce(reduceFunction, [], shipIds);
};

// /////////////////////////////////////////////////////////////////////////////
OptionGenerator.generateArcReinforceShield = (ship, arc, impulse, state) => {
  const powerKey = PowerOption.REINFORCE_SHIELD;
  const shipId = ship.id;
  const arcKey = arc.key;
  const pp = PowerFunction[powerKey];
  let answer;

  if (pp.isLegal(shipId, arcKey, state)) {
    answer = PowerState.create({ powerKey, shipId, arcKey, impulse });
  }

  return answer;
};

OptionGenerator.generateWeaponChargeRed = (ship, weaponGroupIndex, state) => {
  const powerKey = PowerOption.CHARGE_RED;
  const shipId = ship.id;
  const pp = PowerFunction[powerKey];
  let answer;

  if (pp.isLegal(shipId, weaponGroupIndex, state)) {
    answer = PowerState.create({ powerKey, shipId, weaponGroupIndex });
  }

  return answer;
};

OptionGenerator.generateWeaponChargeYellow = (
  ship,
  weaponGroupIndex,
  state
) => {
  const powerKey = PowerOption.CHARGE_YELLOW;
  const shipId = ship.id;
  const pp = PowerFunction[powerKey];
  let answer;

  if (pp.isLegal(shipId, weaponGroupIndex, state)) {
    answer = PowerState.create({ powerKey, shipId, weaponGroupIndex });
  }

  return answer;
};

OptionGenerator.generateChargeReds = (ship, state) => {
  const reduceFunction = (accum, weaponGroup, i) => {
    return push(accum, OptionGenerator.generateWeaponChargeRed(ship, i, state));
  };
  const { weaponGroups } = Resolver.ship(ship.shipType.key);

  return reduceIndexed(reduceFunction, [], weaponGroups);
};

OptionGenerator.generateChargeYellows = (ship, state) => {
  const reduceFunction = (accum, weaponGroup, i) => {
    return push(
      accum,
      OptionGenerator.generateWeaponChargeYellow(ship, i, state)
    );
  };
  const { weaponGroups } = Resolver.ship(ship.shipType.key);

  return reduceIndexed(reduceFunction, [], weaponGroups);
};

OptionGenerator.generateReinforceShields = (ship, state) => {
  const impulse = Selector.currentImpulseLetter(state);
  const reduceFunction = (accum, arc) => {
    return push(
      accum,
      OptionGenerator.generateArcReinforceShield(ship, arc, impulse, state)
    );
  };

  return R.reduce(reduceFunction, [], Arc.values());
};

OptionGenerator.generateShipPowerOptions = (ship, state) => {
  const powerKeys = PowerOption.keys();
  const reduceFunction = (accum, powerKey) => {
    switch (powerKey) {
      case PowerOption.CHANGE_INITIATIVE:
      case PowerOption.CHARGE_BATTERY:
      case PowerOption.DEFEND_INITIATIVE:
      case PowerOption.ENABLE_SIDE_SLIP:
        return push(accum, createPowerState(powerKey, ship, state));
      case PowerOption.CHARGE_RED:
        return concat(accum, OptionGenerator.generateChargeReds(ship, state));
      case PowerOption.CHARGE_YELLOW:
        return concat(
          accum,
          OptionGenerator.generateChargeYellows(ship, state)
        );
      case PowerOption.REINFORCE_SHIELD:
        return concat(
          accum,
          OptionGenerator.generateReinforceShields(ship, state)
        );
      default:
      // Nothing to do.
    }

    return accum;
  };

  return R.reduce(reduceFunction, [], powerKeys);
};

OptionGenerator.generatePowerOptions = (player, state) => {
  const shipIds = Selector.shipsByPlayer(player.id, state);
  const reduceFunction = (accum, shipId) => {
    const ship = Selector.ship(shipId, state);

    return concat(OptionGenerator.generateShipPowerOptions(ship, state), accum);
  };

  return R.reduce(reduceFunction, [], shipIds);
};

// /////////////////////////////////////////////////////////////////////////////
const generateFireWeapon = (
  weaponKey,
  attacker,
  weaponGroup,
  weaponGroupIndex,
  state
) => {
  const attackerId = attacker.id;
  const attackPlayer = Selector.player(attacker.playerId, state);
  const otherTeamKey = Team.other(attackPlayer.teamKey);
  const defenderIds = Selector.shipsByTeam(otherTeamKey, state);

  const mm = WeaponFunction[weaponKey];
  const reduceFunction = (accum, defenderId) => {
    if (mm.isLegal(attackerId, weaponGroupIndex, defenderId, state)) {
      accum.push(
        WeaponState.create({
          weaponKey,
          attackerId,
          weaponGroupIndex,
          defenderIds: [defenderId],
        })
      );
    }
    return accum;
  };

  return R.reduce(reduceFunction, [], defenderIds);
};

OptionGenerator.generateShipWeaponOptions = (attacker, state) => {
  const { weaponGroups } = attacker.shipType;
  const reduceFunction = (accum, weaponGroup, weaponGroupIndex) => {
    switch (weaponGroup.weaponKey) {
      case Weapon.ANTI_MATTER_TORPEDO:
      case Weapon.DISRUPTOR:
      case Weapon.FUSION_CANNON:
      case Weapon.PHASER:
      case Weapon.WAVE_MOTION_GUN:
        return concat(
          accum,
          generateFireWeapon(
            weaponGroup.weaponKey,
            attacker,
            weaponGroup,
            weaponGroupIndex,
            state
          )
        );
      case Weapon.MISSILE:
        break;
      default:
      // Nothing to do.
    }

    return accum;
  };

  return reduceIndexed(reduceFunction, [], weaponGroups);
};

OptionGenerator.generateWeaponOptions = (player, state) => {
  const shipIds = Selector.shipsByPlayer(player.id, state);
  const reduceFunction = (accum, shipId) => {
    const ship = Selector.ship(shipId, state);

    return concat(
      OptionGenerator.generateShipWeaponOptions(ship, state),
      accum
    );
  };

  return R.reduce(reduceFunction, [], shipIds);
};

Object.freeze(OptionGenerator);

export default OptionGenerator;
