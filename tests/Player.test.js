const { Player } = require('../src/Player');
const { Ship } = require('../src/Ship');

describe('Player tests', () => {
  let player1;
  let player2;
  let s1L3; // doesn't need to be a player-specific ship

  beforeEach(() => {
    player1 = Player();
    player2 = Player();

    player1.enemy = player2;
    player2.enemy = player1;

    s1L3 = Ship(3);
  });

  test('Players are created', () => {
    expect(player1.gameboard.size).toBe(8);
    expect(player2.gameboard.size).toBe(8);
  });

  test("Player's are each other's enemies", () => {
    expect(player1.enemy).toEqual(player2);
    expect(player2.enemy).toEqual(player1);
  });

  test("Attack enemy player's gameboard", () => {
    expect(player2.gameboard.placeShip(s1L3, 3, 2)).toBe(true);
    expect(player1.gameboard.placeShip(s1L3, 4, 5, true)).toBe(true);

    expect(player1.enemy.gameboard.receiveAttack(4, 2)).toBe(true);

    expect(player2.enemy.gameboard.receiveAttack(5, 7)).toBe(false); // miss
    expect(player2.enemy.gameboard.receiveAttack(4, 7)).toBe(true);
  });
});
