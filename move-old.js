import Position from './position.js';

// let movedRight;

/**
 * Replace the logic in this function with your own custom movement algorithm.
 *
 * This function should run in a reasonable amount of time and should attempt
 * to collect as much gold as possible.
 *
 * Remember, landing outside the mine's boundary or on a "0" on the mine will
 * result in the run completing.
 *
 * @param  {array} mine - A n x m multidimensional array representing the mine.
 * @param  {object} position - The current position of the miner, will be undefined on the first move
 *
 * @return {Position} The new position of the miner.
 */
const move = (mine, position) => {
  // TODO: write logic for miner. The current approach naive approach is to simply:
  //   1. Start at (0,x) where x is the highest value (may not be the best way)
  //   2. Looks right, top-right, and bottom-right, chooses the highest value if not outside of array or repeating the same move

  const findHighestStartRow = () =>
    mine.reduce(
      (highestStartingValue, mineRow) =>
        mineRow[0] > mine[highestStartingValue][0]
          ? mine.indexOf(mineRow)
          : highestStartingValue,
      0,
    );
  // console.log(findHighestStartRow);

  const newX = (position && position.x + 1) || 0;

  // Previous Moves
  //        ↗  x2, y0 = -1
  // x1, y1 => x2, y1 = 0
  //        ↘  x2, y2 = 1

  let previousMove = undefined;

  const reducedRows = position
    ? mine.reduce(
        (reducedArray, mineRow) =>
          (mine.indexOf(mineRow) === position.y - 1 ||
            mine.indexOf(mineRow) === position.y ||
            mine.indexOf(mineRow) === position.y + 1) &&
          !(mine.indexOf(mineRow) === position.y + previousMove)
            ? reducedArray.concat(mineRow)
            : reducedArray,
        [],
      )
    : mine;

  const findNewY = () =>
    reducedRows.reduce(
      (bestY, row) =>
        row[newX] > mine[bestY][newX] ? mine.indexOf(row) : bestY,
      0,
    );

  const newY = position ? findNewY() : findHighestStartRow();

  console.log(`newY is ${newY}`);

  // const newY = position
  //   ? mine.reduce(
  //       (newY, mineRow) =>
  //         mine.indexOf(mineRow) === position.y - 1 ||
  //         mine.indexOf(mineRow) === position.y ||
  //         mine.indexOf(mineRow) === position.y + 1
  //           ? mineRow[newX] > mineRow[newY]
  //             ? mine.indexOf(mineRow)
  //             : newY
  //           : newY,
  //       0,
  //     )
  //   : findHighestStartRow;

  // console.log(newY);

  // let newY;

  // if (!movedRight) {
  //   newY = (position && position.y) || 0;

  //   movedRight = true;
  // } else {
  //   newY = (position && position.y + 1) || 0;

  //   movedRight = false;
  // }

  console.log(newX, newY);

  return new Position(newX, newY);
};

export default move;
