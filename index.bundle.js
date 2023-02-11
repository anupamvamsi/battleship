/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Dom.js":
/*!********************!*\
  !*** ./src/Dom.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  Game\n} = __webpack_require__(/*! ./Game */ \"./src/Game.js\");\nconst {\n  Modal\n} = __webpack_require__(/*! ./Modal */ \"./src/Modal.js\");\nconst {\n  Random\n} = __webpack_require__(/*! ./Random */ \"./src/Random.js\");\nconst GameDOM = () => {\n  /// /////////////////////////////////////////////////////////////////////////\n  // DOM-Members //////////////////////////////////////////////////////////////\n  /// /////////////////////////////////////////////////////////////////////////\n\n  const _game = Game();\n  const _gbP1 = _game.p1.gameboard;\n  const _shipsP1 = _gbP1.ships;\n  const _gbP2 = _game.p2.gameboard;\n  const _shipsP2 = _gbP2.ships;\n  const _size = _gbP1.size;\n  const playAgainBtn = document.getElementById('play-again');\n  const setupShips = () => {\n    _game.manualSetup();\n  };\n  const _determinePlayerAndEnemyNumber = () => {\n    const playerNum = _gbP1.isPlayerTurn ? 1 : 2;\n    const enemyNum = playerNum === 1 ? 2 : 1;\n    return {\n      playerNum,\n      enemyNum\n    };\n  };\n  const _toggleGBActive = () => {\n    const {\n      playerNum,\n      enemyNum\n    } = _determinePlayerAndEnemyNumber();\n    document.getElementById(`p${playerNum}-gb`).style.pointerEvents = 'none';\n    document.getElementById(`p${enemyNum}-gb`).style.pointerEvents = 'auto';\n  };\n\n  // default values\n  _gbP1.isPlayerTurn = true;\n  _gbP2.isPlayerTurn = false;\n  _toggleGBActive();\n\n  /// /////////////////////////////////////////////////////////////////////////\n  // DOM-Methods //////////////////////////////////////////////////////////////\n  /// /////////////////////////////////////////////////////////////////////////\n\n  const getGBpX = function (num) {\n    let doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;\n    return doc.getElementById(`p${num}-gb`);\n  };\n  // SIC - ship indicator container\n  const getSICdiv = num => document.getElementById(`sic-${num}`);\n  const _determineGB = num => {\n    if (num === 1) {\n      return _gbP1;\n    }\n    return _gbP2;\n  };\n  const _gbP1dom = getGBpX(1);\n  const _gbP2dom = getGBpX(2);\n  let _turnDeterminer = null; // this is to prevent no-use-before-define \"error\"\n\n  const _setClassAndContent = (item, className, content) => {\n    item.classList.add(className);\n    // https://stackoverflow.com/a/35637900/9087363\n    item.textContent = content; // eslint-disable-line no-param-reassign\n  };\n\n  const _setShipIndicatorHit = (gb, idx, id) => {\n    const _hitShip = gb.searchForShipWithIdx(idx)[0];\n    const _hitShipIdx = gb.ships.indexOf(_hitShip);\n    const _shipIndicatorCntr = getSICdiv(id);\n    const _shipIndicator = _shipIndicatorCntr.children[_hitShipIdx];\n\n    // The index of the square to be highlighted as \"hit\"\n    // The number of hits minus 1 would give the index of the square,\n    // since the index starts from 0.\n    const _indicatorSqrIdx = _hitShip.ship.numHits - 1;\n    const _shipIndicatorSquare = _shipIndicator.children[_indicatorSqrIdx];\n    _setClassAndContent(_shipIndicatorSquare, 'clicked', '✖');\n  };\n  const _selectRandomSquareToAttack = gameboard => {\n    let _idxToAttack = Random.getRandomInt(0, 63);\n\n    // if location was already attacked, choose a different location\n    if (gameboard.attacksTracker[_idxToAttack]) {\n      _idxToAttack = _selectRandomSquareToAttack(gameboard);\n    }\n    return _idxToAttack;\n  };\n\n  // Only use <<numOfPlayerToAutoAttack>> when it is the computer player's\n  // turn to attack.\n  // The value of <<numOfPlayerToAutoAttack>> will be the playerNumber of the\n  // computer player's enemy.\n  // For example, if player2 is the computer player, and player1 is the enemy\n  // player of player2: numOfPlayerToAutoAttack = 1.\n  const _receiveAttackDOM = (e, numOfPlayerToAutoAttack) => {\n    let _clickedSquare;\n    if (numOfPlayerToAutoAttack) {\n      const _gb = _determineGB(numOfPlayerToAutoAttack);\n      const _gbDOM = getGBpX(numOfPlayerToAutoAttack);\n      const _idxToAttack = _selectRandomSquareToAttack(_gb);\n      _clickedSquare = _gbDOM.children[_idxToAttack];\n      // console.log(_clickedSquare, _idxToAttack);\n    } else {\n      _clickedSquare = e.target;\n    }\n    const _boardOfClickedSquare = _clickedSquare.parentNode;\n    const _allSquaresArray = Array.from(_clickedSquare.parentNode.children);\n    const _idxOfClickedSquare = _allSquaresArray.indexOf(_clickedSquare);\n\n    // split idx into x and y coords\n    const _yCoord = Math.floor(_idxOfClickedSquare / _size);\n    const _xCoord = _idxOfClickedSquare % _size;\n\n    // console.log(\n    //   _clickedSquare,\n    //   _allSquaresArray,\n    //   _idxOfClickedSquare,\n    //   '(',\n    //   _xCoord,\n    //   _yCoord,\n    //   ')'\n    // );\n\n    const _boardID = Number(_boardOfClickedSquare.dataset.boardId);\n    const _gbOfClickedSquare = _determineGB(_boardID);\n    const isHit = _gbOfClickedSquare.receiveAttack(_xCoord, _yCoord);\n    // console.log(\n    //   _gbOfClickedSquare.attacksTracker[_idxOfClickedSquare],\n    //   _gbOfClickedSquare.missedAttacksTracker\n    // );\n    // console.log(_gbOfClickedSquare.ships);\n\n    if (isHit) {\n      _setShipIndicatorHit(_gbOfClickedSquare, _idxOfClickedSquare, _boardID);\n      _setClassAndContent(_clickedSquare, 'hit', '✖');\n    } else {\n      _setClassAndContent(_clickedSquare, 'clicked', '•');\n    }\n\n    // Remove event listener on already clicked squares to prevent\n    // changes in the textContent from crosses to dots or any such\n    // unwanted changes\n    _clickedSquare.removeEventListener('click', _turnDeterminer);\n    return isHit;\n  };\n  const _executePlayersTurn = e => {\n    const {\n      playerNum\n    } = _determinePlayerAndEnemyNumber();\n    const gbOfPlayer = playerNum === 1 ? _gbP1 : _gbP2;\n    const gbOfEnemy = gbOfPlayer === _gbP1 ? _gbP2 : _gbP1;\n    let hit;\n    if (gbOfPlayer === _gbP2) {\n      hit = _receiveAttackDOM(e, 1);\n    } else {\n      hit = _receiveAttackDOM(e);\n    }\n    if (gbOfEnemy.allShipsSunk) {\n      // console.log(`p${playerNum} won!`);\n      _game.gameState = _game.GAME_END;\n      _game.winMessage = `Player ${playerNum} wins the game!`;\n      return;\n    }\n\n    // 1. If there is a hit on a ship, give extra turns to the player\n    // 2. If a ship was sunk because of the current turn's attack,\n    // the enemy player gets their turn back (to prevent a killing\n    // spree of all ships at once by either the AI or a player)\n    if (!hit || gbOfEnemy.sunkShipPrevHit) {\n      gbOfPlayer.isPlayerTurn = false;\n      gbOfEnemy.isPlayerTurn = true;\n      _toggleGBActive();\n    }\n    if (_gbP2.isPlayerTurn) {\n      setTimeout(_executePlayersTurn, 500);\n    }\n  };\n  _turnDeterminer = e => {\n    if (_game.gameState === _game.GAME_START) {\n      _executePlayersTurn(e);\n    }\n    if (_game.gameState === _game.GAME_END) {\n      // console.log('Game has ended!');\n      document.getElementById('p1-gb').style.pointerEvents = 'none';\n      document.getElementById('p2-gb').style.pointerEvents = 'none';\n\n      // modal stuff\n      document.getElementById('modal-p').textContent = _game.winMessage;\n      playAgainBtn.addEventListener('click', Modal.closeModal);\n      playAgainBtn.addEventListener('click', () => window.location.reload());\n      window.addEventListener('click', Modal.closeModalWindow);\n      window.addEventListener('keydown', Modal.closeModalWindow);\n      Modal.openModal();\n    }\n  };\n  const _createSquare = className => {\n    const _square = document.createElement('div');\n    _square.classList.add(className);\n    return _square;\n  };\n  const _createBoardSquare = boardNum => {\n    const _square = _createSquare('gb-square');\n\n    // you can remove the boardNum condition and add the\n    // event listener for all squares instead of only board2 (computer)\n    // for 1-player mode, make it equal 2\n    if (boardNum === 2) {\n      _square.addEventListener('click', _turnDeterminer);\n    }\n    return _square;\n  };\n\n  /// /////////////////////////////////////////////////////////////////////////\n  // DOM-Method users /////////////////////////////////////////////////////////\n  /// /////////////////////////////////////////////////////////////////////////\n\n  const renderGameboards = function () {\n    let gbP1dom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _gbP1dom;\n    let gbP2dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _gbP2dom;\n    // console.log(_size, _shipsP1, _size, _shipsP2);\n\n    for (let i = 0; i < _size * _size; i += 1) {\n      gbP1dom.appendChild(_createBoardSquare(1));\n      gbP2dom.appendChild(_createBoardSquare(2));\n    }\n  };\n  const renderShipIndicators = () => {\n    const _sic1 = getSICdiv(1);\n    const _sic2 = getSICdiv(2);\n\n    // console.log(_sic1, _sic2);\n\n    for (let i = 0; i < _shipsP1.length; i += 1) {\n      const _shipInd = _createSquare('ship-indicator');\n      for (let j = 0; j < _shipsP1[i].ship.length; j += 1) {\n        _shipInd.appendChild(_createSquare('si-square'));\n      }\n      _sic1.appendChild(_shipInd);\n    }\n    for (let i = 0; i < _shipsP2.length; i += 1) {\n      const _shipInd = _createSquare('ship-indicator');\n      for (let j = 0; j < _shipsP2[i].ship.length; j += 1) {\n        _shipInd.appendChild(_createSquare('si-square'));\n      }\n      _sic2.appendChild(_shipInd);\n    }\n  };\n  return {\n    setupShips,\n    getGBpX,\n    renderGameboards,\n    renderShipIndicators\n  };\n};\nmodule.exports = {\n  GameDOM\n};\n\n//# sourceURL=webpack://battleship/./src/Dom.js?");

