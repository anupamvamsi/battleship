class Random {
  // Ranges inclusive
  static getRandomInt(min, max) {
    min = Math.ceil(min); // eslint-disable-line no-param-reassign
    max = Math.floor(max); // eslint-disable-line no-param-reassign

    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

module.exports = { Random };
