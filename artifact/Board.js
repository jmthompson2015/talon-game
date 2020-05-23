const { BoardCalculator, CoordinateCalculator } = ReactGameBoard;

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

Object.freeze(Board);

export default Board;
