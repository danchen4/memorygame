import { initialize } from './initialize.js';
import { game } from './game.js';

(function () {
  initialize.initializeBoard();
  initialize.promptDifficulty();
  game.startRound();
})();
