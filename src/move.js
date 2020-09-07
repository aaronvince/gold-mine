import Position from './position.js';

let movedRight;

// Previous Moves
//        ↗  x2, y0 = -1
// x1, y1 => x2, y1 = 0
//        ↘  x2, y2 = 1

let previousMove = undefined;
console.log(`previousMove is ${previousMove}`);

/**
 * Replace the logic in this function with your own custom movement algorithm.
 *
 * This function should run in a reasonable amount of time and should attempt
 * to collect as much gold as possible.
 *
 * Remember, landing outside the mine's boundary or on a "0" on the mine will
 * result in the run completing.
 *
 * @param  {array} mine - A n x m multidimensional array respresenting the mine.
 * @param  {object} position - The current position of the miner, will be undefined on the first move
 *
 * @return {Position} The new position of the miner.
 */
const move = (mine, position) => {
  // TODO: write logic for miner. The current approach naive approach is to simply:
  //   1. Start at highest row
  //   2. Looks right, top-right, and bottom-right, chooses the highest value if not outside of array or repeating the same move

  console.log(`position is ${position}`);

  const findHighestStartRow = () =>
    mine.reduce(
      (highestStartingValue, mineRow) =>
        mineRow[0] > mine[highestStartingValue][0]
          ? mine.indexOf(mineRow)
          : highestStartingValue,
      0,
    );

  const newX = (position && position.x + 1) || 0;
  console.log(`newX is ${newX}`);

  const findBestNewYPosition = () => {
    if (!position) return undefined;

    console.log(`previousMove is ${previousMove} here`);

    if (previousMove === undefined) {
      const upValue = position.y !== 0 ? mine[position.y - 1][newX] : 0;
      console.log(`upValue is ${upValue}`);

      const rightValue = mine[position.y][newX];
      console.log(`rightValue is ${rightValue}`);

      const downValue =
        position.y !== mine.count - 1 ? mine[position.y + 1][newX] : 0;
      console.log(`downValue is ${downValue}`);

      const maxValue = Math.max(upValue, rightValue, downValue);
      console.log(`maxValue is ${maxValue}`);
      const startRow = findHighestStartRow();

      if (maxValue === upValue) {
        previousMove = -1;
      }
      if (maxValue === rightValue) {
        previousMove = 0;
      }
      if (maxValue === downValue) {
        previousMove = 1;
      }

      return maxValue === upValue
        ? startRow - 1
        : maxValue === rightValue
        ? startRow
        : startRow + 1;
    }

    const upValue =
      previousMove !== -1 || position.y !== 0 ? mine[position.y - 1][newX] : 0;
    const rightValue = previousMove !== 0 ? mine[position.y][newX] : 0;
    const downValue =
      previousMove !== 1 || position.y !== mine.count - 1
        ? mine[position.y + 1][newX]
        : 0;

    const maxValue = Math.max(upValue, rightValue, downValue);

    if (maxValue === upValue) {
      previousMove = -1;
    }
    if (maxValue === rightValue) {
      previousMove = 0;
    }
    if (maxValue === downValue) {
      previousMove = 1;
    }

    previousMove = maxValue === upValue ? -1 : maxValue === rightValue ? 0 : 1;

    return maxValue === upValue
      ? position.y - 1
      : maxValue === rightValue
      ? position.y
      : position.y + 1;
  };

  let newY;

  if (position) {
    if (previousMove === undefined) {
      const upValue = position.y !== 0 ? mine[position.y - 1][newX] : 0;
      console.log(`upValue is ${upValue}`);

      const rightValue = mine[position.y][newX];
      console.log(`rightValue is ${rightValue}`);

      const downValue =
        position.y !== mine.count - 1 ? mine[position.y + 1][newX] : 0;
      console.log(`downValue is ${downValue}`);

      const maxValue = Math.max(upValue, rightValue, downValue);
      console.log(`maxValue is ${maxValue}`);
      const startRow = findHighestStartRow();

      // if (maxValue === upValue) {
      //   previousMove = -1;
      //   console.log('upValue');
      // }
      // if (maxValue === rightValue) {
      //   previousMove = 0;
      //   console.log('rightValue');
      // }
      // if (maxValue === downValue) {
      //   previousMove = 1;
      //   console.log('downValue');
      // }

      previousMove =
        maxValue === upValue ? -1 : maxValue === rightValue ? 0 : 1;

      console.log(`previousMove is ${previousMove} here`);

      newY =
        maxValue === upValue
          ? startRow - 1
          : maxValue === rightValue
          ? startRow
          : startRow + 1;
    } else {
      const upValue =
        previousMove !== -1 && position.y !== 0
          ? mine[position.y - 1][newX]
          : 0;
      const rightValue = previousMove !== 0 ? mine[position.y][newX] : 0;
      const downValue =
        previousMove !== 1 && position.y !== mine.count - 1
          ? mine[position.y + 1][newX]
          : 0;

      const maxValue = Math.max(upValue, rightValue, downValue);

      // if (maxValue === upValue) {
      //   previousMove = -1;
      //   console.log('upValue');
      // }
      // if (maxValue === rightValue) {
      //   previousMove = 0;
      //   console.log('rightValue');
      // }
      // if (maxValue === downValue) {
      //   previousMove = 1;
      //   console.log('downValue');
      // }

      previousMove =
        maxValue === upValue ? -1 : maxValue === rightValue ? 0 : 1;

      newY =
        maxValue === upValue
          ? position.y - 1
          : maxValue === rightValue
          ? position.y
          : position.y + 1;
    }
  } else {
    newY = findHighestStartRow();
  }

  // const newY = position
  //   ? findBestNewYPosition(previousMove)
  //   : findHighestStartRow();

  console.log(newX, newY);

  // if (!movedRight) {
  //   newY = (position && position.y) || 0;

  //   movedRight = true;
  // } else {
  //   newY = (position && position.y + 1) || 0;

  //   movedRight = false;
  // }

  return new Position(newX, newY);
};

export default move;
