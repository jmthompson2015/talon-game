import ArrayUtils from "../util/ArrayUtilities.js";

const RandomPlayerStrategy = {};

const DELAY = 1000;

RandomPlayerStrategy.delayedResolve = (choice, resolve, delay = DELAY) => {
  if (delay <= 0) {
    resolve(choice);
  } else {
    setTimeout(() => {
      resolve(choice);
    }, delay);
  }
};

RandomPlayerStrategy.chooseMoveOption = (options, state, delay = DELAY) =>
  new Promise((resolve) => {
    const answer =
      options.length <= 1 ? options[0] : ArrayUtils.randomElement(options);
    RandomPlayerStrategy.delayedResolve(answer, resolve, delay);
  });

RandomPlayerStrategy.choosePowerOption = (options, state, delay = DELAY) =>
  new Promise((resolve) => {
    const answer =
      options.length <= 1 ? options[0] : ArrayUtils.randomElement(options);
    RandomPlayerStrategy.delayedResolve(answer, resolve, delay);
  });

RandomPlayerStrategy.chooseWeaponOption = (options, state, delay = DELAY) =>
  new Promise((resolve) => {
    const answer =
      options.length <= 1 ? options[0] : ArrayUtils.randomElement(options);
    RandomPlayerStrategy.delayedResolve(answer, resolve, delay);
  });

Object.freeze(RandomPlayerStrategy);

export default RandomPlayerStrategy;
