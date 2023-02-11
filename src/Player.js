const { Gameboard } = require('./Gameboard');

const Player = () => {
  const gameboard = Gameboard();
  let enemy;
  let isAI = false;

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
    get isAI() {
      return isAI;
    },
    set isAI(option) {
      isAI = option;
    },
  };
};

module.exports = { Player };
