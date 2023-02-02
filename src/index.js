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
  const _determineGB = (num) => {
    if (num === 1) {
      return _gbP1;
    }
    return _gbP2;
  };

  const _gbP1dom = _getGBpX(1);
  const _gbP2dom = _getGBpX(2);

  const _receiveAttackDOM = (e) => {
    const _clickedSquare = e.target;
    const _boardOfClickedSquare = _clickedSquare.parentNode;
    const _allSquaresArray = Array.from(_clickedSquare.parentNode.children);
    const _idxOfClickedSquare = _allSquaresArray.indexOf(_clickedSquare);
    const _yCoord = Math.floor(_idxOfClickedSquare / _size);
    const _xCoord = _idxOfClickedSquare % _size;

    console.log(
      _clickedSquare,
      _allSquaresArray,
      _idxOfClickedSquare,
      '(',
      _xCoord,
      _yCoord,
      ')'
    );

    const _boardID = Number(_boardOfClickedSquare.dataset.boardId);
    const _gbOfClickedSquare = _determineGB(_boardID);

    const _isHit = _gbOfClickedSquare.receiveAttack(_xCoord, _yCoord);
    console.log(
      _gbOfClickedSquare.attacksTracker[_idxOfClickedSquare],
      _gbOfClickedSquare.missedAttacksTracker
    );
    console.log(_gbOfClickedSquare.ships);

    if (_isHit) {
      _clickedSquare.textContent = '✖';
      _clickedSquare.classList.add('hit');
    } else {
      _clickedSquare.textContent = '•';
      _clickedSquare.classList.add('clicked');
    }

    _clickedSquare.removeEventListener('click', _receiveAttackDOM);
  };

  const _createSquare = (boardNum) => {
    const _square = document.createElement('div');
    _square.classList.add('gb-square');

    // you can remove the boardNum condition and add the
    // event listener for all squares instead of only board2 (computer)
    if (boardNum === 2) {
      _square.addEventListener('click', _receiveAttackDOM);
    }

    return _square;
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
