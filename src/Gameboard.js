const { Ship } = require('./Ship');

const Gameboard = () => {
  const SIZE = 8; // 8x8 = 64
  const coords = [];
  const squares = [];

  // _setSquaresEmpty()
  (() => {
    for (let i = 0; i < SIZE * SIZE; i += 1) {
      squares.push(false);
    }
  })();
  let _squaresIndices = []; // 1D array of gameboard

  const _checkValidPlace = (oneDArrayIdx) => {
    if (_squaresIndices.indexOf(oneDArrayIdx) === -1) {
      return true;
    }
    return false;
  };

  const placeShip = (startX, startY, length = 3, orientation = false) => {
    const ship = Ship(length);

    // if orientation = false => X axis || else Y axis.
    const endX = orientation ? startX : startX + ship.length - 1;
    const endY = orientation ? startY + ship.length - 1 : startY;

    const init = orientation ? startY : startX;
    const limit = orientation ? endY : endX;
    let valid = true;

    const _tmpSquaresIndices = [];
    for (let i = 0; i < limit - init + 1; i += 1) {
      if (startX >= SIZE || startY >= SIZE || endX >= SIZE || endY >= SIZE) {
        valid = false;
        break;
      }

      const oneDIdx = orientation
        ? startX + (startY + i) * SIZE
        : startX + i + startY * SIZE;

      if (_checkValidPlace(oneDIdx)) {
        squares[oneDIdx] = true;
        _tmpSquaresIndices.push(oneDIdx);
      } else {
        valid = false;
        break;
      }

      // console.log(startX, startY, oneDIdx);
    }
    // console.log(squares, _tmpSquaresIndices);

    if (valid) {
      _squaresIndices = _squaresIndices.concat(_tmpSquaresIndices);

      coords.push([
        [startX, startY],
        [endX, endY],
      ]);
      // console.log('final:1', _squaresIndices);
    } else {
      coords.push(['Invalid']);
      // console.log('final:2', _squaresIndices);
    }
  };

  return {
    get size() {
      return SIZE;
    },
    get coords() {
      return coords;
    },
    get squares() {
      return squares;
    },
    placeShip,
  };
};

module.exports = { Gameboard };