/***/ }),

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  Player\n} = __webpack_require__(/*! ./Player */ \"./src/Player.js\");\nconst {\n  Ship\n} = __webpack_require__(/*! ./Ship */ \"./src/Ship.js\");\nconst Game = () => {\n  const GAME_START = true;\n  const GAME_END = false;\n  let gameState = GAME_START;\n  let winMessage = '';\n  const p1 = Player();\n  const p2 = Player(); // computer\n  p2.isAI = true;\n  p1.enemy = p2;\n  p2.enemy = p1;\n\n  // 12 squares out of 64 = 18.75%\n  // pX = playerX, shipX sX (ship number), Lx = Length of ship X\n  const p1s1L2 = Ship(2);\n  const p1s2L2 = Ship(2);\n  const p1s3L3 = Ship(3);\n  const p1s4L5 = Ship(5);\n  const p2s1L2 = Ship(2);\n  const p2s2L2 = Ship(2);\n  const p2s3L3 = Ship(3);\n  const p2s4L5 = Ship(5);\n  const manualSetup = () => {\n    p1.gameboard.placeShip(p1s1L2, 1, 1, true);\n    p1.gameboard.placeShip(p1s2L2, 4, 5);\n    p1.gameboard.placeShip(p1s3L3, 4, 1);\n    p1.gameboard.placeShip(p1s4L5, 2, 3, true);\n    p2.gameboard.placeShip(p2s1L2, 3, 2);\n    p2.gameboard.placeShip(p2s2L2, 6, 3, true);\n    p2.gameboard.placeShip(p2s3L3, 0, 3, true);\n    p2.gameboard.placeShip(p2s4L5, 2, 6);\n  };\n  return {\n    GAME_START,\n    GAME_END,\n    get gameState() {\n      return gameState;\n    },\n    set gameState(state) {\n      gameState = state;\n    },\n    get winMessage() {\n      return winMessage;\n    },\n    set winMessage(msg) {\n      winMessage = msg;\n    },\n    p1s1L2,\n    p1s2L2,\n    p1s3L3,\n    p1s4L5,\n    p2s1L2,\n    p2s2L2,\n    p2s3L3,\n    p2s4L5,\n    get p1() {\n      return p1;\n    },\n    get p2() {\n      return p2;\n    },\n    manualSetup\n  };\n};\nmodule.exports = {\n  Game\n};\n\n//# sourceURL=webpack://battleship/./src/Game.js?");

