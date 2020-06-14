import Arc from "./Arc.js";
import Heading from "./Heading.js";

const {
  BoardCalculator,
  CoordinateCalculator,
  HexBoardUtilities,
} = ReactGameBoard;

const Board = {};

Board.IS_SQUARE = false;
Board.IS_FLAT = false;
Board.UNUSED = Immutable([
  "a1",
  "a2",
  "a3",
  "a4",
  "a5",
  "a6",
  "a7",
  "a8",
  "a9",
  "a10",
  "b1",
  "b2",
  "b3",
  "b4",
  "b5",
  "b6",
  "b7",
  "b8",
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "d1",
  "d2",
  "d3",
  "d4",
  "e1",
  "e2",
  "q11",
  "q12",
  "r9",
  "r10",
  "r11",
  "r12",
  "s7",
  "s8",
  "s9",
  "s10",
  "s11",
  "s12",
  "t5",
  "t6",
  "t7",
  "t8",
  "t9",
  "t10",
  "t11",
  "t12",
  "u3",
  "u4",
  "u5",
  "u6",
  "u7",
  "u8",
  "u9",
  "u10",
  "u11",
  "u12",
  "v1",
  "v2",
  "v3",
  "v4",
  "v5",
  "v6",
  "v7",
  "v8",
  "v9",
  "v10",
  "v11",
  "v12",
]);

Board.FILE_COUNT = 16 + 6;
Board.RANK_COUNT = 12;

Board.boardCalculator = new BoardCalculator(Board.IS_SQUARE, Board.IS_FLAT);
Board.coordinateCalculator = new CoordinateCalculator(
  Board.FILE_COUNT,
  Board.RANK_COUNT
);

Board.cubeDirection = (an1, an2) => {
  const q1 = Board.coordinateCalculator.anToFile(an1);
  const r1 = Board.coordinateCalculator.anToRank(an1);
  const cube1 = HexBoardUtilities.axialToCube({ q: q1, r: r1 });

  const q2 = Board.coordinateCalculator.anToFile(an2);
  const r2 = Board.coordinateCalculator.anToRank(an2);
  const cube2 = HexBoardUtilities.axialToCube({ q: q2, r: r2 });

  const diff = HexBoardUtilities.createCube({
    x: cube2.x - cube1.x,
    y: cube2.y - cube1.y,
    z: cube2.z - cube1.z,
  });
  const max = Math.max(
    Math.abs(diff.x),
    Math.max(Math.abs(diff.y), Math.abs(diff.z))
  );

  return HexBoardUtilities.createCube({
    x: diff.x / max,
    y: diff.y / max,
    z: diff.z / max,
  });
};

Board.cubeDirectionIndex = (an1, an2) => {
  const direction = Board.cubeDirection(an1, an2);
  const filterFunction = (i) =>
    R.equals(direction, HexBoardUtilities.cubeDirection(i));
  const indices = R.filter(filterFunction, [0, 1, 2, 3, 4, 5]);

  return indices.length > 0 ? indices[0] : 0;
};

Board.distance = (an1, an2) => {
  const q1 = Board.coordinateCalculator.anToFile(an1);
  const r1 = Board.coordinateCalculator.anToRank(an1);
  const hex1 = { q: q1, r: r1 };
  const q2 = Board.coordinateCalculator.anToFile(an2);
  const r2 = Board.coordinateCalculator.anToRank(an2);
  const hex2 = { q: q2, r: r2 };

  return HexBoardUtilities.hexDistance(hex1, hex2);
};

Board.neighborInDirection = (an, directionIndex) => {
  const q = Board.coordinateCalculator.anToFile(an);
  const r = Board.coordinateCalculator.anToRank(an);
  const cube = HexBoardUtilities.axialToCube({ q, r });
  const direction = HexBoardUtilities.cubeDirection(directionIndex);

  const cube2 = HexBoardUtilities.createCube({
    x: cube.x + direction.x,
    y: cube.y + direction.y,
    z: cube.z + direction.z,
  });
  const hex2 = HexBoardUtilities.cubeToAxial(cube2);

  return Board.coordinateCalculator.fileRankToAN(hex2.q, hex2.r);
};

const indexToArc = {
  0: Arc.FORWARD,
  1: Arc.LEFT,
  2: Arc.LEFT,
  3: Arc.REAR,
  4: Arc.RIGHT,
  5: Arc.RIGHT,
};

Board.relativeArc = (an1, heading, an2) => {
  const bearingIndex = Heading.keys().indexOf(heading.key);
  const relativeIndex = Board.cubeDirectionIndex(an1, an2);
  let index = relativeIndex - bearingIndex;

  while (index < 0) {
    index += 6;
  }

  return indexToArc[index];
};

Object.freeze(Board);

export default Board;
