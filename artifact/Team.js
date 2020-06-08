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

Team.other = (teamKey) => {
  let answer = teamKey;

  if (![undefined, null].includes(teamKey)) {
    answer = teamKey === Team.TALON ? Team.TERRAN : Team.TALON;
  }

  return answer;
};

Object.freeze(Team);

export default Team;
