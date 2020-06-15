import Ship from "../artifact/Ship.js";
import Weapon from "../artifact/Weapon.js";

import Endpoint from "./Endpoint.js";
import ImageCache from "./ImageCache.js";

QUnit.module("ImageCache");

QUnit.test("load()", (assert) => {
  // Setup.

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    R.forEach((iconKey) => {
      assert.ok(ImageCache.imageMap[iconKey], `iconKey = ${iconKey}`);
    }, ImageCache.ICON_KEYS);
    R.forEach((shipKey) => {
      assert.ok(ImageCache.imageMap[shipKey], `shipKey = ${shipKey}`);
    }, Ship.keys());
    R.forEach((weaponKey) => {
      assert.ok(ImageCache.imageMap[weaponKey], `weaponKey = ${weaponKey}`);
    }, Weapon.keys());
    done();
  };

  ImageCache.load(Endpoint.LOCAL_RESOURCE).then(callback);
});

const ImageCacheTest = {};
export default ImageCacheTest;
