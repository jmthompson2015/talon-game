import Heading from "../artifact/Heading.js";
import MoveOption from "../artifact/MoveOption.js";
import Ship from "../artifact/Ship.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

const shipName = (shipId, state) => {
  const ship = Selector.ship(shipId, state);

  return Ship.name(ship.shipType, ship.nameIndex);
};

const MoveFunction = {
  [MoveOption.MOVE_STRAIGHT]: {
    execute: (moveState, store) => {
      const { shipId, an1, an2 } = moveState;
      store.dispatch(ActionCreator.clearShip(an1, shipId));
      store.dispatch(ActionCreator.setShip(an2, shipId));
    },
    isLegal: (/* shipId, state */) => true,
    label: (moveState, state) =>
      `${shipName(moveState.shipId, state)} move straight`,
  },
  [MoveOption.SIDE_SLIP_RIGHT]: {
    execute: (moveState, store) => {
      const { shipId, an1, an2 } = moveState;
      store.dispatch(ActionCreator.clearShip(an1, shipId));
      store.dispatch(ActionCreator.setShip(an2, shipId));
    },
    isLegal: (shipId, state) => Selector.isShipSideSlipped(shipId, state),
    label: (moveState, state) =>
      `${shipName(moveState.shipId, state)} side slip right`,
  },
  [MoveOption.SIDE_SLIP_LEFT]: {
    execute: (moveState, store) => {
      const { shipId, an1, an2 } = moveState;
      store.dispatch(ActionCreator.clearShip(an1, shipId));
      store.dispatch(ActionCreator.setShip(an2, shipId));
    },
    isLegal: (shipId, state) => Selector.isShipSideSlipped(shipId, state),
    label: (moveState, state) =>
      `${shipName(moveState.shipId, state)} side slip left`,
  },
  [MoveOption.TURN_RIGHT_AND_MOVE]: {
    execute: (moveState, store) => {
      const { shipId, an1, an2 } = moveState;
      const heading1Key = Selector.shipHeading(shipId, store.getState());
      const heading2Key = Heading.right(heading1Key);
      store.dispatch(ActionCreator.setShipHeading(shipId, heading2Key));
      store.dispatch(ActionCreator.clearShip(an1, shipId));
      store.dispatch(ActionCreator.setShip(an2, shipId));
    },
    isLegal: (shipId, state) =>
      Selector.shipCurrentTurnRadius(shipId, state) === 0,
    label: (moveState, state) =>
      `${shipName(moveState.shipId, state)} turn right and move`,
  },
  [MoveOption.TURN_LEFT_AND_MOVE]: {
    execute: (moveState, store) => {
      const { shipId, an1, an2 } = moveState;
      const heading1Key = Selector.shipHeading(shipId, store.getState());
      const heading2Key = Heading.left(heading1Key);
      store.dispatch(ActionCreator.setShipHeading(shipId, heading2Key));
      store.dispatch(ActionCreator.clearShip(an1, shipId));
      store.dispatch(ActionCreator.setShip(an2, shipId));
    },
    isLegal: (shipId, state) =>
      Selector.shipCurrentTurnRadius(shipId, state) === 0,
    label: (moveState, state) =>
      `${shipName(moveState.shipId, state)} turn left and move`,
  },
};

Object.freeze(MoveFunction);

export default MoveFunction;
