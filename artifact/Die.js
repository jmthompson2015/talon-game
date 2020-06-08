const Die = {};

Die.ROLL_TO_UNICODE = Immutable({
  1: "\u2680",
  2: "\u2681",
  3: "\u2682",
  4: "\u2683",
  5: "\u2684",
  6: "\u2685",
});

Die.roll = (max = 6) => Math.floor(Math.random() * max) + 1;

Object.freeze(Die);

export default Die;
