import Resolver from "../artifact/Resolver.js";

const PowerState = {};

PowerState.create = ({ arcKey, impulse, powerKey, shipId, weaponIndex }) => ({
  // Required.
  powerKey,
  shipId,
  // Situational.
  arcKey,
  impulse,
  weaponIndex,
  // Managed.
  PowerType: Resolver.powerOption(powerKey),
});

Object.freeze(PowerState);

export default PowerState;
