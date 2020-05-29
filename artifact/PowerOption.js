const PowerOption = {
  CHANGE_INITIATIVE: "changeInitiative",
  CHARGE_BATTERY: "chargeBattery",
  CHARGE_RED: "chargeRed",
  CHARGE_YELLOW: "chargeYellow",
  DEFEND_INITIATIVE: "defendInitiative",
  ENABLE_SIDE_SLIP: "enableSideSlip",
  POWER_THROUGH_TURN: "powerThroughTurn",
  REDIRECT_MISSILE: "redirectMissile",
  REINFORCE_SHIELD: "reinforceShield",
  TRANSMIT_POWER: "transmitPower",

  properties: {
    changeInitiative: {
      name: "Change Initiative",
      key: "changeInitiative",
    },
    chargeBattery: {
      name: "Charge Battery",
      key: "chargeBattery",
    },
    chargeRed: {
      name: "Charge Red",
      key: "chargeRed",
    },
    chargeYellow: {
      name: "Charge Yellow",
      key: "chargeYellow",
    },
    defendInitiative: {
      name: "Defend Initiative",
      key: "defendInitiative",
    },
    enableSideSlip: {
      name: "Enable Side Slip",
      key: "enableSideSlip",
    },
    powerThroughTurn: {
      name: "Power through Turn",
      key: "powerThroughTurn",
    },
    redirectMissile: {
      name: "Redirect Missile",
      key: "redirectMissile",
    },
    reinforceShield: {
      name: "Reinforce Shield",
      key: "reinforceShield",
    },
    transmitPower: {
      name: "Transmit Power",
      key: "transmitPower",
    },
  },
};

PowerOption.keys = () => Object.keys(PowerOption.properties);

PowerOption.values = () => Object.values(PowerOption.properties);

Object.freeze(PowerOption);

export default PowerOption;
