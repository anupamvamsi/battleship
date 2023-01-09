const Ship = (len) => {
  const length = len;
  let numHits = 0;

  const hit = () => {
    numHits += 1;
  };

  return {
    get length() {
      return length;
    },
    get numHits() {
      return numHits;
    },
    hit,
  };
};

module.exports = { Ship };
