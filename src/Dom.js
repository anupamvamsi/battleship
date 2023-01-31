const DOM = () => {
  const createSquare = () => {
    const square = document.createElement('div');
    square.classList.add('gb-square');

    return square;
  };

  const getGBpX = (num) => document.getElementById(`p${num}-gb`);

  return {
    createSquare,
    getGBpX,
  };
};

module.exports = { DOM };
