const { Ship } = require('../src/Ship');

let ship;
beforeEach(() => {
  ship = Ship(3);
});

test('Is the ship hit?', () => {
  ship.hit();

  expect(ship.length).toBe(3);
  expect(ship.numHits).toBe(1);
});
