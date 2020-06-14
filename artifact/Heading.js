const DEGREE_SIGN = "\u00B0";

const Heading = {
  EAST: "east", // 90 degrees
  THIRTY_DEGREES: "thirtyDegrees",
  THREE_THIRTY_DEGREES: "threeThirtyDegrees",
  WEST: "west", // 270 degrees
  TWO_TEN_DEGREES: "twoTenDegrees",
  ONE_FIFTY_DEGREES: "oneFiftyDegrees",

  properties: {
    east: {
      name: `90${DEGREE_SIGN}`,
      angle: 90,
      key: "east",
    },
    thirtyDegrees: {
      name: `30${DEGREE_SIGN}`,
      angle: 30,
      key: "thirtyDegrees",
    },
    threeThirtyDegrees: {
      name: `330${DEGREE_SIGN}`,
      angle: 330,
      key: "threeThirtyDegrees",
    },
    west: {
      name: `270${DEGREE_SIGN}`,
      angle: 270,
      key: "west",
    },
    twoTenDegrees: {
      name: `210${DEGREE_SIGN}`,
      angle: 210,
      key: "twoTenDegrees",
    },
    oneFiftyDegrees: {
      name: `150${DEGREE_SIGN}`,
      angle: 150,
      key: "oneFiftyDegrees",
    },
  },
};

Heading.keys = () => Object.keys(Heading.properties);

Heading.values = () => Object.values(Heading.properties);

Heading.left = (headingKey) => {
  const keys = Heading.keys();
  const index1 = keys.indexOf(headingKey);
  const index2 = index1 > keys.length - 2 ? 0 : index1 + 1;

  return keys[index2];
};

Heading.right = (headingKey) => {
  const keys = Heading.keys();
  const index1 = keys.indexOf(headingKey);
  const index2 = index1 < 1 ? keys.length - 1 : index1 - 1;

  return keys[index2];
};

Object.freeze(Heading);

export default Heading;
