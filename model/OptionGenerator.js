import Arc from "../artifact/Arc.js";
import Board from "../artifact/Board.js";
import Heading from "../artifact/Heading.js";
import MoveOption from "../artifact/MoveOption.js";
import PowerOption from "../artifact/PowerOption.js";
import Resolver from "../artifact/Resolver.js";

import MoveState from "../state/MoveState.js";
import PowerState from "../state/PowerState.js";
import Selector from "../state/Selector.js";

import MoveFunction from "./MoveFunction.js";
import PowerFunction from "./PowerFunction.js";

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
  // const powerKey = PowerOption.CHANGE_INITIATIVE;
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
  const headingKey = Selector.shipHeading(shipId, state);
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
  const headingKey0 = Selector.shipHeading(shipId, state);
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
  const headingKey0 = Selector.shipHeading(shipId, state);
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

OptionGenerator.generateWeaponChargeRed = (ship, weaponIndex, state) => {
  const powerKey = PowerOption.CHARGE_RED;
  const shipId = ship.id;
  const pp = PowerFunction[powerKey];
  let answer;

  if (pp.isLegal(shipId, weaponIndex, state)) {
    answer = PowerState.create({ powerKey, shipId, weaponIndex });
  }

  return answer;
};

OptionGenerator.generateWeaponChargeYellow = (ship, weaponIndex, state) => {
  const powerKey = PowerOption.CHARGE_YELLOW;
  const shipId = ship.id;
  const pp = PowerFunction[powerKey];
  let answer;

  if (pp.isLegal(shipId, weaponIndex, state)) {
    answer = PowerState.create({ powerKey, shipId, weaponIndex });
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

Object.freeze(OptionGenerator);

export default OptionGenerator;
