const { Ship } = require('./Ship');

const Gameboard = () => {
  // to check validity when trying to place a new Ship instance
  let _placedShipsIdxs = [];

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

  const _emptyPlace = (_shipPos) => {
    if (_placedShipsIdxs.indexOf(_shipPos) === -1) {
      return true; // is empty
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

  const placeShip = (startX, startY, shipLength = 3, orientation = false) => {
    const _ship = Ship(shipLength);

    // If orientation === false => X axis || else Y axis.
    const _endX = orientation ? startX : startX + _ship.length - 1;
    const _endY = orientation ? startY + _ship.length - 1 : startY;

    const _validIdxsForUnplacedShips = [];

    if (!_validGBSquare(startX, startY) || !_validGBSquare(_endX, _endY)) {
      return false;
    }

    // DETERMINE IF INDICES ARE EMPTY OR FREE:
    // Based on the 2-D start / end coordinates above, determine
    // the list of (1-D) indices the ship would occupy in the
    // placedShipsTracker 1-D array of length <SIZE * SIZE>.
    for (let i = 0; i < shipLength; i += 1) {
      // Calculate the 1-D index based on the orientation
      const _shipIdx = orientation
        ? startX + (startY + i) * SIZE
        : startX + i + startY * SIZE;

      // Check if the 1-D index is occupied by a previously
      // placed ship
      if (_emptyPlace(_shipIdx)) {
        _validIdxsForUnplacedShips.push(_shipIdx);
      } else {
        return false; // ship cannot be placed
      }
    }

    _placedShipsIdxs = _placedShipsIdxs.concat(_validIdxsForUnplacedShips);

    // Set ship occupancy as true for valid idxs
    _validIdxsForUnplacedShips.forEach((idx) => {
      placedShipsTracker[idx] = true;
    });

    ships.push(_ship);

    coordsOfPlacedShips.push([
      [startX, startY],
      [_endX, _endY],
    ]);

    return true;
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
