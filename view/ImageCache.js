/* eslint no-console: ["error", { allow: ["log"] }] */

import Ship from "../artifact/Ship.js";
import Weapon from "../artifact/Weapon.js";

import Endpoint from "./Endpoint.js";

const ImageCache = {};

const IS_VERBOSE = false;

ImageCache.ICON_KEYS = [
  "criticalDamage",
  "hullBox",
  "talonInitiative",
  "terranInitiative",
];

ImageCache.isLoaded = false;

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => {
      if (IS_VERBOSE) {
        console.log(`Loaded image: ${src} ${img.width}x${img.height}`);
      }
      resolve(img);
    });
    img.addEventListener("error", (err) => reject(err));
    img.src = src;
  });

ImageCache.load = (resourceBase = Endpoint.NETWORK_RESOURCE) => {
  if (ImageCache.isLoaded) {
    return Promise.resolve();
  }

  const start = Date.now();

  // Icons.
  const mapFunction1 = (iconKey) => {
    const iconImageFile = `${resourceBase}/icon/${iconKey}.png`;

    return loadImage(iconImageFile);
  };
  const promises1 = R.map(mapFunction1, ImageCache.ICON_KEYS);

  // Ships.
  const mapFunction2 = (shipKey) => {
    const shipImageFile = `${resourceBase}/ship/${shipKey}.png`;

    return loadImage(shipImageFile);
  };
  const promises2 = R.map(mapFunction2, Ship.keys());

  // Weapons.
  const mapFunction3 = (weaponKey) => {
    const weaponImageFile = `${resourceBase}/weapon/${weaponKey}.png`;

    return loadImage(weaponImageFile);
  };
  const promises3 = R.map(mapFunction3, Weapon.keys());

  const promises = R.concat(R.concat(promises1, promises2), promises3);

  return Promise.all(promises).then((images) => {
    const reduceFunction = (accum, image) => {
      const index0 = image.src.lastIndexOf("/");
      const index1 = image.src.lastIndexOf(".");
      const key = image.src.substring(index0 + 1, index1);

      return R.assoc(key, image, accum);
    };
    ImageCache.imageMap = R.reduce(reduceFunction, {}, images);
    ImageCache.isLoaded = true;

    console.log(`ImageCache.load() elapsed time: ${Date.now() - start} ms`);
  });
};

ImageCache.icon = (iconKey) => ImageCache.imageMap[iconKey];

ImageCache.ship = (shipKey) => ImageCache.imageMap[shipKey];

ImageCache.weapon = (weaponKey) => ImageCache.imageMap[weaponKey];

export default ImageCache;
