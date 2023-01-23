const { Gameboard } = require('./Gameboard');

const Player = () => {
  const gameboard = Gameboard();
  let enemy;

  return {
    get gameboard() {
      return gameboard;
    },
    get enemy() {
      return enemy;
    },
    set enemy(player) {
      enemy = player;
    },
  };
};

module.exports = { Player };
