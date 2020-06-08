const Weapon = {
  ANTI_MATTER_TORPEDO: "antiMatterTorpedo",
  DISRUPTOR: "disruptor",
  FUSION_CANNON: "fusionCannon",
  MISSILE: "missile",
  PHASER: "phaser",
  WAVE_MOTION_GUN: "waveMotionGun",

  properties: {
    antiMatterTorpedo: {
      name: "Anti-Matter Torpedo",
      damage: 4,
      rollToHit: {
        2: [2, 6],
        3: [3, 6],
        4: [5, 6],
      },
      range: { low: 2, high: 4 },
      key: "antiMatterTorpedo",
    },
    disruptor: {
      name: "Disruptor",
      damage: 2,
      rollToHit: {
        1: [5, 6],
        2: [2, 6],
        3: [3, 6],
        4: [5, 6],
      },
      range: { low: 1, high: 4 },
      key: "disruptor",
    },
    fusionCannon: {
      name: "Fusion Cannon",
      damageAtRange: {
        1: [7, 4, 0],
        2: [7, 4, 0],
        3: [9, 6, 2],
        4: [9, 6, 2],
        5: [11, 8, 4],
        6: [11, 8, 4],
      },
      range: { low: 1, high: 3 },
      key: "fusionCannon",
    },
    missile: {
      name: "Missile",
      damage: 2,
      speed: 6,
      range: { low: 1, high: 4 },
      key: "missile",
    },
    phaser: {
      name: "Phaser",
      damageAtRange: {
        1: [1, 1, 0],
        2: [2, 1, 0],
        3: [2, 1, 0],
        4: [2, 2, 0],
        5: [2, 2, 1],
        6: [2, 2, 1],
      },
      range: { low: 1, high: 3 },
      key: "phaser",
    },
    waveMotionGun: {
      name: "Wave Motion Gun",
      damage: 10,
      rollToHit: {
        2: [2, 6],
        3: [3, 6],
        4: [3, 6],
      },
      range: { low: 2, high: 4 },
      key: "waveMotionGun",
    },
  },
};

Weapon.keys = () => Object.keys(Weapon.properties);

Weapon.values = () => Object.values(Weapon.properties);

const TYPE1 = [
  Weapon.ANTI_MATTER_TORPEDO,
  Weapon.DISRUPTOR,
  Weapon.WAVE_MOTION_GUN,
];
const TYPE2 = [Weapon.FUSION_CANNON, Weapon.PHASER];

Weapon.damage = (weaponKey, range, roll) => {
  const weapon = Weapon.properties[weaponKey];
  let answer = 0;

  if (weapon) {
    if (TYPE1.includes(weaponKey)) {
      const rollToHit = weapon.rollToHit[range];
      answer =
        rollToHit && rollToHit[0] <= roll && roll <= rollToHit[1]
          ? weapon.damage
          : 0;
    } else if (TYPE2.includes(weaponKey)) {
      answer = weapon.damageAtRange[roll][range - 1] || 0;
    } else if (weaponKey === Weapon.MISSILE) {
      answer = weapon.damage;
    }
  }

  return answer;
};

Weapon.isInRange = (weaponKey, distance) => {
  const weapon = Weapon.properties[weaponKey];
  const range = weapon ? weapon.range : undefined;

  return range && range.low <= distance && distance <= range.high;
};

Object.freeze(Weapon);

export default Weapon;
