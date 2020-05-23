const Hull = {
  BASE: "base",
  BATTLE_CRUISER: "battleCruiser",
  BATTLESHIP: "battleship",
  CARRIER: "carrier",
  DESTROYER: "destroyer",
  DREADNOUGHT: "dreadnought",
  FIGHTER: "fighter",
  FRIGATE: "frigate",
  HEAVY_CRUISER: "heavyCruiser",
  LIGHT_CRUISER: "lightCruiser",
  SCOUT: "scout",
  TRANSPORT: "transport",

  properties: {
    base: {
      name: "Base",
      abbreviation: "Base",
      explosion: 5,
      key: "base",
    },
    battleCruiser: {
      name: "Battle Cruiser",
      abbreviation: "BC",
      explosion: 3,
      key: "battleCruiser",
    },
    battleship: {
      name: "Battleship",
      abbreviation: "BB",
      explosion: 4,
      key: "battleship",
    },
    carrier: {
      name: "Carrier",
      abbreviation: "CV",
      explosion: 4,
      key: "carrier",
    },
    destroyer: {
      name: "Destroyer",
      abbreviation: "DD",
      explosion: 1,
      key: "destroyer",
    },
    dreadnought: {
      name: "Dreadnought",
      abbreviation: "DN",
      explosion: 5,
      key: "dreadnought",
    },
    fighter: {
      name: "Fighter",
      abbreviation: "FTR",
      explosion: 0,
      key: "fighter",
    },
    frigate: {
      name: "Frigate",
      abbreviation: "FF",
      explosion: 1,
      key: "frigate",
    },
    heavyCruiser: {
      name: "Heavy Cruiser",
      abbreviation: "CA",
      explosion: 3,
      key: "heavyCruiser",
    },
    lightCruiser: {
      name: "Light Cruiser",
      abbreviation: "CL",
      explosion: 2,
      key: "lightCruiser",
    },
    scout: {
      name: "Scout",
      abbreviation: "SC",
      explosion: 1,
      key: "scout",
    },
    transport: {
      name: "Transport",
      abbreviation: "Tran",
      explosion: 2,
      key: "transport",
    },
  },
};

Hull.keys = () => Object.keys(Hull.properties);

Hull.values = () => Object.values(Hull.properties);

Object.freeze(Hull);

export default Hull;
