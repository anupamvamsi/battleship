const { Ship } = require('../src/Ship');

describe('Ship tests', () => {
  let ship;

  beforeEach(() => {
    ship = Ship(3);
  });

  test('Check ship length', () => {
    // unnecessary test.
    expect(ship.length).toBe(3);
  });

  test('Did the ship sink?', () => {
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.isSunk()).toBe(true);

    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
