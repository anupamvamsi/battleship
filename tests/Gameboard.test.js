const { Gameboard } = require('../src/Gameboard');

let gb;
beforeEach(() => {
  gb = Gameboard();
});

test('Gameboard is created', () => {
  expect(gb).toHaveProperty('size');
  expect(gb.size).toBe(8);
  expect(gb.squares).toHaveLength(64);
});

test('Place ship at specific coordinates', () => {
  gb.placeShip(4, 6);
  expect(gb.coords[0]).toEqual([
    [4, 6],
    [6, 6],
  ]);
});

test('Place ship at invalid coordinates', () => {
  gb.placeShip(7, 5);
  expect(gb.coords[0]).toEqual(['Invalid']);
});

test('Place a ship with specific length and orientation', () => {
  gb.placeShip(3, 4, 4, true); // Y-axis
  expect(gb.coords[0]).toEqual([
    [3, 4],
    [3, 7],
  ]);
});
