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
  });
});
