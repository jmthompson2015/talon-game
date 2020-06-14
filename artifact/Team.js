const Team = {
  TALON: "talon",
  TERRAN: "terran",

  properties: {
    talon: {
      name: "Talon Empire",
      color: "rgba(210,105,30,0.8)", // Chocolate
      key: "talon",
    },
    terran: {
      name: "Terran Confederation",
      color: "rgba(100,149,237,0.8)", // CornflowerBlue
      key: "terran",
    },
  },
};

Team.keys = () => Object.keys(Team.properties);

Team.values = () => Object.values(Team.properties);

Team.other = (teamKey) => {
  let answer = teamKey;

  if (![undefined, null].includes(teamKey)) {
    answer = teamKey === Team.TALON ? Team.TERRAN : Team.TALON;
  }

  return answer;
};

Object.freeze(Team);

export default Team;
