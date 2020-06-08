const StateUtilities = {};

StateUtilities.shipArcKey = (shipId, arcKey) => `${shipId}${arcKey}`;

StateUtilities.shipWeaponGroupKey = (shipId, weaponGroupIndex) =>
  `${shipId}${weaponGroupIndex}`;

Object.freeze(StateUtilities);

export default StateUtilities;
