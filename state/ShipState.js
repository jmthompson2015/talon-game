import Resolver from "../artifact/Resolver.js";

import ActionCreator from "./ActionCreator.js";
import Selector from "./Selector.js";

const ShipState = {};

ShipState.create = ({ id, shipKey, nameIndex, store }) => {
  const myId =
    R.isNil(id) && store ? Selector.nextShipId(store.getState()) : id;

  const ship = Immutable({
    // Required.
    id: myId,
    shipKey,
    nameIndex,
    // Managed.
    shipType: Resolver.ship(shipKey),
  });

  if (store) {
    store.dispatch(ActionCreator.addShip(ship));
  }

  return ship;
};

ShipState.toString = (shipState) =>
  JSON.stringify(R.pick(["id", "shipKey", "nameIndex"], shipState));

Object.freeze(ShipState);

export default ShipState;
