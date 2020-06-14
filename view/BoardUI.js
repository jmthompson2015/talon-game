import Board from "../artifact/Board.js";
import Resolver from "../artifact/Resolver.js";

import ShipUI from "./ShipUI.js";

const createWeaponGroupToRed = (ship) => {
  const { weaponGroups } = ship.shipType;
  const reduceFunction = (accum, entry) =>
    R.assoc(entry[0], entry[1].red, accum);

  return R.reduce(reduceFunction, {}, weaponGroups.entries());
};

const createWeaponGroupToYellow = (ship) => {
  const { weaponGroups } = ship.shipType;
  const reduceFunction = (accum, entry) =>
    R.assoc(entry[0], entry[1].yellow, accum);

  return R.reduce(reduceFunction, {}, weaponGroups.entries());
};

const drawTokenFunction = (
  shipArcToShieldCount,
  shipToHeading,
  shipToHullIndex,
  shipToPowerCurveIndex,
  shipWeaponGroupToRed,
  shipWeaponGroupToYellow,
  resourceBase
) => (context0, center, size, an, ship) => {
  const context = context0;

  if (ship) {
    const shipInstance = ship;
    const shipId = shipInstance.id;
    const corners = Board.boardCalculator.computeCorners(center, size);
    ShipUI.render(
      context,
      { center, corners, size },
      {
        shipInstance,
        heading: Resolver.heading(shipToHeading[shipId]),
        powerCurve: Resolver.shipPowerCurve(
          ship.shipType.key,
          shipToPowerCurveIndex[shipId]
        ),
        arcToShield: ship.shipType.shields,
        hullIndex: shipToHullIndex[shipId] || 0,
        weaponGroupToRed: createWeaponGroupToRed(ship),
        weaponGroupToYellow: createWeaponGroupToYellow(ship),
      },
      resourceBase
    );
  } else {
    context.save();
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "Green";
    context.font = "12px serif";
    context.fillText(an, center.x, center.y);
    context.restore();
  }
};

const isCellUsedFunction = (an) => !Board.UNUSED.includes(an);

// /////////////////////////////////////////////////////////////////////////////////////////////////
class BoardUI extends React.PureComponent {
  render() {
    const {
      anToShip,
      customKey,
      resourceBase,
      shipArcToShieldCount,
      shipToHeading,
      shipToHullIndex,
      shipToPowerCurveIndex,
      shipWeaponGroupToRed,
      shipWeaponGroupToYellow,
    } = this.props;

    const gridColor = "rgb(64,64,64)";

    return React.createElement(ReactGameBoard, {
      anToTokens: anToShip,
      boardCalculator: Board.boardCalculator,
      coordinateCalculator: Board.coordinateCalculator,
      drawTokenFunction: drawTokenFunction(
        shipArcToShieldCount,
        shipToHeading,
        shipToHullIndex,
        shipToPowerCurveIndex,
        shipWeaponGroupToRed,
        shipWeaponGroupToYellow,
        resourceBase
      ),

      backgroundColor: "black",
      customKey,
      gridColor,
      isCellUsedFunction,
      width: 1024,
      height: 768,
    });
  }
}

BoardUI.propTypes = {
  anToShip: PropTypes.shape().isRequired,
  shipArcToShieldCount: PropTypes.shape().isRequired,
  shipToHeading: PropTypes.shape().isRequired,
  shipToHullIndex: PropTypes.shape().isRequired,
  shipToPowerCurveIndex: PropTypes.shape().isRequired,
  shipWeaponGroupToRed: PropTypes.shape().isRequired,
  shipWeaponGroupToYellow: PropTypes.shape().isRequired,

  customKey: PropTypes.string,
  resourceBase: PropTypes.string,
};

BoardUI.defaultProps = {
  customKey: "hexBoardCanvas",
  resourceBase: "../resource",
};

export default BoardUI;
