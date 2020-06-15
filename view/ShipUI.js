import Arc from "../artifact/Arc.js";
import Resolver from "../artifact/Resolver.js";

import Endpoint from "./Endpoint.js";
import ImageCache from "./ImageCache.js";

const { BoardCalculator } = ReactGameBoard;

const DEGREE_TO_RADIAN = Math.PI / 180.0;

const computeFontSize1 = (size) => 0.12 * size;
const computeFontSize2 = (size) => 0.16 * size;
const computeFontSize3 = (size) => 0.2 * size;

const forEachIndexed = R.addIndex(R.forEach);

const drawHull = (context0, size, shipType, hullIndex) => {
  const { hullBoxes } = shipType;
  const hullCount = hullBoxes.length;
  const offset = 0.48 * size;
  const length = 1.2 * size;
  const dx = Math.round(length / hullCount);
  const criticalImage = ImageCache.icon("criticalDamage");
  const hullImage = ImageCache.icon("hullBox");

  const context = context0;
  context.save();

  context.font = `${computeFontSize1(size)}px serif`;

  const forEachFunction = (hullBox, i) => {
    const image = hullBox.type === "hull" ? hullImage : criticalImage;
    const fillStyle = hullBox.type === "hull" ? "white" : "black";
    const x = (i - hullIndex) * dx - 0.5 * length;

    context.drawImage(image, x, offset, dx, dx);

    if (hullBox.power < 0) {
      context.fillStyle = fillStyle;
      context.fillText(hullBox.power, x + 0.2 * dx, offset + 0.7 * dx);
    }
  };
  forEachIndexed(forEachFunction, hullBoxes);

  context.restore();
};

const drawPowerCurve = (context0, size, powerCurve) => {
  const powerOffset = 0.26 * size;
  const powerLength = 0.6 * size;
  const x = -powerLength / 2;
  const y = powerOffset;
  const xOffset = powerLength / 3;
  const yOffset = 0.17 * size;
  const radius = 0.1 * size;

  const context = context0;
  context.save();

  context.fillStyle = "white";
  context.fillRect(x, y, powerLength - xOffset, 2 * radius);
  context.beginPath();
  context.arc(x + 2 * xOffset + radius, y + radius, radius, 0, 2 * Math.PI);
  context.fill();
  context.fillStyle = "black";
  context.font = `${computeFontSize3(size)}px serif`;
  context.fillText(powerCurve.power, x + 0.2 * xOffset, y + yOffset);
  context.fillText(powerCurve.speed, x + 1.2 * xOffset, y + yOffset);
  context.fillText(powerCurve.turnRadius, x + 2.2 * xOffset, y + yOffset);

  context.restore();
};

const drawHorizontalShield = (context0, size, dx, y, radius, label) => {
  const angle1 = Math.PI / 2;
  const angle2 = (3 * Math.PI) / 2;

  const context = context0;
  context.save();

  context.fillStyle = "green";
  context.beginPath();
  context.arc(-dx, y, radius, angle1, angle2);
  context.arc(dx, y, radius, angle2, angle1);
  context.fill();
  context.fillStyle = "black";
  context.font = `${computeFontSize2(size)}px serif`;
  const yy = y > 0 ? 1.07 * y : 0.93 * y;
  context.fillText(label, -0.5 * dx, yy);

  context.restore();
};

const drawVerticalShield = (context0, size, x, dy, radius, label) => {
  const angle1 = Math.PI;
  const angle2 = 0;
  const textAngle = x > 0 ? 90 : -90;

  const context = context0;
  context.save();

  context.fillStyle = "green";
  context.beginPath();
  context.arc(x, -dy, radius, angle1, angle2);
  context.arc(x, dy, radius, angle2, angle1);
  context.fill();
  context.fillStyle = "black";
  context.font = `${computeFontSize2(size)}px serif`;
  context.translate(x, 0);
  context.rotate(textAngle * DEGREE_TO_RADIAN);
  context.fillText(label, -0.5 * dy, 0.7 * radius);

  context.restore();
};

