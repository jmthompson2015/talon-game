const StateUtilities = {};

StateUtilities.shipArcKey = (shipId, arcKey) => `${shipId}${arcKey}`;

StateUtilities.shipWeaponIndexKey = (shipId, weaponIndex) =>
  `${shipId}${weaponIndex}`;

Object.freeze(StateUtilities);

export default StateUtilities;
