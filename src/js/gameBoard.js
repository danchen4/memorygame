import { getRandomInt } from './utility.js';
import { messages } from './messages.js';
import { DIFFICULTY, BOARDEMOJIS } from './settings.js';

// Variables

export const gameBoard = (function () {
  let board = document.querySelector('.board');
  let round = document.querySelector('.scoreboard__rounds');
  let boardArray = [...board.children];
  let difficulty = DIFFICULTY.MEDIUM_MODE;
  let boardData = null;

  function createBoard() {
    board.innerHTML = [...Array(difficulty.panels)]
      .map((panel, index) => {
        return `
        <div class="panel" data-index=${index}>
            <div class="panel__side panel__side--front front"></div>
            <div class="panel__side panel__side--back back">
              <div class="panel__emoji"></div>
            </div>
        </div>
      `;
      })
      .join('');
    boardArray = [...board.children];
  }

  function initializeBoardData() {
    const boardEmojiCopy = [...BOARDEMOJIS[difficulty.label]];
    return [...Array(difficulty.panels)].map((panel, index) => {
      return {
        id: { index },
        emoji: boardEmojiCopy.splice(getRandomInt(boardEmojiCopy.length), 1).join(''),
        flipped: false,
        matched: false,
      };
    });
  }

  function setBoardColors() {
    const boardArray = [...board.children];
    boardArray.forEach((panel, index) => {
      panel.lastElementChild.firstElementChild.innerHTML = boardData[index].emoji;
    });
  }

  function setGameRound() {
    round.innerHTML = `${difficulty.rounds}`;
  }

  function selectMode(e, message) {
    if (!e.target.classList.contains('mode')) return;
    const mode = e.target.dataset.mode;
    message.classList.remove('message--active');
    switch (mode) {
      case DIFFICULTY.EASY_MODE.label:
        difficulty = DIFFICULTY.EASY_MODE;
        initializeBoard();
        return;
      case DIFFICULTY.MEDIUM_MODE.label:
        difficulty = DIFFICULTY.MEDIUM_MODE;
        initializeBoard();
        return;
      case DIFFICULTY.HARD_MODE.label:
        difficulty = DIFFICULTY.HARD_MODE;
        initializeBoard();
        return;
      default:
        difficulty = DIFFICULTY.MEDIUM_MODE;
        initializeBoard();
        return;
    }
  }

  function initializeBoard() {
    createBoard();
    boardData = initializeBoardData();
    setBoardColors();
    setGameRound();
  }

  return {
    initializeBoard: function () {
      createBoard();
      boardData = initializeBoardData();
      setBoardColors();
    },
    promptDifficulty: function () {
      const { message, difficultyLevel } = messages.selectDifficultyMessage();
      message.classList.add('message--active');
      difficultyLevel.addEventListener('click', function (e) {
        selectMode(e, message);
      });
    },
    getDifficulty: function () {
      return difficulty;
    },
    getBoardData: function () {
      return boardData;
    },
    getBoardArray: function () {
      return boardArray;
    },
  };
})();
