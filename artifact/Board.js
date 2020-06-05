const {
  BoardCalculator,
  CoordinateCalculator,
  HexBoardUtilities,
} = ReactGameBoard;

const Board = {};

Board.IS_SQUARE = false;
Board.IS_FLAT = false;

Board.FILE_COUNT = 16;
Board.RANK_COUNT = 12;

Board.boardCalculator = new BoardCalculator(Board.IS_SQUARE, Board.IS_FLAT);
Board.coordinateCalculator = new CoordinateCalculator(
  Board.FILE_COUNT,
  Board.RANK_COUNT
);

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

Object.freeze(Board);

export default Board;
