import { getRandomInt } from './utility.js';
import { messages } from './messages.js';

// Variables

export const initialize = (function () {
  const EASY_MODE = { label: 'easy', panels: 4, rounds: 2 };
  const MEDIUM_MODE = { label: 'medium', panels: 12, rounds: 12 };
  const HARD_MODE = { label: 'hard', panels: 16, rounds: 12 };

  const boardColors = {
    [EASY_MODE.label]: [...Array(2).fill('goldenrod'), ...Array(2).fill('tomato')],
    [MEDIUM_MODE.label]: [
      ...Array(2).fill('goldenrod'),
      ...Array(2).fill('tomato'),
      ...Array(2).fill('dodgerblue'),
      ...Array(2).fill('slateblue'),
      ...Array(2).fill('violet'),
      ...Array(2).fill('mediumseagreen'),
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

  const DONUT_EMOJI = '&#127849';
  const BEER_EMOJI = '&#127866';
  const DICE_EMOJI = '&#127922';
  const FOOTBALL_EMOJI = '&#127944';
  const FOX_EMOJI = '&#128049';
  const CROWN_EMOJI = '&#128081';
  const GHOST_EMOJI = '&#128123';
  const ALIEN_EMOJI = '&#128125';
  const LOVE_EMOJI = '&#128147';
  const BOMB_EMOJI = '&#128163';
  const FIRE_EMOJI = '&#128293';
  const CRY_EMOJI = '&#128557';
  const POOP_EMOJI = '&#128169';
  const CHEESE_EMOJI = '&#129472';
  const BOLT_EMOJI = '&#9889';
  const CACTUS_EMOJI = '&#127797';

  const boardEmojis = {
    [EASY_MODE.label]: [...Array(2).fill(DONUT_EMOJI), ...Array(2).fill(BEER_EMOJI)],
    [MEDIUM_MODE.label]: [
      ...Array(2).fill(FOX_EMOJI),
      ...Array(2).fill(DICE_EMOJI),
      ...Array(2).fill(POOP_EMOJI),
      ...Array(2).fill(FIRE_EMOJI),
      ...Array(2).fill(GHOST_EMOJI),
      ...Array(2).fill(FOOTBALL_EMOJI),
    ],
    [HARD_MODE.label]: [
      ...Array(2).fill(CHEESE_EMOJI),
      ...Array(2).fill(BOMB_EMOJI),
      ...Array(2).fill(CRY_EMOJI),
      ...Array(2).fill(CACTUS_EMOJI),
      ...Array(2).fill(LOVE_EMOJI),
      ...Array(2).fill(CROWN_EMOJI),
      ...Array(2).fill(ALIEN_EMOJI),
      ...Array(2).fill(BOLT_EMOJI),
    ],
  };

  let board = document.querySelector('.board');
  let round = document.querySelector('.scoreboard__rounds');
  let boardArray = [...board.children];
  let difficulty = MEDIUM_MODE;
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
    const boardColorCopy = [...boardColors[difficulty.label]];
    const boardEmojiCopy = [...boardEmojis[difficulty.label]];
    return [...Array(difficulty.panels)].map((panel, index) => {
      return {
        id: { index },
        color: boardColorCopy.splice(getRandomInt(boardColorCopy.length), 1).join(''),
        emoji: boardEmojiCopy.splice(getRandomInt(boardEmojiCopy.length), 1).join(''),
        flipped: false,
        matched: false,
      };
    });
  }

  function setBoardColors() {
    const boardArray = [...board.children];
    // boardArray.forEach((panel, index) => {
    //   panel.lastElementChild.style.backgroundColor = boardData[index].color;
    // });

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
      case EASY_MODE.label:
        difficulty = EASY_MODE;
        initializeBoard();
        return;
      case MEDIUM_MODE.label:
        difficulty = MEDIUM_MODE;
        initializeBoard();
        return;
      case HARD_MODE.label:
        difficulty = HARD_MODE;
        initializeBoard();
        return;
      default:
        difficulty = MEDIUM_MODE;
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
