import { getRandomInt } from './utility.js';

// Variables

const EASY_MODE = { label: 'easy', panels: 4, rounds: 12 };
const MEDIUM_MODE = { label: 'medium', panels: 8, rounds: 10 };
const HARD_MODE = { label: 'hard', panels: 16, rounds: 10 };

const boardColors = {
  [EASY_MODE.label]: [...Array(2).fill('goldenrod'), ...Array(2).fill('tomato')],
  [MEDIUM_MODE.label]: [
    ...Array(2).fill('goldenrod'),
    ...Array(2).fill('tomato'),
    ...Array(2).fill('dodgerblue'),
    ...Array(2).fill('slateblue'),
  ],
  [HARD_MODE.label]: [
    ...Array(2).fill('goldenrod'),
    ...Array(2).fill('Tomato'),
    ...Array(2).fill('dodgerblue'),
    ...Array(2).fill('slateblue'),
    ...Array(2).fill('orange'),
    ...Array(2).fill('violet'),
    ...Array(2).fill('mediumseagreen'),
    ...Array(2).fill('purple'),
  ],
};

let board = document.querySelector('.board');

export const difficulty = MEDIUM_MODE;
// Methods

function createBoard(numPanels) {
  board.innerHTML = [...Array(numPanels)]
    .map((panel, index) => {
      return `
      <div class="panel" data-index=${index}>
          <div class="panel__side panel__side--front front"></div>
          <div class="panel__side panel__side--back back"></div>
      </div>
    `;
    })
    .join('');
}

function initializeBoardData(numPanels) {
  const boardColorCopy = [...boardColors[difficulty.label]];
  return [...Array(numPanels)].map((panel, index) => {
    return {
      id: { index },
      color: boardColorCopy.splice(getRandomInt(boardColorCopy.length), 1).join(''),
      flipped: false,
      matched: false,
    };
  });
}

export function setBoardColors() {
  // Set colors to back of panels
  boardArray.forEach((panel, index) => {
    panel.lastElementChild.style.backgroundColor = boardData[index].color;
  });
}

// Initialization

// 1. Create board based on difficulty
createBoard(difficulty.panels);
// 2. copy board elements to array to allow array methods
export const boardArray = [...board.children];
// 3. Initialize board data
export let boardData = initializeBoardData(difficulty.panels);
// 4. Set colors of back panels on board
setBoardColors();
