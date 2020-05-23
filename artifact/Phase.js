const Phase = {
  IMPULSE_A: "impulseA",
  IMPULSE_B: "impulseB",
  IMPULSE_C: "impulseC",
  IMPULSE_D: "impulseD",
  IMPULSE_E: "impulseE",
  IMPULSE_F: "impulseF",
  POWER_PHASE: "powerPhase",
  REINFORCEMENT_PHASE: "reinforcementPhase",
  RETREAT_PHASE: "retreatPhase",

  properties: {
    impulseA: {
      name: "Impulse A",
      numbers: [4, 5, 6],
      key: "impulseA",
    },
    impulseB: {
      name: "Impulse B",
      numbers: [3, 5, 6],
      key: "impulseB",
    },
    impulseC: {
      name: "Impulse C",
      numbers: [2, 4, 5, 6],
      key: "impulseC",
    },
    impulseD: {
      name: "Impulse D",
      numbers: [3, 4, 5, 6],
      key: "impulseD",
    },
    impulseE: {
      name: "Impulse E",
      numbers: [6],
      key: "impulseE",
    },
    impulseF: {
      name: "Impulse F",
      numbers: [1, 2, 3, 4, 5, 6],
      key: "impulseF",
    },
    powerPhase: {
      name: "Power Phase",
      key: "powerPhase",
    },
    reinforcementPhase: {
      name: "Reinforcement Phase",
      key: "reinforcementPhase",
    },
    retreatPhase: {
      name: "Retreat Phase",
      key: "retreatPhase",
    },
  },
};

Phase.keys = () => Object.keys(Phase.properties);

Phase.values = () => Object.values(Phase.properties);

Object.freeze(Phase);

export default Phase;
