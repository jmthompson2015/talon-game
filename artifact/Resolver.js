import Arc from "./Arc.js";
import Hull from "./Hull.js";
import Phase from "./Phase.js";
import Ship from "./Ship.js";
import Team from "./Team.js";
import Weapon from "./Weapon.js";

const Resolver = {};

Resolver.arc = (arcKey) => Arc.properties[arcKey];

Resolver.hull = (hullKey) => Hull.properties[hullKey];

Resolver.phase = (phaseKey) => Phase.properties[phaseKey];

Resolver.ship = (shipKey) => Ship.properties[shipKey];

Resolver.team = (teamKey) => Team.properties[teamKey];

Resolver.weapon = (weaponKey) => Weapon.properties[weaponKey];

Object.freeze(Resolver);

export default Resolver;
