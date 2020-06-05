import Resolver from "../artifact/Resolver.js";

const MoveState = {};

MoveState.create = ({ moveKey, shipId, an1, an2, headingKey }) =>
  Immutable({
    // Required.
    moveKey,
    shipId,
    // Situational.
    an1,
    an2,
    headingKey,
    // Managed.
    moveOptionType: Resolver.moveOption(moveKey),
  });

Object.freeze(MoveState);

export default MoveState;
