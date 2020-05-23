import Arc from "./Arc.js";
import Hull from "./Hull.js";
import Team from "./Team.js";
import Weapon from "./Weapon.js";

const FORWARD = [Arc.FORWARD];
const FORWARD_LEFT = [Arc.FORWARD, Arc.LEFT];
const FORWARD_REAR_LEFT = [Arc.FORWARD, Arc.REAR, Arc.LEFT];
const FORWARD_RIGHT = [Arc.FORWARD, Arc.RIGHT];
const FORWARD_RIGHT_LEFT = [Arc.FORWARD, Arc.RIGHT, Arc.LEFT];
const FORWARD_RIGHT_REAR = [Arc.FORWARD, Arc.RIGHT, Arc.REAR];
const RIGHT = [Arc.RIGHT];

const createHullBox = (power = 0, type = "hull") => Immutable({ power, type });

const createPowerCurve = (power, speed, turnRadius, isDefault = false) =>
  Immutable({ isDefault, power, speed, turnRadius });

const createShields = (forward, right, rear, left) =>
  Immutable({ forward, left, rear, right });

const createWeaponGroup = (weaponKey, red, yellow, count, arcKeys) =>
  Immutable({ arcKeys, count, red, weaponKey, yellow });

const reduceIndexed = R.addIndex(R.reduce);

