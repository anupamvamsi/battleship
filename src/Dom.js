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

  _gbP1.isPlayerTurn = true;
  _gbP2.isPlayerTurn = false;

  document.getElementById('p1-gb').style.pointerEvents = 'none';
  document.getElementById('p2-gb').style.pointerEvents = 'auto';

  const setupShips = () => {
    _game.manualSetup();
  };

  /// /////////////////////////////////////////////////////////////////////////
  // DOM-Methods //////////////////////////////////////////////////////////////
  /// /////////////////////////////////////////////////////////////////////////

  const getGBpX = (num, doc = document) => doc.getElementById(`p${num}-gb`);
  const _determineGB = (num) => {
    if (num === 1) {
      return _gbP1;
    }
    return _gbP2;
  };

  const _gbP1dom = getGBpX(1);
  const _gbP2dom = getGBpX(2);

  let _turnDeterminer = null; // this is to prevent no-use-before-define "error"

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

    const isHit = _gbOfClickedSquare.receiveAttack(_xCoord, _yCoord);
    console.log(
      _gbOfClickedSquare.attacksTracker[_idxOfClickedSquare],
      _gbOfClickedSquare.missedAttacksTracker
    );
    console.log(_gbOfClickedSquare.ships);

    if (isHit) {
      _clickedSquare.textContent = '✖';
      _clickedSquare.classList.add('hit');
    } else {
      _clickedSquare.textContent = '•';
      _clickedSquare.classList.add('clicked');
    }

    // Remove event listener on already clicked squares to prevent
    // changes in the textContent from crosses to dots or any such
    // unwanted changes
    _clickedSquare.removeEventListener('click', _turnDeterminer);

    return isHit;
  };

  _turnDeterminer = (e) => {
    if (_game.gameState === _game.GAME_START) {
      if (_gbP1.isPlayerTurn) {
        const hit = _receiveAttackDOM(e);

        if (hit && _gbP2.allShipsSunk) {
          // gameWon
          console.log('p1 won! you won!');
          _game.gameState = _game.GAME_END;
          _game.winMessage = 'Player 1 wins the game!';
        }

        // if there is a hit on a ship, give extra turns to the player
        if (!hit) {
          _gbP1.isPlayerTurn = false;
          _gbP2.isPlayerTurn = true;
          document.getElementById('p2-gb').style.pointerEvents = 'none';
          document.getElementById('p1-gb').style.pointerEvents = 'auto';
        }
      } else if (_gbP2.isPlayerTurn) {
        const hit = _receiveAttackDOM(e);

        if (hit && _gbP1.allShipsSunk) {
          // gameWon
          console.log('p2 won! you lost!');
          _game.gameState = _game.GAME_END;
          _game.winMessage = 'You lost! Player 2 (Computer) wins the game!';
        }

        if (!hit) {
          _gbP2.isPlayerTurn = false;
          _gbP1.isPlayerTurn = true;
          document.getElementById('p1-gb').style.pointerEvents = 'none';
          document.getElementById('p2-gb').style.pointerEvents = 'auto';
        }
      }
    }

    if (_game.gameState === _game.GAME_END) {
      console.log('Game has ended!');
    }
  };

  const _createSquare = (boardNum) => {
    const _square = document.createElement('div');
    _square.classList.add('gb-square');

    // you can remove the boardNum condition and add the
    // event listener for all squares instead of only board2 (computer)
    // for 1-player mode, make it equal 2
    if (boardNum) {
      _square.addEventListener('click', _turnDeterminer);
    }

    return _square;
  };

  /// /////////////////////////////////////////////////////////////////////////
  // DOM-Method users /////////////////////////////////////////////////////////
  /// /////////////////////////////////////////////////////////////////////////

  const renderGameboards = (gbP1dom = _gbP1dom, gbP2dom = _gbP2dom) => {
    console.log(_size, _shipsP1, _size, _shipsP2);

    for (let i = 0; i < _size * _size; i += 1) {
      gbP1dom.appendChild(_createSquare(1));
      gbP2dom.appendChild(_createSquare(2));
    }
  };

  return {
    setupShips,
    getGBpX,
    renderGameboards,
  };
};

module.exports = { GameDOM };