/***/ }),

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((module) => {

eval("const Gameboard = () => {\n  // to check validity when trying to place a new Ship instance\n  let _placedShipsIdxs = [];\n  const SIZE = 8; // 8x8 = 64\n  const ships = []; // array of placed Ship instances\n\n  // start / end coords in (x, y) format, of placed ships\n  const coordsOfPlacedShips = [];\n  // gameboard where only idxs of placed ships are 'true', rest are 'false'.\n  const placedShipsTracker = [];\n  // gameboard where only idxs of attacks with receiveAttack (successful or missed) are tracked.\n  const attacksTracker = [];\n  // only idxs of missed attacks with receiveAttack are stored.\n  const missedAttacksTracker = [];\n  const sunkShips = [];\n  let allShipsSunk = false;\n  let isPlayerTurn = false;\n  let sunkShipPrevHit = false;\n  const _setArrayFalse = array => {\n    for (let i = 0; i < SIZE * SIZE; i += 1) {\n      array.push(false);\n    }\n  };\n  _setArrayFalse(placedShipsTracker); // _setShipsTrackerFalse():\n  _setArrayFalse(attacksTracker); // _setAttacksTrackerFalse();\n\n  const _emptyPlace = _shipPos => {\n    if (_placedShipsIdxs.indexOf(_shipPos) === -1) {\n      return true; // is empty\n    }\n\n    return false;\n  };\n  const _validGBSquare = (x, y) => {\n    // console.log(`x: ${x}, y: ${y}`);\n    if (x >= 0 && x < SIZE && y >= 0 && y < SIZE) {\n      return true;\n    }\n    return false;\n  };\n\n  // If ship is found (it implies it has already been placed\n  // on the gameboard), return true\n  const _alreadyPlacedShip = shipToCheck => {\n    let shipFound = false;\n    ships.forEach(s => {\n      if (s.ship === shipToCheck) {\n        shipFound = true;\n        return true;\n      }\n      return false;\n    });\n    return shipFound;\n  };\n  const placeShip = function (ship, startX, startY) {\n    let orientation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;\n    if (_alreadyPlacedShip(ship)) {\n      return false; // same ship cannot be placed again\n    }\n\n    // If orientation === false => X axis || else Y axis.\n    const _endX = orientation ? startX : startX + ship.length - 1;\n    const _endY = orientation ? startY + ship.length - 1 : startY;\n    const _validIdxsForUnplacedShips = [];\n    if (!_validGBSquare(startX, startY) || !_validGBSquare(_endX, _endY)) {\n      return false;\n    }\n\n    // DETERMINE IF INDICES ARE EMPTY OR FREE:\n    // Based on the 2-D start / end coordinates above, determine\n    // the list of (1-D) indices the ship would occupy in the\n    // placedShipsTracker 1-D array of length <SIZE * SIZE>.\n    for (let i = 0; i < ship.length; i += 1) {\n      // Calculate the 1-D index based on the orientation\n      const _shipIdx = orientation ? startX + (startY + i) * SIZE : startX + i + startY * SIZE;\n\n      // Check if the 1-D index is occupied by a previously\n      // placed ship\n      if (_emptyPlace(_shipIdx)) {\n        _validIdxsForUnplacedShips.push(_shipIdx);\n      } else {\n        return false; // ship cannot be placed\n      }\n    }\n\n    _placedShipsIdxs = _placedShipsIdxs.concat(_validIdxsForUnplacedShips);\n\n    // Set ship occupancy as true for valid idxs\n    _validIdxsForUnplacedShips.forEach(idx => {\n      placedShipsTracker[idx] = true;\n    });\n    ships.push({\n      ship,\n      pos: _validIdxsForUnplacedShips\n    });\n    coordsOfPlacedShips.push([[startX, startY], [_endX, _endY]]);\n    return true;\n  };\n  const searchForShipWithIdx = idx => ships.filter(ship => {\n    if (ship.pos.indexOf(idx) !== -1) {\n      return ship;\n    }\n    return false;\n  });\n  const receiveAttack = (x, y) => {\n    const idx = x + y * SIZE;\n    sunkShipPrevHit = false;\n\n    // check for valid coord + whether or not it is already attacked\n    if (_validGBSquare(x, y) && !attacksTracker[idx]) {\n      attacksTracker[idx] = true;\n\n      // check for ship placement at idx\n      if (placedShipsTracker[idx]) {\n        // find ship with the idx specified & send hit signal\n        const retShip = searchForShipWithIdx(idx)[0].ship;\n        // console.log('len (', x, ',', y, ')', retShip, retShip.length);\n\n        if (retShip) {\n          retShip.hit();\n          if (retShip.isSunk()) {\n            sunkShips.push(retShip);\n            sunkShipPrevHit = true;\n            if (sunkShips.length === ships.length) {\n              allShipsSunk = true;\n            }\n          }\n        } else {\n          return false; // retShip was not found\n        }\n\n        // return retShip; // can be enabled and used with \"// old tests\"\n        return true;\n      }\n\n      // no ship at (x, y), i.e., 'idx', so set as miss (default)\n      missedAttacksTracker.push(idx);\n      return false;\n    }\n    return false;\n  };\n  return {\n    get size() {\n      return SIZE;\n    },\n    get ships() {\n      return ships;\n    },\n    get coordsOfPlacedShips() {\n      return coordsOfPlacedShips;\n    },\n    get placedShipsTracker() {\n      return placedShipsTracker;\n    },\n    get attacksTracker() {\n      return attacksTracker;\n    },\n    get missedAttacksTracker() {\n      return missedAttacksTracker;\n    },\n    get sunkShips() {\n      return sunkShips;\n    },\n    get allShipsSunk() {\n      return allShipsSunk;\n    },\n    get isPlayerTurn() {\n      return isPlayerTurn;\n    },\n    set isPlayerTurn(turn) {\n      isPlayerTurn = turn;\n    },\n    get sunkShipPrevHit() {\n      return sunkShipPrevHit;\n    },\n    set sunkShipPrevHit(outcome) {\n      sunkShipPrevHit = outcome;\n    },\n    placeShip,\n    receiveAttack,\n    searchForShipWithIdx\n  };\n};\nmodule.exports = {\n  Gameboard\n};\n\n//# sourceURL=webpack://battleship/./src/Gameboard.js?");

/***/ }),

