const Gameboard = () => {
  // to check validity when trying to place a new Ship instance
  let _placedShipsIdxs = [];

  const SIZE = 8; // 8x8 = 64
  const ships = []; // array of placed Ship instances

  // start / end coords in (x, y) format, of placed ships
  const coordsOfPlacedShips = [];
  // gameboard where only idxs of placed ships are 'true', rest are 'false'.
  const placedShipsTracker = [];
  // gameboard where only idxs of attacks with receiveAttack (successful or missed) are tracked.
  const attacksTracker = [];
  // only idxs of missed attacks with receiveAttack are stored.
  const missedAttacksTracker = [];

  const sunkShips = [];
  let allShipsSunk = false;

  let isPlayerTurn = false;
  let sunkShipPrevHit = false;

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

  // If ship is found (it implies it has already been placed
  // on the gameboard), return true
  const _alreadyPlacedShip = (shipToCheck) => {
    let shipFound = false;

    ships.forEach((s) => {
      if (s.ship === shipToCheck) {
        shipFound = true;
        return true;
      }
      return false;
    });

    return shipFound;
  };

  const placeShip = (ship, startX, startY, orientation = false) => {
    if (_alreadyPlacedShip(ship)) {
      return false; // same ship cannot be placed again
    }

    // If orientation === false => X axis || else Y axis.
    const _endX = orientation ? startX : startX + ship.length - 1;
    const _endY = orientation ? startY + ship.length - 1 : startY;

    const _validIdxsForUnplacedShips = [];

    if (!_validGBSquare(startX, startY) || !_validGBSquare(_endX, _endY)) {
      return false;
    }

    // DETERMINE IF INDICES ARE EMPTY OR FREE:
    // Based on the 2-D start / end coordinates above, determine
    // the list of (1-D) indices the ship would occupy in the
    // placedShipsTracker 1-D array of length <SIZE * SIZE>.
    for (let i = 0; i < ship.length; i += 1) {
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

    ships.push({ ship, pos: _validIdxsForUnplacedShips });

    coordsOfPlacedShips.push([
      [startX, startY],
      [_endX, _endY],
    ]);

    return true;
  };

  const searchForShipWithIdx = (idx) =>
    ships.filter((ship) => {
      if (ship.pos.indexOf(idx) !== -1) {
        return ship;
      }
      return false;
    });

  const receiveAttack = (x, y) => {
    const idx = x + y * SIZE;
    sunkShipPrevHit = false;

    // check for valid coord + whether or not it is already attacked
    if (_validGBSquare(x, y) && !attacksTracker[idx]) {
      attacksTracker[idx] = true;

      // check for ship placement at idx
      if (placedShipsTracker[idx]) {
        // find ship with the idx specified & send hit signal
        const retShip = searchForShipWithIdx(idx)[0].ship;
        // console.log('len (', x, ',', y, ')', retShip, retShip.length);

        if (retShip) {
          retShip.hit();

          if (retShip.isSunk()) {
            sunkShips.push(retShip);
            sunkShipPrevHit = true;

            if (sunkShips.length === ships.length) {
              allShipsSunk = true;
            }
          }
        } else {
          return false; // retShip was not found
        }

        // return retShip; // can be enabled and used with "// old tests"
        return true;
      }

      // no ship at (x, y), i.e., 'idx', so set as miss (default)
      missedAttacksTracker.push(idx);
      return false;
    }

    return false;
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
    get missedAttacksTracker() {
      return missedAttacksTracker;
    },
    get sunkShips() {
      return sunkShips;
    },
    get allShipsSunk() {
      return allShipsSunk;
    },
    get isPlayerTurn() {
      return isPlayerTurn;
    },
    set isPlayerTurn(turn) {
      isPlayerTurn = turn;
    },
    get sunkShipPrevHit() {
      return sunkShipPrevHit;
    },
    set sunkShipPrevHit(outcome) {
      sunkShipPrevHit = outcome;
    },
    placeShip,
    receiveAttack,
    searchForShipWithIdx,
  };
};

module.exports = { Gameboard };
