import { initialize } from './initialize.js';
import { messages } from './messages.js';
import { sleep } from './utility.js';

export const game = (function () {
  // Variables
  const MAX_FLIPS_PER_ROUND = 2; //total number of panel flips allowed
  const TIME_BETWEEN_ROUNDS = 1000;

  let flipCounter = 0;
  let gameRound = 0;
  let flipHistory = [];

  let round = document.querySelector('.scoreboard__rounds');
  let board = document.querySelector('.board');

  // Methods

  async function boardAction(e) {
    e.preventDefault();
    const boardData = initialize.getBoardData();
    const boardArray = initialize.getBoardArray();
    const difficulty = initialize.getDifficulty();

    // Event delegation
    if (!e.target.classList.contains('panel__side')) return;
    const panelElement = e.target.parentElement;
    let panelIndex = panelElement.dataset.index;

    // 1. Flip panels
    flipPanel(panelElement, panelIndex, boardData);

    // 2. On second flip, check:
    if (flipCounter >= MAX_FLIPS_PER_ROUND) {
      // 3. If there is a match, then update boardData
      checkMatch(boardData);
      // 4. Remove event listeners so player can't flip panels
      board.removeEventListener('click', boardAction);
      board.removeEventListener('touchstart', boardAction);
      // 5. Pause
      await sleep(TIME_BETWEEN_ROUNDS);
      // 6. End the round
      endRound(boardData, boardArray);
      // 7. Check if player won or loss after the end of the round
      checkWinLoss(boardData, difficulty);
    }
  }

  function flipPanel(panelElement, panelIndex, boardData) {
    flipCounter++;
    boardData[panelIndex].flipped = true;
    flipHistory.push(panelIndex);

    // rotate the front side by -180deg
    panelElement.firstElementChild.style.transform = 'rotateY(-180deg)';
    // and rotate the back side by to 0
    panelElement.lastElementChild.style.transform = 'rotateY(0)';
  }

  function checkMatch(boardData) {
    if (boardData[flipHistory[0]].emoji === boardData[flipHistory[1]].emoji) {
      boardData[flipHistory[0]].matched = true;
      boardData[flipHistory[1]].matched = true;
    }
  }

  function endRound(boardData, boardArray) {
    flipCounter = 0; // set the counter back to zero
    flipHistory.length = 0; //reset flip history
    gameRound++; //increase the round counter

    // Rotate board panel if it's been flipped but hasn't been matched
    boardArray.forEach((panel, index) => {
      if (boardData[index].flipped === true && boardData[index].matched === false) {
        boardData[index].flipped = false;
        panel.firstElementChild.style.transform = 'rotateY(0)';
        panel.lastElementChild.style.transform = 'rotateY(180deg)';
      }
    });
  }

  function promptNewGame(e, message) {
    if (!e.target.classList.contains('again')) return;
    const again = e.target.dataset.again;
    message.classList.remove('message--active');
    switch (again) {
      case 'Yes':
        resetGame();
        return;
      default:
        resetGame();
        return;
    }
  }

  function checkWinLoss(boardData, difficulty) {
    const remainingUnmatched = boardData.filter((panel) => !panel.matched).length;
    const remainingRounds = difficulty.rounds - gameRound;

    // If all panels have been matched then player wins
    if (!remainingUnmatched) {
      const { message, again } = messages.winMessage();
      message.classList.add('message--active');
      again.addEventListener('click', function (e) {
        promptNewGame(e, message);
      });
      return;
    }

    // If there are no more remaining rounds, then player loses
    if (!remainingRounds) {
      const { message, again } = messages.loseMessage();
      message.classList.add('message--active');
      again.addEventListener('click', function (e) {
        promptNewGame(e, message);
      });
      return;
    }

    return startRound();
  }

  function resetGame() {
    gameRound = 0;
    initialize.promptDifficulty();
    startRound();
  }

  function startRound() {
    updateGameRound();
    board.addEventListener('click', boardAction);
    board.addEventListener('touchstart', boardAction);
  }

  function updateGameRound() {
    const difficulty = initialize.getDifficulty();

    // round.innerHTML = `<span class="scoreboard__rounds--show">${
    //   difficulty.rounds - gameRound
    //   }</span>`;
    round.classList.add('scoreboard__rounds--show');
    round.innerHTML = difficulty.rounds - gameRound;
  }

  return {
    startRound,
  };
})();
