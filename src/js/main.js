import { gameBoard } from './gameBoard.js';
import { game } from './game.js';
import '../sass/main.scss';

(function () {
  gameBoard.initializeBoard();
  gameBoard.promptDifficulty();
  game.startRound();
})();
