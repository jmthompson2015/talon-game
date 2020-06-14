import Selector from "../state/Selector.js";

import TestData from "../model/TestData.js";

import BoardUI from "./BoardUI.js";

const store = TestData.createStore();
const state = store.getState();

const reduceFunction = (accum, entry) => {
  const ship = Selector.ship(entry[1], state);

  return R.assoc(entry[0], ship, accum);
};
const anToShip = R.reduce(reduceFunction, {}, Object.entries(state.anToTokens));

const element = React.createElement(BoardUI, {
  anToShip,
  shipArcToShieldCount: state.shipArcToShieldCount,
  shipToHeading: state.shipToHeading,
  shipToHullIndex: state.shipToHullIndex,
  shipToPowerCurveIndex: state.shipToPowerCurveIndex,
  shipWeaponGroupToRed: state.shipWeaponGroupToRed,
  shipWeaponGroupToYellow: state.shipWeaponGroupToYellow,

  customKey: "hexBoardCanvas",
  // resourceBase: Endpoint.LOCAL_RESOURCE
});

ReactDOM.render(element, document.getElementById("panel"));
