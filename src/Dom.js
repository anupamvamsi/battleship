const { Game } = require('./Game');
const { Random } = require('./Random');

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

  const _determinePlayerAndEnemyNumber = () => {
    const playerNum = _gbP1.isPlayerTurn ? 1 : 2;
    const enemyNum = playerNum === 1 ? 2 : 1;

    return { playerNum, enemyNum };
  };

  const _toggleGBActive = () => {
    const { playerNum, enemyNum } = _determinePlayerAndEnemyNumber();
    document.getElementById(`p${playerNum}-gb`).style.pointerEvents = 'none';
    document.getElementById(`p${enemyNum}-gb`).style.pointerEvents = 'auto';
  };

  // default values
  _gbP1.isPlayerTurn = true;
  _gbP2.isPlayerTurn = false;
  _toggleGBActive();

  /// /////////////////////////////////////////////////////////////////////////
  // DOM-Methods //////////////////////////////////////////////////////////////
  /// /////////////////////////////////////////////////////////////////////////

  const getGBpX = (num, doc = document) => doc.getElementById(`p${num}-gb`);
  // SIC - ship indicator container
  const getSICdiv = (num) => document.getElementById(`sic-${num}`);

  const _determineGB = (num) => {
    if (num === 1) {
      return _gbP1;
    }
    return _gbP2;
  };

  const _gbP1dom = getGBpX(1);
  const _gbP2dom = getGBpX(2);

  let _turnDeterminer = null; // this is to prevent no-use-before-define "error"

  const _setClassAndContent = (item, className, content) => {
    item.classList.add(className);
    // https://stackoverflow.com/a/35637900/9087363
    item.textContent = content; // eslint-disable-line no-param-reassign
  };

  const _setShipIndicatorHit = (gb, idx, id) => {
    const _hitShip = gb.searchForShipWithIdx(idx)[0];
    const _hitShipIdx = gb.ships.indexOf(_hitShip);

    const _shipIndicatorCntr = getSICdiv(id);
    const _shipIndicator = _shipIndicatorCntr.children[_hitShipIdx];

    // The index of the square to be highlighted as "hit"
    // The number of hits minus 1 would give the index of the square,
    // since the index starts from 0.
    const _indicatorSqrIdx = _hitShip.ship.numHits - 1;
    const _shipIndicatorSquare = _shipIndicator.children[_indicatorSqrIdx];

    _setClassAndContent(_shipIndicatorSquare, 'clicked', '✖');
  };

  const _selectRandomSquareToAttack = (gameboard) => {
    let _idxToAttack = Random.getRandomInt(0, 63);

    // if location was already attacked, choose a different location
    if (gameboard.attacksTracker[_idxToAttack]) {
      _idxToAttack = _selectRandomSquareToAttack(gameboard);
    }
    return _idxToAttack;
  };

  // Only use <<numOfPlayerToAutoAttack>> when it is the computer player's
  // turn to attack.
  // The value of <<numOfPlayerToAutoAttack>> will be the playerNumber of the
  // computer player's enemy.
  // For example, if player2 is the computer player, and player1 is the enemy
  // player of player2: numOfPlayerToAutoAttack = 1.
  const _receiveAttackDOM = (e, numOfPlayerToAutoAttack) => {
    let _clickedSquare;

    if (numOfPlayerToAutoAttack) {
      const _gb = _determineGB(numOfPlayerToAutoAttack);
      const _gbDOM = getGBpX(numOfPlayerToAutoAttack);
      const _idxToAttack = _selectRandomSquareToAttack(_gb);

      _clickedSquare = _gbDOM.children[_idxToAttack];
      console.log(_clickedSquare, _idxToAttack);
    } else {
      _clickedSquare = e.target;
    }

    const _boardOfClickedSquare = _clickedSquare.parentNode;
    const _allSquaresArray = Array.from(_clickedSquare.parentNode.children);
    const _idxOfClickedSquare = _allSquaresArray.indexOf(_clickedSquare);

    // split idx into x and y coords
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
      _setShipIndicatorHit(_gbOfClickedSquare, _idxOfClickedSquare, _boardID);
      _setClassAndContent(_clickedSquare, 'hit', '✖');
    } else {
      _setClassAndContent(_clickedSquare, 'clicked', '•');
    }

    // Remove event listener on already clicked squares to prevent
    // changes in the textContent from crosses to dots or any such
    // unwanted changes
    _clickedSquare.removeEventListener('click', _turnDeterminer);

    return isHit;
  };

  const _executePlayersTurn = (e) => {
    const { playerNum } = _determinePlayerAndEnemyNumber();
    const gbOfPlayer = playerNum === 1 ? _gbP1 : _gbP2;
    const gbOfEnemy = gbOfPlayer === _gbP1 ? _gbP2 : _gbP1;

    let hit;
    if (gbOfPlayer === _gbP2) {
      hit = _receiveAttackDOM(e, 1);
    } else {
      hit = _receiveAttackDOM(e);
    }

    if (gbOfEnemy.allShipsSunk) {
      console.log(`p${playerNum} won!`);
      _game.gameState = _game.GAME_END;
      _game.winMessage = `Player ${playerNum} wins the game!`;
    }

    // 1. If there is a hit on a ship, give extra turns to the player
    // 2. If a ship was sunk because of the current turn's attack,
    // the enemy player gets their turn back (to prevent a killing
    // spree of all ships at once by either the AI or a player)
    if (!hit || gbOfEnemy.sunkShipPrevHit) {
      gbOfPlayer.isPlayerTurn = false;
      gbOfEnemy.isPlayerTurn = true;
      _toggleGBActive();
    }

    if (_gbP2.isPlayerTurn) {
      setTimeout(_executePlayersTurn, 500);
    }
  };

  _turnDeterminer = (e) => {
    if (_game.gameState === _game.GAME_START) {
      _executePlayersTurn(e);
    }

    if (_game.gameState === _game.GAME_END) {
      console.log('Game has ended!');
      document.getElementById('p1-gb').style.pointerEvents = 'none';
      document.getElementById('p2-gb').style.pointerEvents = 'none';
    }
  };

  const _createSquare = (className) => {
    const _square = document.createElement('div');
    _square.classList.add(className);
    return _square;
  };

  const _createBoardSquare = (boardNum) => {
    const _square = _createSquare('gb-square');

    // you can remove the boardNum condition and add the
    // event listener for all squares instead of only board2 (computer)
    // for 1-player mode, make it equal 2
    if (boardNum === 2) {
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
      gbP1dom.appendChild(_createBoardSquare(1));
      gbP2dom.appendChild(_createBoardSquare(2));
    }
  };

  const renderShipIndicators = () => {
    const _sic1 = getSICdiv(1);
    const _sic2 = getSICdiv(2);

    console.log(_sic1, _sic2);

    for (let i = 0; i < _shipsP1.length; i += 1) {
      const _shipInd = _createSquare('ship-indicator');
      for (let j = 0; j < _shipsP1[i].ship.length; j += 1) {
        _shipInd.appendChild(_createSquare('si-square'));
      }

      _sic1.appendChild(_shipInd);
    }

    for (let i = 0; i < _shipsP2.length; i += 1) {
      const _shipInd = _createSquare('ship-indicator');
      for (let j = 0; j < _shipsP2[i].ship.length; j += 1) {
        _shipInd.appendChild(_createSquare('si-square'));
      }

      _sic2.appendChild(_shipInd);
    }
  };

  return {
    setupShips,
    getGBpX,
    renderGameboards,
    renderShipIndicators,
  };
};

module.exports = { GameDOM };
