import Phase from "./Phase.js";

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
      phaseKey: "impulse",
      key: "removeShieldReinforcement",
    },
    spendAvailablePower: {
      name: "Spend available power",
      phaseKey: "impulse",
      key: "spendAvailablePower",
    },
    moveShips: {
      name: "Move ships",
      phaseKey: "impulse",
      key: "moveShips",
    },
    fireWeapons: {
      name: "Fire weapons",
      phaseKey: "impulse",
      key: "fireWeapons",
    },
    repairCriticalDamage: {
      name: "Repair critical damage",
      phaseKey: "impulse",
      key: "repairCriticalDamage",
    },
    // Power phase.
    chargeWeapon: {
      name: "Charge weapon",
      phaseKey: Phase.POWER_PHASE,
      key: "chargeWeapon",
    },
    adjustPowerCurve: {
      name: "Adjust power curve",
      phaseKey: Phase.POWER_PHASE,
      key: "adjustPowerCurve",
    },
    // Reinforcement phase.
    reinforcement: {
      name: "Reinforcement",
      phaseKey: Phase.REINFORCEMENT_PHASE,
      key: "reinforcement",
    },
    // Retreat phase.
    retreat: {
      name: "Retreat",
      phaseKey: Phase.RETREAT_PHASE,
      key: "retreat",
    },
  },
};

Step.keys = () => Object.keys(Step.properties);

Step.keysByPhase = (phaseKey) => {
  const mapFunction = R.prop("key");

  return R.map(mapFunction, Step.valuesByPhase(phaseKey));
};

Step.values = () => Object.values(Step.properties);

Step.valuesByPhase = (phaseKey) => {
  const filterFunction = (step) => step.phaseKey === phaseKey;

  return R.filter(filterFunction, Step.values());
};

Object.freeze(Step);

export default Step;
