import Heading from "../artifact/Heading.js";
import MoveOption from "../artifact/MoveOption.js";
import Ship from "../artifact/Ship.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

const moveShip = (shipId, an1, an2, store) => {
  store.dispatch(ActionCreator.clearShip(an1, shipId));
  store.dispatch(ActionCreator.setShip(an2, shipId));
};

const reduceShipTurnRadius = (shipId, store) => {
  const oldTurnRadius = Selector.shipCurrentTurnRadius(
    shipId,
    store.getState()
  );

  if (oldTurnRadius > 0) {
    const newTurnRadius = oldTurnRadius - 1;
    store.dispatch(
      ActionCreator.setShipCurrentTurnRadius(shipId, newTurnRadius)
    );
  }
};

const setReferenceTurnRadius = (shipId, store) => {
  const powerCurve = Selector.shipPowerCurve(shipId, store.getState());
  const newTurnRadius = powerCurve ? powerCurve.turnRadius : 0;
  store.dispatch(ActionCreator.setShipCurrentTurnRadius(shipId, newTurnRadius));
};

const shipName = (shipId, state) => {
  const ship = Selector.ship(shipId, state);

  return Ship.name(ship.shipType, ship.nameIndex);
};

const MoveFunction = {
  [MoveOption.MOVE_STRAIGHT]: {
    execute: (moveState, store) => {
      const { shipId, an1, an2 } = moveState;
      moveShip(shipId, an1, an2, store);
      reduceShipTurnRadius(shipId, store);
    },
    isLegal: (/* shipId, state */) => true,
    label: (moveState, state) =>
      `${shipName(moveState.shipId, state)} move straight`,
  },
  [MoveOption.SIDE_SLIP_RIGHT]: {
    execute: (moveState, store) => {
      const { shipId, an1, an2 } = moveState;
      moveShip(shipId, an1, an2, store);
    },
    isLegal: (shipId, state) => Selector.isShipSideSlipped(shipId, state),
    label: (moveState, state) =>
      `${shipName(moveState.shipId, state)} side slip right`,
  },
  [MoveOption.SIDE_SLIP_LEFT]: {
    execute: (moveState, store) => {
      const { shipId, an1, an2 } = moveState;
      moveShip(shipId, an1, an2, store);
    },
    isLegal: (shipId, state) => Selector.isShipSideSlipped(shipId, state),
    label: (moveState, state) =>
      `${shipName(moveState.shipId, state)} side slip left`,
  },
  [MoveOption.TURN_RIGHT_AND_MOVE]: {
    execute: (moveState, store) => {
      const { shipId, an1, an2 } = moveState;
      const heading1Key = Selector.shipHeading(shipId, store.getState()).key;
      const heading2Key = Heading.right(heading1Key);
      store.dispatch(ActionCreator.setShipHeading(shipId, heading2Key));
      moveShip(shipId, an1, an2, store);
      setReferenceTurnRadius(shipId, store);
    },
    isLegal: (shipId, state) =>
      Selector.shipCurrentTurnRadius(shipId, state) === 0,
    label: (moveState, state) =>
      `${shipName(moveState.shipId, state)} turn right and move`,
  },
  [MoveOption.TURN_LEFT_AND_MOVE]: {
    execute: (moveState, store) => {
      const { shipId, an1, an2 } = moveState;
      const heading1Key = Selector.shipHeading(shipId, store.getState()).key;
      const heading2Key = Heading.left(heading1Key);
      store.dispatch(ActionCreator.setShipHeading(shipId, heading2Key));
      moveShip(shipId, an1, an2, store);
      setReferenceTurnRadius(shipId, store);
    },
    isLegal: (shipId, state) =>
      Selector.shipCurrentTurnRadius(shipId, state) === 0,
    label: (moveState, state) =>
      `${shipName(moveState.shipId, state)} turn left and move`,
  },
};

Object.freeze(MoveFunction);

export default MoveFunction;
