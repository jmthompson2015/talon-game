const Team = {
  TALON: "talon",
  TERRAN: "terran",

  properties: {
    talon: {
      name: "Talon Empire",
      key: "talon",
    },
    terran: {
      name: "Terran Confederation",
      key: "terran",
    },
  },
};

Team.keys = () => Object.keys(Team.properties);

Team.values = () => Object.values(Team.properties);

Object.freeze(Team);

export default Team;
