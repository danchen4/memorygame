import { sleep } from './utility.js';
import { boardArray, boardData, difficulty } from './initialize.js';

(function () {
  // Set variables
  const FLIP_TIMER = 800; //time (in ms) before card flips back after clicking
  const MAX_FLIPS_PER_ROUND = 2; //total number of panel flips allowed
  const TIME_BETWEEN_ROUNDS = 1000;

  let flipCounter = 0;
  let gameRound = 0;

  let flipHistory = [];

  // Get Elements
  let round = document.querySelector('.game-moves-remaining');
  let board = document.querySelector('.board');

  // Add Functions

  async function activateBoard(e) {
    // Event delegation
    if (!e.target.classList.contains('panel__side')) return;
    const panelElement = e.target.parentElement;
    let panelIndex = panelElement.dataset.index;

    // 1. Flip panels
    flipPanel(panelElement, panelIndex);

    // 2. If second flip, check if..
    if (flipCounter >= MAX_FLIPS_PER_ROUND) {
      // 3. Check to see if there is a match.  Update boardData
      checkMatch();
      // 4. Check to see if player won or lost
      board.removeEventListener('mousedown', activateBoard);
      await sleep(TIME_BETWEEN_ROUNDS);
      endRound();
      checkWinLoss();
      startRound();
      // resetRound();
    }
  }

  function checkMatch() {
    if (boardData[flipHistory[0]].color === boardData[flipHistory[1]].color) {
      boardData[flipHistory[0]].matched = true;
      boardData[flipHistory[1]].matched = true;
    }
  }

  function checkWinLoss() {
    const remainingUnmatched = boardData.filter((panel) => !panel.matched).length;
    const remainingRounds = difficulty.rounds - gameRound;
    console.log(remainingUnmatched);
    console.log(gameRound);

    if (!remainingUnmatched) {
      alert('You WIN!');
      resetGame();
    }

    if (!remainingRounds) {
      alert('You Lose :<');
      resetGame();
    }
  }

  function flipPanel(panelElement, panelIndex) {
    flipCounter++;
    boardData[panelIndex].flipped = true;
    flipHistory.push(panelIndex);

    // rotate the front side by -180deg
    panelElement.firstElementChild.style.transform = 'rotateY(-180deg)';
    // and rotate the back side by to 0
    panelElement.lastElementChild.style.transform = 'rotateY(0)';
  }

  function resetGame() {
    gameRound = 0;
    startRound();
  }

  async function endRound() {
    flipCounter = 0; // set the counter back to zero
    flipHistory.length = 0; //reset flip history
    gameRound++; //increase the round counter

    boardArray.forEach((panel, index) => {
      if (boardData[index].flipped === true && boardData[index].matched === false) {
        boardData[index].flipped = false;
        panel.firstElementChild.style.transform = 'rotateY(0)';
        panel.lastElementChild.style.transform = 'rotateY(180deg)';
      }
    });
  }

  function startRound() {
    displayGameRound();
    board.addEventListener('mousedown', activateBoard);
  }

  function displayGameRound() {
    round.innerHTML = `${difficulty.rounds - gameRound}`;
  }

  // Initialize and add Event Listeners
  startRound();
})();
