const Ship = (len) => {
  const length = len;
  let numHits = 0;
  // const isSunk = false;

  const hit = () => {
    if (numHits < length) {
      numHits += 1;
    }
  };

  const isSunk = () => numHits === length;

  return {
    get length() {
      return length;
    },
    get numHits() {
      return numHits;
    },
    hit,
    isSunk,
  };
};

module.exports = { Ship };
