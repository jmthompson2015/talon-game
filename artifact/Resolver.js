import Arc from "./Arc.js";
import Heading from "./Heading.js";
import Hull from "./Hull.js";
import MoveOption from "./MoveOption.js";
import Phase from "./Phase.js";
import PowerOption from "./PowerOption.js";
import Ship from "./Ship.js";
import Step from "./Step.js";
import Team from "./Team.js";

const Resolver = {};

Resolver.arc = (arcKey) => Arc.properties[arcKey];

Resolver.heading = (headingKey) => Heading.properties[headingKey];

Resolver.hull = (hullKey) => Hull.properties[hullKey];

Resolver.moveOption = (moveKey) => MoveOption.properties[moveKey];

Resolver.phase = (phaseKey) => Phase.properties[phaseKey];

Resolver.powerOption = (powerKey) => PowerOption.properties[powerKey];

Resolver.ship = (shipKey) => Ship.properties[shipKey];

Resolver.shipHullBox = (shipKey, hullIndex) => {
  const ship = Resolver.ship(shipKey);

  return ship ? ship.hullBoxes[hullIndex] : null;
};

Resolver.shipName = (shipKey, nameIndex) => {
  const ship = Resolver.ship(shipKey);

  return ship ? ship.names[nameIndex] : null;
};

Resolver.shipPowerCurve = (shipKey, powerCurveIndex) => {
  const ship = Resolver.ship(shipKey);

  return ship ? ship.powerCurves[powerCurveIndex] : null;
};

Resolver.shipShield = (shipKey, arcKey) => {
  const ship = Resolver.ship(shipKey);

  return ship ? ship.shields[arcKey] : null;
};

Resolver.shipWeaponGroup = (shipKey, weaponGroupIndex) => {
  const ship = Resolver.ship(shipKey);

  return ship ? ship.weaponGroups[weaponGroupIndex] : null;
};

Resolver.step = (stepKey) => Step.properties[stepKey];

Resolver.team = (teamKey) => Team.properties[teamKey];

Object.freeze(Resolver);

export default Resolver;
