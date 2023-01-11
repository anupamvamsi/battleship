const { Gameboard } = require('../src/Gameboard');

let gb;
beforeEach(() => {
  gb = Gameboard();
});

test('Gameboard is created', () => {
  expect(gb).toHaveProperty('size');
  expect(gb.size).toBe(8);
  expect(gb.placedShipsTracker).toHaveLength(64);
});

test('Place ship at specific coordinates', () => {
  gb.placeShip(4, 6);
  expect(gb.coordsOfPlacedShips[0]).toEqual([
    [4, 6],
    [6, 6],
  ]);
});

test('Place ship at invalid coordinates 1', () => {
  expect(gb.placeShip(7, 5)).toBe(false);
});

test('Place ship at invalid coordinates 2', () => {
  expect(gb.placeShip(1, -1)).toBe(false);
});

test('Place a ship with specific length and orientation', () => {
  gb.placeShip(3, 4, 4, true); // Y-axis
  expect(gb.coordsOfPlacedShips[0]).toEqual([
    [3, 4],
    [3, 7],
  ]);
});

test('Multiple placeShip calls', () => {
  gb.placeShip(4, 6);
  expect(gb.coordsOfPlacedShips[0]).toEqual([
    [4, 6],
    [6, 6],
  ]);
  expect(gb.placedShipsTracker[52]).toBe(true); // [4, 6]
  expect(gb.placedShipsTracker[53]).toBe(true); // [5, 6]
  expect(gb.placedShipsTracker[54]).toBe(true); // [6, 6]

  // gb.placeShip(7, 5);
  // expect(gb.coordsOfPlacedShips[1]).toEqual(['Invalid']);
  expect(gb.placeShip(7, 5)).toBe(false);
  expect(gb.placedShipsTracker[47]).toBe(false); // [7, 5]
  expect(gb.placedShipsTracker[48]).toBe(false); // [8, 5]
  expect(gb.placedShipsTracker[49]).toBe(false); // [9, 5]

  // gb.placeShip(5, 3, 5, true);
  expect(gb.placeShip(5, 3, 5, true)).toBe(false);
  // expect(gb.coordsOfPlacedShips[2]).toEqual([
  //   // [5, 3],
  //   // [5, 7],
  //   'Invalid',
  // ]);
  expect(gb.placedShipsTracker[29]).toBe(false); // [5, 3]
  expect(gb.placedShipsTracker[37]).toBe(false); // [5, 4]
  expect(gb.placedShipsTracker[45]).toBe(false); // [5, 5]
  expect(gb.placedShipsTracker[53]).toBe(true); // [5, 6] // breaks here
  expect(gb.placedShipsTracker[61]).toBe(false); // [5, 7] // doesnt reach here

  gb.placeShip(3, 4, 4, true); // Y-axis
  expect(gb.coordsOfPlacedShips[1]).toEqual([
    [3, 4],
    [3, 7],
  ]);
  expect(gb.placedShipsTracker[35]).toBe(true); // [3, 4]
  expect(gb.placedShipsTracker[43]).toBe(true); // [3, 5]
  expect(gb.placedShipsTracker[51]).toBe(true); // [3, 6]
  expect(gb.placedShipsTracker[59]).toBe(true); // [3, 7]
});

test('receiveAttack hits and sinks a ship', () => {
  gb.placeShip(4, 6); // ship1 (X-axis)
  gb.placeShip(3, 4, 4, true); // ship2 Y-axis

  // ship2
  expect(gb.receiveAttack(3, 6).numHits).toBe(1);
  expect(gb.receiveAttack(3, 7).numHits).toBe(2);
  expect(gb.receiveAttack(3, 5).isSunk()).toBe(false);
  expect(gb.receiveAttack(3, 4).numHits).toBe(4);

  // ship2 sunk
  expect(gb.receiveAttack(3, 5).isSunk()).toBe(true);
  expect(gb.receiveAttack(3, 7).numHits).toBe(4);
});

test('receiveAttack misses a ship', () => {
  gb.placeShip(4, 6); // ship1 (X-axis)
  gb.placeShip(3, 4, 4, true); // ship2 Y-axis

  expect(gb.receiveAttack(2, 6)).toBe(false);
  expect(gb.attacksTracker[2 + 6 * gb.size]).toBe(true);

  expect(gb.missedAttacksTracker[0]).toBe(2 + 6 * gb.size);
});

test('receiveAttack hits and sinks all ships', () => {
  gb.placeShip(4, 6); // ship1 (X-axis)
  gb.placeShip(3, 4, 4, true); // ship2 Y-axis

  expect(gb.allShipsSunk).toBe(false);

  // ship1
  expect(gb.receiveAttack(4, 6).numHits).toBe(1);
  expect(gb.receiveAttack(6, 6).isSunk()).toBe(false);
  expect(gb.receiveAttack(5, 6).numHits).toBe(3);

  expect(gb.allShipsSunk).toBe(false);

  // ship2
  expect(gb.receiveAttack(3, 6).numHits).toBe(1);
  expect(gb.receiveAttack(3, 7).numHits).toBe(2);
  expect(gb.receiveAttack(3, 5).isSunk()).toBe(false);
  expect(gb.receiveAttack(3, 4).numHits).toBe(4);

  expect(gb.allShipsSunk).toBe(true);
});
