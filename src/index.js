require('../styles/index.css');
require('../styles/gameboard.css');

const { Game } = require('./Game');

const GameDOM = () => {
  /// /////////////////////////////////////////////////////////////////////////
  // DOM-Members //////////////////////////////////////////////////////////////
  /// /////////////////////////////////////////////////////////////////////////

  const _game = Game();
  const _gbP1 = _game.p1.gameboard;
  const _shipsP1 = _gbP1.ships;
  const _gbP2 = _game.p2.gameboard;
  const _shipsP2 = _gbP2.ships;
  const _size = _gbP1.size;

  const setupShips = () => {
    _game.manualSetup();
  };

  /// /////////////////////////////////////////////////////////////////////////
  // DOM-Methods //////////////////////////////////////////////////////////////
  /// /////////////////////////////////////////////////////////////////////////

  const _getGBpX = (num) => document.getElementById(`p${num}-gb`);

  const _gbP1dom = _getGBpX(1);
  const _gbP2dom = _getGBpX(2);

  const _receiveAttackDOM = (e) => {
    const clickedSquare = e.target;
    const allSquaresArray = Array.from(clickedSquare.parentNode.children);
    const idxOfClickedSquare = allSquaresArray.indexOf(clickedSquare);
    const yCoord = Math.floor(idxOfClickedSquare / _size);
    const xCoord = idxOfClickedSquare % _size;

    console.log(
      clickedSquare,
      allSquaresArray,
      idxOfClickedSquare,
      '(',
      xCoord,
      yCoord,
      ')'
    );

    if (_gbP2dom === clickedSquare.parentNode) {
      console.log('p2');
      const isHit = _gbP2.receiveAttack(xCoord, yCoord);
      console.log(
        _gbP2.attacksTracker[idxOfClickedSquare],
        _gbP2.missedAttacksTracker
      );
      console.log(_shipsP2);

      if (isHit) {
        clickedSquare.textContent = '✖';
        clickedSquare.classList.add('hit');
      } else {
        clickedSquare.textContent = '•';
        clickedSquare.classList.add('clicked');
      }

      clickedSquare.removeEventListener('click', _receiveAttackDOM);
    }

    // for the situation of two-player mode being
    // enabled in the future
    if (_gbP1dom === clickedSquare.parentNode) {
      console.log('p1');
    }
  };

  const _createSquare = (boardNum) => {
    const square = document.createElement('div');
    square.classList.add('gb-square');

    // you can remove the boardNum condition and add the
    // event listener for all squares instead of only board2 (computer)
    if (boardNum === 2) {
      square.addEventListener('click', _receiveAttackDOM);
    }

    return square;
  };

  /// /////////////////////////////////////////////////////////////////////////
  // DOM-Method users /////////////////////////////////////////////////////////
  /// /////////////////////////////////////////////////////////////////////////

  const renderGameboards = () => {
    console.log(_size, _shipsP1, _size, _shipsP2);

    for (let i = 0; i < _size * _size; i += 1) {
      _gbP1dom.appendChild(_createSquare(1));
      _gbP2dom.appendChild(_createSquare(2));
    }
  };

  return {
    setupShips,
    renderGameboards,
  };
};

module.exports = { GameDOM };
const gameDOM = GameDOM();
gameDOM.setupShips();
gameDOM.renderGameboards();
