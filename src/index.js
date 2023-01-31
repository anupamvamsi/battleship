const { DOM } = require('./Dom');
const { Game } = require('./Game');

const GameDOM = () => {
  const _game = Game();
  const _dom = DOM();

  const setupShips = () => {
    _game.p1.gameboard.placeShip(_game.s1L2, 1, 1, true);
    _game.p1.gameboard.placeShip(_game.s2L2, 4, 5);
    _game.p1.gameboard.placeShip(_game.s3L3, 4, 1);
    _game.p1.gameboard.placeShip(_game.s4L5, 2, 3, true);

    _game.p2.gameboard.placeShip(_game.s1L2, 3, 2);
    _game.p2.gameboard.placeShip(_game.s2L2, 6, 3, true);
    _game.p2.gameboard.placeShip(_game.s3L3, 0, 3, true);
    _game.p2.gameboard.placeShip(_game.s4L5, 2, 6);
  };

  const renderGameboards = () => {
    const gbP1 = _game.p1.gameboard;
    const shipsP1 = gbP1.ships;

    const gbP2 = _game.p2.gameboard;
    const shipsP2 = gbP2.ships;

    const { size } = gbP1;

    console.log(size, shipsP1, size, shipsP2);

    const gbP1dom = _dom.getGBpX(1);
    const gbP2dom = _dom.getGBpX(2);
    // console.log(gbP1dom, gbP2dom);

    // console.log(gbP1dom.childElementCount, gbP2dom.childElementCount);

    for (let i = 0; i < size * size; i += 1) {
      gbP1dom.appendChild(_dom.createSquare());
      gbP2dom.appendChild(_dom.createSquare());
    }

    // console.log(gbP1dom.childElementCount, gbP2dom.childElementCount);
  };

  return {
    setupShips,
    renderGameboards,
  };
};

const gameDOM = GameDOM();
gameDOM.setupShips();
gameDOM.renderGameboards();
