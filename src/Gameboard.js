const { Ship } = require('./Ship');

const Gameboard = () => {
  // to check validity when trying to place a new Ship instance
  let _placedShips1DIndices = [];

  const SIZE = 8; // 8x8 = 64
  const ships = []; // array of placed Ship instances
  const coordsOfPlacedShips = [];
  const placedShipsTracker = []; // 1D array of gameboard
  const attacksTracker = []; // 1D array of gameboard

  const _setArrayFalse = (array) => {
    for (let i = 0; i < SIZE * SIZE; i += 1) {
      array.push(false);
    }
  };
  _setArrayFalse(placedShipsTracker); // _setShipsTrackerFalse():
  _setArrayFalse(attacksTracker); // _setAttacksTrackerFalse();

  const _emptyPlace = (oneDArrayIdx) => {
    if (_placedShips1DIndices.indexOf(oneDArrayIdx) === -1) {
      return true;
    }
    return false;
  };

  const _validGBSquare = (x, y) => {
    // console.log(`x: ${x}, y: ${y}`);
    if (x >= 0 && x < SIZE && y >= 0 && y < SIZE) {
      return true;
    }
    return false;
  };

  const placeShip = (startX, startY, length = 3, orientation = false) => {
    const _ship = Ship(length);

    // if orientation = false => X axis || else Y axis.
    const _endX = orientation ? startX : startX + _ship.length - 1;
    const _endY = orientation ? startY + _ship.length - 1 : startY;

    const _init = orientation ? startY : startX;
    const _limit = orientation ? _endY : _endX;
    let _validCoords = true;

    const _tmpPlacedShipsTracker = [];

    if (!_validGBSquare(startX, startY) || !_validGBSquare(_endX, _endY)) {
      _validCoords = false;
    } else {
      for (let i = 0; i < _limit - _init + 1; i += 1) {
        const _1DIdx = orientation
          ? startX + (startY + i) * SIZE
          : startX + i + startY * SIZE;

        if (_emptyPlace(_1DIdx)) {
          placedShipsTracker[_1DIdx] = true;
          _tmpPlacedShipsTracker.push(_1DIdx);
        } else {
          _validCoords = false;
          break;
        }
      }
    }

    if (_validCoords) {
      _placedShips1DIndices = _placedShips1DIndices.concat(
        _tmpPlacedShipsTracker
      );

      ships.push(_ship);

      coordsOfPlacedShips.push([
        [startX, startY],
        [_endX, _endY],
      ]);
    } else {
      coordsOfPlacedShips.push(['Invalid']);
    }
  };

  const receiveAttack = (x, y) => {
    attacksTracker[x + y * SIZE] = true;
  };

  return {
    get size() {
      return SIZE;
    },
    get ships() {
      return ships;
    },
    get coordsOfPlacedShips() {
      return coordsOfPlacedShips;
    },
    get placedShipsTracker() {
      return placedShipsTracker;
    },
    get attacksTracker() {
      return attacksTracker;
    },
    placeShip,
    receiveAttack,
  };
};

module.exports = { Gameboard };