/***/ "./src/Modal.js":
/*!**********************!*\
  !*** ./src/Modal.js ***!
  \**********************/
/***/ ((module) => {

eval("function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return typeof key === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (typeof input !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (typeof res !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nclass Modal {\n  static openModal() {\n    Modal.modal.style.display = 'flex';\n  }\n  static closeModal() {\n    Modal.modal.style.display = 'none';\n  }\n  static nBBtnClickOpenModal() {\n    Modal.openModal();\n  }\n  static closeModalWindow(e) {\n    if (e.target === Modal.modal || e.key === 'Escape') {\n      Modal.closeModal();\n    }\n  }\n}\n_defineProperty(Modal, \"modal\", document.getElementById('modal'));\nmodule.exports = {\n  Modal\n};\n\n//# sourceURL=webpack://battleship/./src/Modal.js?");

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  Gameboard\n} = __webpack_require__(/*! ./Gameboard */ \"./src/Gameboard.js\");\nconst Player = () => {\n  const gameboard = Gameboard();\n  let enemy;\n  let isAI = false;\n  return {\n    get gameboard() {\n      return gameboard;\n    },\n    get enemy() {\n      return enemy;\n    },\n    set enemy(player) {\n      enemy = player;\n    },\n    get isAI() {\n      return isAI;\n    },\n    set isAI(option) {\n      isAI = option;\n    }\n  };\n};\nmodule.exports = {\n  Player\n};\n\n//# sourceURL=webpack://battleship/./src/Player.js?");

/***/ }),

