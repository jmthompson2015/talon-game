const MoveOption = {
  MOVE_STRAIGHT: "moveStraight",
  SIDE_SLIP_RIGHT: "sideSlipRight",
  SIDE_SLIP_LEFT: "sideSlipLeft",
  TURN_RIGHT_AND_MOVE: "turnRightAndMove",
  TURN_LEFT_AND_MOVE: "turnLeftAndMove",

  properties: {
    moveStraight: {
      name: "Move Straight",
      key: "moveStraight",
    },
    sideSlipRight: {
      name: "Side Slip Right",
      key: "sideSlipRight",
    },
    sideSlipLeft: {
      name: "Side Slip Left",
      key: "sideSlipLeft",
    },
    turnRightAndMove: {
      name: "Turn Right and Move",
      key: "turnRightAndMove",
    },
    turnLeftAndMove: {
      name: "Turn Left and Move",
      key: "turnLeftAndMove",
    },
  },
};

MoveOption.keys = () => Object.keys(MoveOption.properties);

MoveOption.values = () => Object.values(MoveOption.properties);

Object.freeze(MoveOption);

export default MoveOption;
