import Resolver from "../artifact/Resolver.js";

const PowerState = {};

PowerState.create = ({ arcKey, impulse, powerKey, shipId, weaponIndex }) =>
  Immutable({
    // Required.
    powerKey,
    shipId,
    // Situational.
    arcKey,
    impulse,
    weaponIndex,
    // Managed.
    powerOptionType: Resolver.powerOption(powerKey),
  });

Object.freeze(PowerState);

export default PowerState;
