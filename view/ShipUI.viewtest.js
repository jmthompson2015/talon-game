import Arc from "../artifact/Arc.js";
import Board from "../artifact/Board.js";

import Selector from "../state/Selector.js";

import TestData from "../model/TestData.js";

import ShipUI from "./ShipUI.js";

const createArcToShield = (shipId, state) => {
  const reduceFunction = (accum, arcKey) => {
    const shieldCount = Selector.shipArcShieldCount(shipId, arcKey, state);

    return R.assoc(arcKey, shieldCount, accum);
  };

  return R.reduce(reduceFunction, {}, Arc.keys());
};

const store = TestData.createStore();
const state = store.getState();

const createShipUI = (shipId, size) => {
  const ship = Selector.ship(shipId, state);
  const canvas = document.getElementById(`canvas${shipId}`);
  const context = canvas.getContext("2d");
  const center = { x: size, y: size };
  const corners = Board.boardCalculator.computeCorners(center, size);
  const { weaponGroups } = ship.shipType;
  const weaponGroupToRed = {};
  const weaponGroupToYellow = {};
  const forEachFunction = (weaponGroup, i) => {
    weaponGroupToRed[i] = Selector.shipWeaponGroupRed(shipId, i, state);
    weaponGroupToYellow[i] = Selector.shipWeaponGroupYellow(shipId, i, state);
  };
  const forEachIndexed = R.addIndex(R.forEach);
  forEachIndexed(forEachFunction, weaponGroups);

  ShipUI.render(
    context,
    { center, corners, size },
    {
      shipInstance: Selector.ship(shipId, state),
      heading: Selector.shipHeading(shipId, state),
      powerCurve: Selector.shipPowerCurve(shipId, state),
      arcToShield: createArcToShield(shipId, state),
      hullIndex: Selector.shipHullIndex(shipId, state),
      weaponGroupToRed,
      weaponGroupToYellow,
    }
  );
};

createShipUI(1, 75);
createShipUI(2, 40);
createShipUI(3, 75);
createShipUI(4, 40);
