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

  const _checkValidPlace = (oneDArrayIdx) => {
    if (_placedShips1DIndices.indexOf(oneDArrayIdx) === -1) {
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
    for (let i = 0; i < _limit - _init + 1; i += 1) {
      if (startX >= SIZE || startY >= SIZE || _endX >= SIZE || _endY >= SIZE) {
        _validCoords = false;
        break;
      }

      const _oneDIdx = orientation
        ? startX + (startY + i) * SIZE
        : startX + i + startY * SIZE;

      if (_checkValidPlace(_oneDIdx)) {
        placedShipsTracker[_oneDIdx] = true;
        _tmpPlacedShipsTracker.push(_oneDIdx);
      } else {
        _validCoords = false;
        break;
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

  return {
    get size() {
      return SIZE;
    },
    get coordsOfPlacedShips() {
      return coordsOfPlacedShips;
    },
    get placedShipsTracker() {
      return placedShipsTracker;
    },
    get ships() {
      return ships;
    },
    placeShip,
  };
};

module.exports = { Gameboard };