const Ship = {
  TALON_BASE: "talonBase",
  TALON_BB: "talonBB",
  TALON_BC: "talonBC",
  TALON_CA: "talonCA",
  TALON_CL: "talonCL",
  TALON_DD: "talonDD",
  TALON_DN: "talonDN",
  TALON_FF: "talonFF",
  TALON_TRAN: "talonTran",

  TERRAN_BASE: "terranBase",
  TERRAN_BB: "terranBB",
  TERRAN_BC: "terranBC",
  TERRAN_CA: "terranCA",
  TERRAN_CL: "terranCL",
  TERRAN_CV: "terranCV",
  TERRAN_DD: "terranDD",
  TERRAN_FTR: "terranFTR",
  TERRAN_SC: "terranSC",
  TERRAN_TRAN: "terranTran",

  properties: {
    talonBase: {
      hull: Hull.BASE,
      hullBoxes: [
        createHullBox(),
        createHullBox(),
        createHullBox(-1),
        createHullBox(-1),
        createHullBox(-2, "critical"),
        createHullBox(-2),
        createHullBox(-2, "critical"),
        createHullBox(-3),
        createHullBox(-3),
        createHullBox(-3),
      ],
      names: ["Hope"],
      points: 184,
      powerCurves: [
        createPowerCurve(6, 3, null),
        createPowerCurve(6, 2, null, true),
        createPowerCurve(6, 1, null),
      ],
      shields: createShields(7, 7, 7, 7),
      teamKey: Team.TALON,
      weaponGroups: [
        createWeaponGroup(Weapon.DISRUPTOR, 1, 4, 2, FORWARD_REAR_LEFT),
        createWeaponGroup(Weapon.DISRUPTOR, 1, 4, 2, FORWARD_RIGHT_REAR),
        createWeaponGroup(Weapon.MISSILE, 2, 0, 2, FORWARD_RIGHT_REAR),
      ],
      key: "talonBase",
    },
    talonBB: {
      afterburners: 2,
      hull: Hull.BATTLESHIP,
      hullBoxes: [
        createHullBox(),
        createHullBox(),
        createHullBox(-1),
        createHullBox(-1, "critical"),
        createHullBox(-2),
        createHullBox(-2, "critical"),
        createHullBox(-2),
        createHullBox(-3),
      ],
      names: ["Eliminator", "Eradicator", "Eviscerator"],
      points: 179,
      powerCurves: [
        createPowerCurve(0, 5, 3),
        createPowerCurve(2, 4, 2),
        createPowerCurve(3, 3, 2, true),
        createPowerCurve(5, 2, 1),
        createPowerCurve(6, 1, 1),
      ],
      shields: createShields(9, 7, 6, 7),
      teamKey: Team.TALON,
      weaponGroups: [
        createWeaponGroup(Weapon.DISRUPTOR, 1, 4, 2, FORWARD_LEFT),
        createWeaponGroup(Weapon.FUSION_CANNON, 3, 3, 1, FORWARD),
        createWeaponGroup(Weapon.DISRUPTOR, 1, 4, 2, FORWARD_RIGHT),
      ],
      key: "talonBB",
    },
    talonBC: {
      afterburners: 2,
      hull: Hull.BATTLE_CRUISER,
      hullBoxes: [
        createHullBox(),
        createHullBox(),
        createHullBox(-1, "critical"),
        createHullBox(-1),
        createHullBox(-2, "critical"),
        createHullBox(-2),
        createHullBox(-2),
      ],
      names: ["Freedom", "Honor", "Victory"],
      points: 142,
      powerCurves: [
        createPowerCurve(1, 5, 2),
        createPowerCurve(2, 4, 2),
        createPowerCurve(3, 3, 1, true),
        createPowerCurve(4, 2, 1),
        createPowerCurve(5, 1, 0),
      ],
      shields: createShields(8, 4, 4, 4),
      teamKey: Team.TALON,
      weaponGroups: [
        createWeaponGroup(Weapon.DISRUPTOR, 1, 4, 2, FORWARD_RIGHT_LEFT),
        createWeaponGroup(Weapon.MISSILE, 2, 0, 3, FORWARD),
        createWeaponGroup(Weapon.DISRUPTOR, 1, 2, 1, FORWARD),
      ],
      key: "talonBC",
    },
    talonCA: {
      afterburners: 2,
      hull: Hull.HEAVY_CRUISER,
      hullBoxes: [
        createHullBox(),
        createHullBox(),
        createHullBox(-1, "critical"),
        createHullBox(-1),
        createHullBox(-2, "critical"),
        createHullBox(-2),
        createHullBox(-2),
      ],
      names: ["Justice", "Sacrifice", "Service", "Unity"],
      points: 115,
      powerCurves: [
        createPowerCurve(1, 5, 2),
        createPowerCurve(2, 4, 2),
        createPowerCurve(3, 3, 1, true),
        createPowerCurve(4, 2, 1),
        createPowerCurve(5, 1, 0),
      ],
      shields: createShields(7, 4, 3, 4),
      teamKey: Team.TALON,
      weaponGroups: [
        createWeaponGroup(Weapon.DISRUPTOR, 1, 4, 2, FORWARD_LEFT),
        createWeaponGroup(Weapon.DISRUPTOR, 1, 4, 2, FORWARD_RIGHT),
      ],
      key: "talonCA",
    },
    talonCL: {
      afterburners: 2,
      hull: Hull.LIGHT_CRUISER,
      hullBoxes: [
        createHullBox(),
        createHullBox(0, "critical"),
        createHullBox(-1),
        createHullBox(-1, "critical"),
        createHullBox(-2),
      ],
      names: ["Dauntless", "Fearless", "Indomitable"],
      points: 88,
      powerCurves: [
        createPowerCurve(2, 5, 2),
        createPowerCurve(3, 4, 1),
        createPowerCurve(4, 3, 1, true),
        createPowerCurve(4, 2, 0),
        createPowerCurve(5, 1, 0),
      ],
      shields: createShields(6, 3, 3, 3),
      teamKey: Team.TALON,
      weaponGroups: [
        createWeaponGroup(Weapon.DISRUPTOR, 1, 2, 1, FORWARD_RIGHT_LEFT),
        createWeaponGroup(Weapon.DISRUPTOR, 1, 4, 2, FORWARD),
      ],
      key: "talonCL",
    },
    talonDD: {
      afterburners: 2,
      hull: Hull.DESTROYER,
      hullBoxes: [
        createHullBox(0, "critical"),
        createHullBox(),
        createHullBox(-1, "critical"),
        createHullBox(-1),
      ],
      names: ["Hunter", "Predator", "Shadow"],
      points: 48,
      powerCurves: [
        createPowerCurve(0, 5, 1),
        createPowerCurve(1, 4, 1),
        createPowerCurve(1, 3, 0, true),
        createPowerCurve(2, 2, 0),
        createPowerCurve(2, 1, 0),
      ],
      shields: createShields(4, 2, 2, 2),
      teamKey: Team.TALON,
      weaponGroups: [
        createWeaponGroup(Weapon.MISSILE, 2, 0, 1, FORWARD_RIGHT_LEFT),
        createWeaponGroup(Weapon.MISSILE, 2, 0, 1, FORWARD),
      ],
      key: "talonDD",
    },
    talonDN: {
      afterburners: 2,
      hull: Hull.DREADNOUGHT,
      hullBoxes: [
        createHullBox(),
        createHullBox(),
        createHullBox(-1),
        createHullBox(-1),
        createHullBox(-2, "critical"),
        createHullBox(-2),
        createHullBox(-2, "critical"),
        createHullBox(-3),
        createHullBox(-3),
        createHullBox(-3),
      ],
      names: ["Dominion", "Imperial"],
      points: 218,
      powerCurves: [
        createPowerCurve(1, 4, 3),
        createPowerCurve(3, 3, 2, true),
        createPowerCurve(5, 2, 2),
        createPowerCurve(6, 1, 1),
      ],
      shields: createShields(11, 9, 8, 9),
      teamKey: Team.TALON,
      weaponGroups: [
        createWeaponGroup(Weapon.DISRUPTOR, 1, 4, 2, FORWARD_LEFT),
        createWeaponGroup(Weapon.FUSION_CANNON, 3, 6, 2, FORWARD),
        createWeaponGroup(Weapon.DISRUPTOR, 1, 4, 2, FORWARD_RIGHT),
      ],
      key: "talonDN",
    },
    talonFF: {
      hull: Hull.FRIGATE,
      hullBoxes: [
        createHullBox(),
        createHullBox(0, "critical"),
        createHullBox(-1),
      ],
      names: ["Surprise", "Vision"],
      points: 44,
      powerCurves: [
        createPowerCurve(1, 5, 1),
        createPowerCurve(1, 4, 1),
        createPowerCurve(2, 3, 0, true),
        createPowerCurve(2, 2, 0),
        createPowerCurve(2, 1, 0),
      ],
      shields: createShields(3, 2, 2, 2),
      teamKey: Team.TALON,
      weaponGroups: [
        createWeaponGroup(Weapon.DISRUPTOR, 1, 2, 1, FORWARD),
        createWeaponGroup(Weapon.DISRUPTOR, 1, 2, 1, FORWARD),
      ],
      key: "talonFF",
    },
    talonTran: {
      hull: Hull.TRANSPORT,
      hullBoxes: [
        createHullBox(),
        createHullBox(0, "critical"),
        createHullBox(-1),
        createHullBox(-1),
      ],
      names: ["Legion", "Tribe"],
      points: 36,
      powerCurves: [
        createPowerCurve(0, 3, 2),
        createPowerCurve(1, 2, 1, true),
        createPowerCurve(2, 1, 0),
      ],
      shields: createShields(5, 4, 3, 4),
      teamKey: Team.TALON,
      weaponGroups: null,
      key: "talonTran",
    },
    // /////////////////////////////////////////////////////////////////////////
    terranBase: {
      hull: Hull.BASE,
      hullBoxes: [
        createHullBox(),
        createHullBox(),
        createHullBox(-1),
        createHullBox(-1),
        createHullBox(-1, "critical"),
        createHullBox(-2),
        createHullBox(-2),
        createHullBox(-2),
        createHullBox(-3),
      ],
      names: ["Valley Forge"],
      points: 184,
      powerCurves: [
        createPowerCurve(6, 3, null),
        createPowerCurve(6, 2, null, true),
        createPowerCurve(6, 1, null),
      ],
      shields: createShields(7, 7, 7, 7),
      teamKey: Team.TERRAN,
      weaponGroups: [
        createWeaponGroup(Weapon.PHASER, 1, 2, 2, FORWARD_REAR_LEFT),
        createWeaponGroup(Weapon.PHASER, 1, 2, 2, FORWARD_RIGHT_REAR),
        createWeaponGroup(Weapon.WAVE_MOTION_GUN, 2, 5, 1, RIGHT),
      ],
      key: "terranBase",
    },
    terranBB: {
      batteries: 1,
      hull: Hull.BATTLESHIP,
      hullBoxes: [
        createHullBox(),
        createHullBox(),
        createHullBox(-1),
        createHullBox(-1),
        createHullBox(-1, "critical"),
        createHullBox(-2),
        createHullBox(-2),
        createHullBox(-2),
        createHullBox(-3),
      ],
      names: ["Defiant", "Prometheus", "Thunderchild"],
      points: 194,
      powerCurves: [
        createPowerCurve(0, 5, 3),
        createPowerCurve(2, 4, 3),
        createPowerCurve(3, 3, 2, true),
        createPowerCurve(5, 2, 2),
        createPowerCurve(6, 1, 1),
      ],
      shields: createShields(8, 7, 7, 7),
      teamKey: Team.TERRAN,
      weaponGroups: [
        createWeaponGroup(Weapon.PHASER, 1, 2, 2, FORWARD_LEFT),
        createWeaponGroup(Weapon.WAVE_MOTION_GUN, 2, 5, 1, FORWARD),
        createWeaponGroup(Weapon.PHASER, 1, 2, 2, FORWARD_RIGHT),
      ],
      key: "terranBB",
    },
    terranBC: {
      batteries: 1,
      hull: Hull.BATTLE_CRUISER,
      hullBoxes: [
        createHullBox(),
        createHullBox(),
        createHullBox(-1),
        createHullBox(-1, "critical"),
        createHullBox(-1),
        createHullBox(-2),
      ],
      names: ["Alexander", "Caesar", "Sun Tzu"],
      points: 134,
      powerCurves: [
        createPowerCurve(2, 5, 3),
        createPowerCurve(3, 4, 2),
        createPowerCurve(4, 3, 2, true),
        createPowerCurve(5, 2, 1),
        createPowerCurve(6, 1, 1),
      ],
      shields: createShields(7, 5, 5, 5),
      teamKey: Team.TERRAN,
      weaponGroups: [
        createWeaponGroup(Weapon.PHASER, 1, 1, 1, FORWARD_LEFT),
        createWeaponGroup(Weapon.ANTI_MATTER_TORPEDO, 2, 4, 2, FORWARD),
        createWeaponGroup(Weapon.PHASER, 1, 1, 1, FORWARD_RIGHT),
      ],
      key: "terranBC",
    },
    terranCA: {
      batteries: 1,
      hull: Hull.HEAVY_CRUISER,
      hullBoxes: [
        createHullBox(),
        createHullBox(),
        createHullBox(-1),
        createHullBox(-1, "critical"),
        createHullBox(-1),
        createHullBox(-2),
      ],
      names: ["Guderian", "Napoleon", "Patton", "Zhukov"],
      points: 115,
      powerCurves: [
        createPowerCurve(1, 5, 3),
        createPowerCurve(2, 4, 2),
        createPowerCurve(3, 3, 2, true),
        createPowerCurve(4, 2, 1),
        createPowerCurve(5, 1, 1),
      ],
      shields: createShields(6, 5, 4, 5),
      teamKey: Team.TERRAN,
      weaponGroups: [
        createWeaponGroup(Weapon.PHASER, 1, 1, 1, FORWARD_LEFT),
        createWeaponGroup(Weapon.ANTI_MATTER_TORPEDO, 2, 2, 1, FORWARD),
        createWeaponGroup(Weapon.PHASER, 1, 1, 1, FORWARD_RIGHT),
      ],
      key: "terranCA",
    },
    terranCL: {
      batteries: 1,
      hull: Hull.LIGHT_CRUISER,
      hullBoxes: [
        createHullBox(),
        createHullBox(),
        createHullBox(-1, "critical"),
        createHullBox(-1),
        createHullBox(-1),
      ],
      names: ["Asgard", "Thor", "Valhalla"],
      points: 88,
      powerCurves: [
        createPowerCurve(1, 5, 2),
        createPowerCurve(2, 4, 2),
        createPowerCurve(3, 3, 1, true),
        createPowerCurve(3, 2, 1),
        createPowerCurve(4, 1, 0),
      ],
      shields: createShields(5, 4, 3, 4),
      teamKey: Team.TERRAN,
      weaponGroups: [
        createWeaponGroup(Weapon.PHASER, 1, 1, 1, FORWARD_RIGHT_LEFT),
        createWeaponGroup(
          Weapon.ANTI_MATTER_TORPEDO,
          2,
          2,
          1,
          FORWARD_RIGHT_LEFT
        ),
      ],
      key: "terranCL",
    },
    terranCV: {
      hull: Hull.CARRIER,
      hullBoxes: [
        createHullBox(),
        createHullBox(),
        createHullBox(-1, "critical"),
        createHullBox(-1),
        createHullBox(-2, "critical"),
        createHullBox(-2),
      ],
      names: ["Hornet", "Wasp"],
      points: 70,
      powerCurves: [
        createPowerCurve(4, 3, 3),
        createPowerCurve(5, 2, 2, true),
        createPowerCurve(6, 1, 2),
      ],
      shields: createShields(4, 4, 4, 4),
      teamKey: Team.TERRAN,
      weaponGroups: [
        createWeaponGroup(Weapon.PHASER, 1, 1, 1, FORWARD_REAR_LEFT),
        createWeaponGroup(Weapon.PHASER, 1, 1, 1, FORWARD_RIGHT_REAR),
      ],
      key: "terranCV",
    },
    terranDD: {
      batteries: 1,
      hull: Hull.DESTROYER,
      hullBoxes: [
        createHullBox(),
        createHullBox(0, "critical"),
        createHullBox(-1),
        createHullBox(-1),
      ],
      names: ["Achilles", "Caleb", "Hercules"],
      points: 55,
      powerCurves: [
        createPowerCurve(1, 5, 2),
        createPowerCurve(2, 4, 1),
        createPowerCurve(2, 3, 1, true),
        createPowerCurve(3, 2, 0),
        createPowerCurve(3, 1, 0),
      ],
      shields: createShields(3, 3, 2, 3),
      teamKey: Team.TERRAN,
      weaponGroups: [
        createWeaponGroup(
          Weapon.ANTI_MATTER_TORPEDO,
          2,
          2,
          1,
          FORWARD_RIGHT_LEFT
        ),
      ],
      key: "terranDD",
    },
    terranFTR: {
      hull: Hull.FIGHTER,
      hullBoxes: [createHullBox(), createHullBox()],
      names: [
        "Ace of Spades Squadron",
        "Black Jack Squadron",
        "Black Sheep Squadron",
        "Cougar Squadron",
        "Diamondback Squadron",
        "Double Down Squadron",
        "Flying Tiger Squadron",
        "Wolverine Squadron",
      ],
      points: 44,
      powerCurves: [
        createPowerCurve(0, 6, 1),
        createPowerCurve(0, 5, 0, true),
        createPowerCurve(null, null, null),
      ],
      shields: createShields(0, 0, 0, 0),
      teamKey: Team.TERRAN,
      weaponGroups: [createWeaponGroup(Weapon.PHASER, 1, 1, 1, FORWARD)],
      key: "terranFTR",
    },
    terranSC: {
      hull: Hull.SCOUT,
      hullBoxes: [createHullBox(), createHullBox(-1)],
      names: ["Explorer", "Voyager"],
      points: 37,
      powerCurves: [
        createPowerCurve(1, 5, 1),
        createPowerCurve(1, 4, 1),
        createPowerCurve(2, 3, 0, true),
        createPowerCurve(2, 2, 0),
        createPowerCurve(2, 1, 0),
      ],
      shields: createShields(2, 1, 1, 1),
      teamKey: Team.TERRAN,
      weaponGroups: [
        createWeaponGroup(Weapon.PHASER, 1, 1, 1, FORWARD_RIGHT_LEFT),
      ],
      key: "terranSC",
    },
    terranTran: {
      hull: Hull.TRANSPORT,
      hullBoxes: [
        createHullBox(),
        createHullBox(0, "critical"),
        createHullBox(-1),
        createHullBox(-1),
      ],
      names: ["Normandy", "Rodger Young"],
      points: 32,
      powerCurves: [
        createPowerCurve(0, 3, 3),
        createPowerCurve(1, 2, 2, true),
        createPowerCurve(2, 1, 1),
      ],
      shields: createShields(4, 4, 4, 4),
      teamKey: Team.TERRAN,
      weaponGroups: null,
      key: "terranTran",
    },
  },
};

Ship.keys = () => Object.keys(Ship.properties);

Ship.values = () => Object.values(Ship.properties);

// /////////////////////////////////////////////////////////////////////////////
Ship.defaultPowerCurveIndex = (ship) => {
  const reduceFunction = (accum, powerCurve, i) =>
    powerCurve.isDefault ? i : accum;

  return reduceIndexed(reduceFunction, -1, ship.powerCurves);
};

Object.freeze(Ship);

export default Ship;
