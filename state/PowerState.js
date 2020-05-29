import Resolver from "../artifact/Resolver.js";

const PowerState = {};

PowerState.create = ({ arcKey, powerKey, shipId, weaponIndex }) => ({
  // Required.
  powerKey,
  shipId,
  // Situational.
  arcKey,
  weaponIndex,
  // Managed.
  PowerType: Resolver.powerOption(powerKey),
});

Object.freeze(PowerState);

export default PowerState;
