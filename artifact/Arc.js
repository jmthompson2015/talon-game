const Arc = {
  FORWARD: "forward",
  RIGHT: "right",
  REAR: "rear",
  LEFT: "left",

  properties: {
    forward: {
      name: "Forward",
      key: "forward",
    },
    right: {
      name: "Right",
      key: "right",
    },
    rear: {
      name: "Rear",
      key: "rear",
    },
    left: {
      name: "Left",
      key: "left",
    },
  },
};

Arc.keys = () => Object.keys(Arc.properties);

Arc.values = () => Object.values(Arc.properties);

Object.freeze(Arc);

export default Arc;
