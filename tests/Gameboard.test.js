const { Gameboard } = require('../src/Gameboard');
const { Ship } = require('../src/Ship');

describe('Gameboard', () => {
  let gb;
  let s1L3;
  let s2L4;
  let s3L5;

  beforeEach(() => {
    gb = Gameboard();
    s1L3 = Ship(3);
    s2L4 = Ship(4);
    s3L5 = Ship(5);
  });

  test('Gameboard is created', () => {
    expect(gb).toHaveProperty('size');
    expect(gb.size).toBe(8);
    expect(gb.placedShipsTracker).toHaveLength(64);
  });

  test('Place ship at specific coordinates', () => {
    expect(gb.placeShip(s1L3, 4, 6)).toBe(true);
    expect(gb.coordsOfPlacedShips[0]).toEqual([
      [4, 6],
      [6, 6],
    ]);
  });

  test('Place ship at invalid coordinates 1', () => {
    expect(gb.placeShip(s1L3, 7, 5)).toBe(false);
  });

  test('Place ship at invalid coordinates 2', () => {
    expect(gb.placeShip(s1L3, 1, -1)).toBe(false);
  });

  test('Place a ship with specific length and orientation', () => {
    expect(gb.placeShip(s2L4, 3, 4, true)).toBe(true); // Y-axis
    expect(gb.coordsOfPlacedShips[0]).toEqual([
      [3, 4],
      [3, 7],
    ]);

    // Invalid cooordinates
    expect(gb.placeShip(s1L3, 2, 7, true)).toBe(false); // Y-axis
  });

  test('Multiple placeShip calls', () => {
    // TEST-P1
    expect(gb.placeShip(s1L3, 4, 6)).toBe(true); // X: [4, 6] to [6, 6]
    expect(gb.coordsOfPlacedShips[0]).toEqual([
      [4, 6],
      [6, 6],
    ]);
    /* TESTS FOR ROBUSTNESS -- ENABLE IF YOU WANT.
    // expect(gb.placedShipsTracker[52]).toBe(true); // [4, 6]
    // expect(gb.placedShipsTracker[53]).toBe(true); // [5, 6]
    // expect(gb.placedShipsTracker[54]).toBe(true); // [6, 6]
    */

    // TEST-P2 : false since s1L3 is already placed as above.
    // (Move function to be implemented for ships already placed : 23-Jan-2023)
    expect(gb.placeShip(s1L3, 2, 1)).toBe(false); // X: [2, 1] to [4, 1]
    /* TESTS FOR ROBUSTNESS -- ENABLE IF YOU WANT.
    // expect(gb.placedShipsTracker[10]).toBe(false); // [2, 1]
    // expect(gb.placedShipsTracker[11]).toBe(false); // [3, 1]
    // expect(gb.placedShipsTracker[12]).toBe(false); // [4, 1]
    */

    // TEST-P3 : false since the placement goes out of bounds (invalid coords).
    expect(gb.placeShip(s1L3, 7, 5)).toBe(false); // X: [2, 1] to [4, 1]
    /* TESTS FOR ROBUSTNESS -- ENABLE IF YOU WANT.
    // expect(gb.placedShipsTracker[47]).toBe(false); // [7, 5]
    // expect(gb.placedShipsTracker[48]).toBe(false); // [8, 5]
    // expect(gb.placedShipsTracker[49]).toBe(false); // [9, 5]
    */

    // TEST-P4
    expect(gb.placeShip(s2L4, 3, 4, true)).toBe(true); // Y: [3, 4] to [3, 7]
    expect(gb.coordsOfPlacedShips[1]).toEqual([
      [3, 4],
      [3, 7],
    ]);
    /* TESTS FOR ROBUSTNESS -- ENABLE IF YOU WANT.
    // expect(gb.placedShipsTracker[35]).toBe(true); // [3, 4]
    // expect(gb.placedShipsTracker[43]).toBe(true); // [3, 5]
    // expect(gb.placedShipsTracker[51]).toBe(true); // [3, 6]
    // expect(gb.placedShipsTracker[59]).toBe(true); // [3, 7]
    */

    // TEST-P5 : false because s3L5 ship overlaps with s1L3 (invalid cooords).
    expect(gb.placeShip(s3L5, 5, 3, true)).toBe(false); // X: [5, 3] to [5, 7]
    /* TESTS FOR ROBUSTNESS -- ENABLE IF YOU WANT.
    // expect(gb.placedShipsTracker[29]).toBe(false); // [5, 3]
    // expect(gb.placedShipsTracker[37]).toBe(false); // [5, 4]
    // expect(gb.placedShipsTracker[45]).toBe(false); // [5, 5]
    // expect(gb.placedShipsTracker[53]).toBe(true); // [5, 6]
    // expect(gb.placedShipsTracker[61]).toBe(false); // [5, 7]
    */
  });

  test('receiveAttack hits and sinks a ship', () => {
    // new tests
    expect(gb.placeShip(s1L3, 4, 6)).toBe(true); // ship1 (X-axis)
    expect(gb.placeShip(s2L4, 3, 4, true)).toBe(true); // ship2 (Y-axis)

    // ship2
    // no attack yet
    expect(gb.attacksTracker[35]).toBe(false); // (3, 4)

    // attack1 - (3, 6)
    expect(gb.receiveAttack(3, 6)).toBe(true);
    expect(gb.attacksTracker[51]).toBe(true);

    // attack2 - (3, 7)
    expect(gb.receiveAttack(3, 7)).toBe(true);
    expect(gb.attacksTracker[59]).toBe(true);

    // attack3 - (3, 5)
    expect(gb.receiveAttack(3, 5)).toBe(true);
    expect(gb.attacksTracker[43]).toBe(true);

    // attack4 - (fail) because (3, 5) is already attacked before
    expect(gb.receiveAttack(3, 5)).toBe(false);

    // attack4 - (success) ship2 sunk
    expect(gb.receiveAttack(3, 4)).toBe(true);
    expect(gb.attacksTracker[35]).toBe(true);

    // (3, 7) was already attacked before === the ship is already sunk
    expect(gb.receiveAttack(3, 7)).toBe(false);
    expect(gb.receiveAttack(3, 6)).toBe(false);
    expect(gb.receiveAttack(3, 5)).toBe(false);
    expect(gb.receiveAttack(3, 4)).toBe(false);

    /* old tests
    gb.placeShip(s1L3, 4, 6); // ship1 (X-axis)
    gb.placeShip(s2L4, 3, 4, true); // ship2 Y-axis

    // ship2
    expect(gb.receiveAttack(3, 6).numHits).toBe(1);
    expect(gb.receiveAttack(3, 7).numHits).toBe(2);
    expect(gb.receiveAttack(3, 5).isSunk()).toBe(false);
    expect(gb.receiveAttack(3, 4).numHits).toBe(4);

    // ship2 sunk
    expect(gb.receiveAttack(3, 5).isSunk()).toBe(true);
    expect(gb.receiveAttack(3, 7).numHits).toBe(4);
    */
  });

  test('receiveAttack misses a ship', () => {
    expect(gb.placeShip(s1L3, 4, 6)).toBe(true); // ship2 (X-axis)
    expect(gb.placeShip(s2L4, 3, 4, true)).toBe(true); // ship2 (Y-axis)

    expect(gb.receiveAttack(2, 6)).toBe(false);
    expect(gb.attacksTracker[2 + 6 * gb.size]).toBe(true);

    expect(gb.missedAttacksTracker[0]).toBe(2 + 6 * gb.size);
  });

  test('receiveAttack hits and sinks all ships', () => {
    expect(gb.placeShip(s1L3, 4, 6)).toBe(true); // ship2 (X-axis)
    expect(gb.placeShip(s2L4, 3, 4, true)).toBe(true); // ship2 (Y-axis)

    expect(gb.allShipsSunk).toBe(false);

    // new tests
    // ship1
    expect(gb.receiveAttack(4, 6)).toBe(true);
    expect(gb.receiveAttack(5, 6)).toBe(true);
    expect(gb.receiveAttack(6, 6)).toBe(true);

    // one ship sunk
    expect(gb.sunkShips[0]).toBe(s1L3);
    expect(gb.allShipsSunk).toBe(false);

    // ship2
    expect(gb.receiveAttack(3, 6)).toBe(true);
    expect(gb.receiveAttack(3, 7)).toBe(true);
    expect(gb.receiveAttack(3, 5)).toBe(true);
    expect(gb.receiveAttack(3, 4)).toBe(true);

    // two ships, i.e., all ships sunk
    expect(gb.sunkShips[1]).toBe(s2L4);
    expect(gb.allShipsSunk).toBe(true);

    /* old tests
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
    */
  });
});
