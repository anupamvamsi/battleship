const { Player } = require('../src/Player');

let player1;
let player2;

beforeEach(() => {
  player1 = Player();
  player2 = Player();
});

test('Players are created', () => {
  expect(player1.gameboard.size).toBe(8);
  expect(player2.gameboard.size).toBe(8);
});

test("Player's are each other's enemies", () => {
  player1.enemy = player2;
  player2.enemy = player1;

  expect(player1.enemy).toEqual(player2);
  expect(player2.enemy).toEqual(player1);
});
