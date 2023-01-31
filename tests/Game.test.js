const { Game } = require('../src/Game');

let game = Game();

describe('Game loop', () => {
  beforeEach(() => {
    game = Game();

    game.manualSetup();
  });

  test('Setup game', () => {
    expect(game.p1.enemy).toBe(game.p2);
    expect(game.p2.enemy).toBe(game.p1);

    expect(game.prevTurn).toBe(game.p2);
    expect(game.currTurn).toBe(game.p1);
  });

  test('Player 1 loses / Player 2 (computer) wins', () => {
    expect(game.p1.gameboard.receiveAttack(1, 1)).toBe(true);
    expect(game.p1.gameboard.receiveAttack(1, 2)).toBe(true);

    expect(game.p1.gameboard.receiveAttack(4, 5)).toBe(true);
    expect(game.p1.gameboard.receiveAttack(5, 5)).toBe(true);

    expect(game.p1.gameboard.receiveAttack(4, 1)).toBe(true);
    expect(game.p1.gameboard.receiveAttack(5, 1)).toBe(true);
    expect(game.p1.gameboard.receiveAttack(6, 1)).toBe(true);

    expect(game.p1.gameboard.receiveAttack(2, 3)).toBe(true);
    expect(game.p1.gameboard.receiveAttack(2, 4)).toBe(true);
    expect(game.p1.gameboard.receiveAttack(2, 5)).toBe(true);
    expect(game.p1.gameboard.receiveAttack(2, 6)).toBe(true);
    expect(game.p1.gameboard.receiveAttack(2, 7)).toBe(true);

    expect(game.loop()).toBe(false);
  });

  test('Player 1 wins / Player 2 (computer) loses', () => {
    expect(game.p2.gameboard.receiveAttack(3, 2)).toBe(true);
    expect(game.p2.gameboard.receiveAttack(4, 2)).toBe(true);

    expect(game.p2.gameboard.receiveAttack(6, 3)).toBe(true);
    expect(game.p2.gameboard.receiveAttack(6, 4)).toBe(true);

    expect(game.p2.gameboard.receiveAttack(0, 3)).toBe(true);
    expect(game.p2.gameboard.receiveAttack(0, 4)).toBe(true);
    expect(game.p2.gameboard.receiveAttack(0, 5)).toBe(true);

    expect(game.p2.gameboard.receiveAttack(2, 6)).toBe(true);
    expect(game.p2.gameboard.receiveAttack(3, 6)).toBe(true);
    expect(game.p2.gameboard.receiveAttack(4, 6)).toBe(true);
    expect(game.p2.gameboard.receiveAttack(5, 6)).toBe(true);
    expect(game.p2.gameboard.receiveAttack(6, 6)).toBe(true);

    expect(game.loop()).toBe(true);
  });

  test('No one wins', () => {
    expect(game.loop()).toBe(null);
  });
});
