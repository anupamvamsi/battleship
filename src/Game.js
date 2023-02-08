const { Player } = require('./Player');
const { Ship } = require('./Ship');

const Game = () => {
  const GAME_START = true;
  const GAME_END = false;
  let gameState = GAME_START;
  let winMessage = '';

  const p1 = Player();
  const p2 = Player(); // computer

  p1.enemy = p2;
  p2.enemy = p1;

  // 12 squares out of 64 = 18.75%
  // pX = playerX, shipX sX (ship number), Lx = Length of ship X
  const p1s1L2 = Ship(2);
  const p1s2L2 = Ship(2);
  const p1s3L3 = Ship(3);
  const p1s4L5 = Ship(5);

  const p2s1L2 = Ship(2);
  const p2s2L2 = Ship(2);
  const p2s3L3 = Ship(3);
  const p2s4L5 = Ship(5);

  const manualSetup = () => {
    p1.gameboard.placeShip(p1s1L2, 1, 1, true);
    p1.gameboard.placeShip(p1s2L2, 4, 5);
    p1.gameboard.placeShip(p1s3L3, 4, 1);
    p1.gameboard.placeShip(p1s4L5, 2, 3, true);

    p2.gameboard.placeShip(p2s1L2, 3, 2);
    p2.gameboard.placeShip(p2s2L2, 6, 3, true);
    p2.gameboard.placeShip(p2s3L3, 0, 3, true);
    p2.gameboard.placeShip(p2s4L5, 2, 6);
  };

  return {
    GAME_START,
    GAME_END,

    get gameState() {
      return gameState;
    },
    set gameState(state) {
      gameState = state;
    },

    get winMessage() {
      return winMessage;
    },
    set winMessage(msg) {
      winMessage = msg;
    },

    p1s1L2,
    p1s2L2,
    p1s3L3,
    p1s4L5,

    p2s1L2,
    p2s2L2,
    p2s3L3,
    p2s4L5,

    get p1() {
      return p1;
    },
    get p2() {
      return p2;
    },
    manualSetup,
  };
};

module.exports = { Game };