/***/ "./src/Random.js":
/*!***********************!*\
  !*** ./src/Random.js ***!
  \***********************/
/***/ ((module) => {

eval("class Random {\n  // Ranges inclusive\n  static getRandomInt(min, max) {\n    min = Math.ceil(min); // eslint-disable-line no-param-reassign\n    max = Math.floor(max); // eslint-disable-line no-param-reassign\n\n    return Math.floor(Math.random() * (max - min + 1) + min);\n  }\n}\nmodule.exports = {\n  Random\n};\n\n//# sourceURL=webpack://battleship/./src/Random.js?");

/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((module) => {

eval("const Ship = len => {\n  const length = len;\n  let numHits = 0;\n  const hit = () => {\n    if (numHits < length) {\n      numHits += 1;\n    }\n  };\n  const isSunk = () => numHits === length;\n  return {\n    get length() {\n      return length;\n    },\n    get numHits() {\n      return numHits;\n    },\n    hit,\n    isSunk\n  };\n};\nmodule.exports = {\n  Ship\n};\n\n//# sourceURL=webpack://battleship/./src/Ship.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  GameDOM\n} = __webpack_require__(/*! ./Dom */ \"./src/Dom.js\");\n__webpack_require__(/*! ../styles/index.css */ \"./styles/index.css\");\n__webpack_require__(/*! ../styles/gameboard.css */ \"./styles/gameboard.css\");\nconst gameDOM = GameDOM();\ngameDOM.setupShips();\ngameDOM.renderGameboards();\ngameDOM.renderShipIndicators();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./styles/gameboard.css":
/*!******************************!*\
  !*** ./styles/gameboard.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://battleship/./styles/gameboard.css?");

/***/ }),

/***/ "./styles/index.css":
/*!**************************!*\
  !*** ./styles/index.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://battleship/./styles/index.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;