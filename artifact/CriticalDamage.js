const CriticalDamage = {
  2: {
    name: "Secondary Explosion",
    hullDamage: 3,
  },
  3: {
    name: "Shields Down until Repaired",
  },
  4: {
    name: "Helm Down until Repaired",
  },
  5: {
    name: "Random Weapon Group Destroyed",
  },
  6: {
    name: "Maneuvering Thrusters Damaged",
    turnRadius: 1,
  },
  7: {
    name: "No Critical Damage",
  },
  8: {
    name: "Power Relay Damage",
    power: -1,
  },
  9: {
    name: "Random Weapon Group Destroyed",
  },
  10: {
    name: "1 Hull Damage and FTL Offline",
    hullDamage: 1,
  },
  11: {
    name: "Power Loss until Repaired",
  },
  12: {
    name: "FLT Core Breach: Ship Destroyed",
  },
};

Object.freeze(CriticalDamage);

export default CriticalDamage;
