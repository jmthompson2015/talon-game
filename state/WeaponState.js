const WeaponState = {};

WeaponState.create = ({
  attackerId,
  defenderIds,
  weaponGroupIndex,
  weaponKey,
}) =>
  Immutable({
    // Required.
    weaponKey,
    attackerId,
    weaponGroupIndex,
    defenderIds,
  });

Object.freeze(WeaponState);

export default WeaponState;
