const { GameDOM } = require('./Dom');

require('../styles/index.css');
require('../styles/gameboard.css');

const gameDOM = GameDOM();
gameDOM.setupShips();
gameDOM.renderGameboards();