const drawShields = (context, size, shipType, arcToShield) => {
  const radius = 0.08 * size;
  const offset = 0.76 * size;
  const length = 0.2 * size;
  const mapFunction = (arcKey) => {
    const shieldCount = arcToShield[arcKey];
    const totalShield = shipType.shields[arcKey];

    return `${shieldCount}/${totalShield}`;
  };
  const labels = R.map(mapFunction, Arc.keys());

  // Forward shield.
  drawHorizontalShield(context, size, length, -offset, radius, labels[0]);

  // Right shield.
  drawVerticalShield(context, size, offset, length, radius, labels[1]);

  // Rear shield.
  drawHorizontalShield(context, size, length, offset, radius, labels[2]);

  // Left shield.
  drawVerticalShield(context, size, -offset, length, radius, labels[3]);
};

const drawShip = (context, size, shipKey) => {
  const image = ImageCache.ship(shipKey);
  const { height: height2, width: width2 } = image;
  const factor = 160;
  const width3 = (factor * size) / height2;
  const height3 = (factor * size) / width2;
  const x = -0.5 * width3;
  const y = -0.5 * height3;

  context.drawImage(image, x, y - 0.15 * height3, width3, height3);
};

const drawWeaponGroup = (context0, size, weaponGroup, x, red, yellow) => {
  const boxSize = 0.17 * size;
  const x0 = x - boxSize / 2;
  const y0 = 0.1 * size;
  const y1 = y0 - boxSize;
  const y2 = y1 - boxSize;
  const image = ImageCache.weapon(weaponGroup.weaponKey);
  const yOffset = 0.04 * size;

  const context = context0;
  context.save();

  context.font = `${computeFontSize1(size)}px serif`;

  if (image) {
    context.drawImage(image, x0, y0, boxSize, boxSize);
  } else {
    context.fillStyle = "white";
    context.fillRect(x0, y0, boxSize, boxSize);
  }

  context.fillStyle = "red";
  context.fillRect(x0, y1, boxSize, boxSize);
  context.fillStyle = "black";
  context.fillText(`${red}/${weaponGroup.red}`, x0, y0 - yOffset);

  context.fillStyle = "yellow";
  context.fillRect(x0, y2, boxSize, boxSize);
  context.fillStyle = "black";
  context.fillText(`${yellow}/${weaponGroup.yellow}`, x0, y1 - yOffset);

  context.restore();
};

const drawWeaponGroups = (
  context,
  size,
  shipType,
  weaponGroupToRed,
  weaponGroupToYellow
) => {
  const { weaponGroups } = shipType;
  const groupCount = weaponGroups.length;
  const weaponWidth = size;
  const weaponStart = -weaponWidth / 2;
  const dx = weaponWidth / (groupCount - 1);

  const forEachFunction = (weaponGroup, index) => {
    const x = weaponStart + dx * index;
    const red = weaponGroupToRed[index];
    const yellow = weaponGroupToYellow[index];
    drawWeaponGroup(context, size, weaponGroup, x, red, yellow);
  };

  forEachIndexed(forEachFunction, weaponGroups);
};

// /////////////////////////////////////////////////////////////////////////////
const ShipUI = {};

ShipUI.render = (
  context,
  { center, corners, size },
  {
    shipInstance,
    heading,
    powerCurve,
    arcToShield,
    hullIndex,
    weaponGroupToRed,
    weaponGroupToYellow,
  },
  resourceBase = Endpoint.NETWORK_RESOURCE
) => {
  if (size > 1) {
    const { shipType } = shipInstance;
    const shipKey = shipType.key;
    const team = Resolver.team(shipType.teamKey);

    const teamColor = team.color;
    const gridColor = "rgb(64,64,64)";
    const gridLineWidth = 1;

    BoardCalculator.fillCell(context, corners, teamColor, gridLineWidth);
    BoardCalculator.drawCell(context, corners, gridColor, gridLineWidth);

    ImageCache.load(resourceBase).then(() => {
      context.save();

      context.translate(center.x, center.y);
      context.rotate(heading.angle * DEGREE_TO_RADIAN);

      drawShip(context, size, shipKey);
      drawPowerCurve(context, size, powerCurve);
      drawShields(context, size, shipType, arcToShield);
      drawWeaponGroups(
        context,
        size,
        shipType,
        weaponGroupToRed,
        weaponGroupToYellow
      );
      drawHull(context, size, shipType, hullIndex);

      context.restore();
    });
  }
};

export default ShipUI;
