const StateUtilities = {};

StateUtilities.shipArcKey = (shipId, arcKey) => `${shipId}${arcKey}`;

Object.freeze(StateUtilities);

export default StateUtilities;
