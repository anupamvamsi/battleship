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
  gb.placeShip(7, 5);
  expect(gb.coordsOfPlacedShips[0]).toEqual(['Invalid']);
});

test('Place ship at invalid coordinates 2', () => {
  gb.placeShip(1, -1);
  expect(gb.coordsOfPlacedShips[0]).toEqual(['Invalid']);
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

  gb.placeShip(7, 5);
  expect(gb.coordsOfPlacedShips[1]).toEqual(['Invalid']);

  gb.placeShip(3, 4, 4, true); // Y-axis
  expect(gb.coordsOfPlacedShips[2]).toEqual([
    [3, 4],
    [3, 7],
  ]);
});

test('Does receiveAttack hit a ship?', () => {
  gb.receiveAttack(2, 3);
  expect(gb.attacksTracker[2 + 3 * gb.size]).toBe(true);
});
