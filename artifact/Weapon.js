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
      key: "fusionCannon",
    },
    missile: {
      name: "Missile",
      damage: 2,
      range: 4,
      speed: 6,
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
      key: "waveMotionGun",
    },
  },
};

Weapon.keys = () => Object.keys(Weapon.properties);

Weapon.values = () => Object.values(Weapon.properties);

Object.freeze(Weapon);

export default Weapon;
