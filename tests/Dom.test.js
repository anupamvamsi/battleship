/**
 * @jest-environment jsdom
 */

const { GameDOM } = require('../src/Dom');

// gb stands for gameboard
describe('DOM interaction', () => {
  let gameDOM;
  let gbP1dom;
  let gbP2dom;

  beforeEach(() => {
    document.body.innerHTML = `
          <div class="board" id="p1-gb" data-board-id="1">
          </div>

          <div class="board" id="p2-gb" data-board-id="2">
          </div>
    `;
    gameDOM = GameDOM();
    gbP1dom = gameDOM.getGBpX(1, document);
    gbP2dom = gameDOM.getGBpX(2, document);
  });

  test('Is DOM gameboard accessible?', () => {
    expect(gbP1dom).toBeDefined();
  });

  test('Render gameboard squares', () => {
    gameDOM.renderGameboards(gbP1dom, gbP2dom);

    expect(Array.from(gbP1dom.children).length).toBe(64);
    expect(Array.from(gbP2dom.children).length).toBe(64);
  });
});
