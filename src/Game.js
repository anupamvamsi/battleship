const { Player } = require('./Player');
const { Ship } = require('./Ship');

const Game = () => {
  const p1 = Player();
  const p2 = Player(); // computer

  p1.enemy = p2;
  p2.enemy = p1;

  // 12 squares out of 64 = 18.75%
  const s1L2 = Ship(2);
  const s2L2 = Ship(2);
  const s3L3 = Ship(3);
  const s4L5 = Ship(5);

  let prevTurn = p2;
  let currTurn = p1;

  const manualSetup = () => {
    p1.gameboard.placeShip(s1L2, 1, 1, true);
    p1.gameboard.placeShip(s2L2, 4, 5);
    p1.gameboard.placeShip(s3L3, 4, 1);
    p1.gameboard.placeShip(s4L5, 2, 3, true);

    p2.gameboard.placeShip(s1L2, 3, 2);
    p2.gameboard.placeShip(s2L2, 6, 3, true);
    p2.gameboard.placeShip(s3L3, 0, 3, true);
    p2.gameboard.placeShip(s4L5, 2, 6);
  };

  const loop = () => {
    // 128 is the total number of squares for both players
    for (let i = 0; i < 128; i += 1) {
      if (currTurn === p1) {
        // miss attack
        // currTurn.enemy.gameboard.receiveAttack(1, 1);

        // player won
        // p2.gameboard.receiveAttack(3, 2);
        // p2.gameboard.receiveAttack(4, 2);

        // p2.gameboard.receiveAttack(6, 3);
        // p2.gameboard.receiveAttack(6, 4);

        // p2.gameboard.receiveAttack(0, 3);
        // p2.gameboard.receiveAttack(0, 4);
        // p2.gameboard.receiveAttack(0, 5);

        // p2.gameboard.receiveAttack(2, 6);
        // p2.gameboard.receiveAttack(3, 6);
        // p2.gameboard.receiveAttack(4, 6);
        // p2.gameboard.receiveAttack(5, 6);
        // p2.gameboard.receiveAttack(6, 6);

        currTurn = p2;

        // console.log('enemy p1 down?', p1.gameboard.allShipsSunk);
        // console.log('enemy p2 down?', p2.gameboard.allShipsSunk);

        if (p2.gameboard.allShipsSunk) {
          break;
        }
      }

      // console.log('currTurn is p2', currTurn === p2);
      if (currTurn === p2) {
        // miss attack
        // currTurn.enemy.gameboard.receiveAttack(3, 4);

        // player lost
        // p1.gameboard.receiveAttack(1, 1);
        // p1.gameboard.receiveAttack(1, 2);

        // p1.gameboard.receiveAttack(4, 5);
        // p1.gameboard.receiveAttack(5, 5);

        // p1.gameboard.receiveAttack(4, 1);
        // p1.gameboard.receiveAttack(5, 1);
        // p1.gameboard.receiveAttack(6, 1);

        // p1.gameboard.receiveAttack(2, 3);
        // p1.gameboard.receiveAttack(2, 4);
        // p1.gameboard.receiveAttack(2, 5);
        // p1.gameboard.receiveAttack(2, 6);
        // p1.gameboard.receiveAttack(2, 7);

        currTurn = p1;

        if (p1.gameboard.allShipsSunk) {
          break;
        }

        // console.log('enemy p1 down?', p1.gameboard.allShipsSunk);
        // console.log('enemy p2 down?', p2.gameboard.allShipsSunk);
      }
    }

    if (p1.gameboard.allShipsSunk) {
      return false; // player lost
    }
    if (p2.gameboard.allShipsSunk) {
      return true; // player won
    }

    return null;
  };

  return {
    s1L2,
    s2L2,
    s3L3,
    s4L5,
    get p1() {
      return p1;
    },
    get p2() {
      return p2;
    },
    get prevTurn() {
      return prevTurn;
    },
    set prevTurn(player) {
      prevTurn = player;
    },
    get currTurn() {
      return currTurn;
    },
    set currTurn(player) {
      currTurn = player;
    },
    manualSetup,
    loop,
  };
};

module.exports = { Game };
