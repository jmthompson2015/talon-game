// 1: 6.2.3 Remove all expired Shield Reinforcement.
// 2: 6.1 Spend Available Power: Spend AP, if able or use Battery if available.
// 3: 7.1 Moving: After spending AP, Move Ships if required or use Afterburner if available.
// 4: 8 Firing: After Moving, any/all ships May Fire, if able.
// 5: 8.7 Repair of Critical Damage: Attempt to Repair all Repairable Damage.
// 6: 4.2 Check for initiative change.

const Step = {
  // Impulse phases.
  REMOVE_SHIELD_REINFORCEMENT: "removeShieldReinforcement",
  SPEND_AVAILABLE_POWER: "spendAvailablePower",
  MOVE_SHIPS: "moveShips",
  FIRE_WEAPONS: "fireWeapons",
  REPAIR_CRITICAL_DAMAGE: "repairCriticalDamage",
  // Power phase.
  CHARGE_WEAPON: "chargeWeapon",
  ADJUST_POWER_CURVE: "adjustPowerCurve",
  // Reinforcement phase.
  REINFORCEMENT: "reinforcement",
  // Retreat phase.
  RETREAT: "retreat",

  properties: {
    // Impulse phases.
    removeShieldReinforcement: {
      name: "Remove shield reinforcement",
      key: "removeShieldReinforcement",
    },
    spendAvailablePower: {
      name: "Spend available power",
      key: "spendAvailablePower",
    },
    moveShips: {
      name: "Move ships",
      key: "moveShips",
    },
    fireWeapons: {
      name: "Fire weapons",
      key: "fireWeapons",
    },
    repairCriticalDamage: {
      name: "Repair critical damage",
      key: "repairCriticalDamage",
    },
    // Power phase.
    chargeWeapon: {
      name: "Charge weapon",
      key: "chargeWeapon",
    },
    adjustPowerCurve: {
      name: "Adjust power curve",
      key: "adjustPowerCurve",
    },
    // Reinforcement phase.
    reinforcement: {
      name: "Reinforcement",
      key: "reinforcement",
    },
    // Retreat phase.
    retreat: {
      name: "Retreat",
      key: "retreat",
    },
  },
};

Step.keys = () => Object.keys(Step.properties);

Step.values = () => Object.values(Step.properties);

Object.freeze(Step);

export default Step;
