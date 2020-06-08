import Resolver from "../artifact/Resolver.js";

const PowerState = {};

PowerState.create = ({ arcKey, impulse, powerKey, shipId, weaponGroupIndex }) =>
  Immutable({
    // Required.
    powerKey,
    shipId,
    // Situational.
    arcKey,
    impulse,
    weaponGroupIndex,
    // Managed.
    powerOptionType: Resolver.powerOption(powerKey),
  });

Object.freeze(PowerState);

export default PowerState;
