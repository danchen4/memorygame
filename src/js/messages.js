// Variables

export const messages = (function () {
  const message = document.querySelector('.message');
  const difficultyMessage = `
    <div class="message__content">
      <h2 class="message__header">Select difficulty level:</h2>
      <div class="difficulty">
        <div class="message__selection">
          <button class="btn btn--primary mode" data-mode="easy">
            Easy
          </button>
        </div>
        <div class="message__selection">
          <button class="btn btn--primary mode" data-mode="medium">
            Medium
          </button>
        </div>
        <div class="message__selection">
          <button class="btn btn--primary mode" data-mode="hard">
            Hard
          </button>
        </div>
      </div>
    </div>
  `;
  const winMessage = `
    <div class="message__content">
      <h2 class="message__header message__header--win">You Won! &#128513;</h2>
      <h2 class="message__header">Play Again?</h2>
      <div class="play-again">
        <div class="message__selection">
          <button class="btn btn--primary again" data-again="yes">
            Yes
          </button>
        </div>
      </div>
    </div>
  `;
  const loseMessage = `
    <div class="message__content">
      <h2 class="message__header message__header--lose">You Lost &#128553;</h2>
      <h2 class="message__header">Play Again?</h2>
      <div class="play-again">
        <div class="message__selection">
          <button class="btn btn--primary again" data-again="yes">
            Yes
          </button>
        </div>
      </div>
    </div>
  `;
  return {
    selectDifficultyMessage: function () {
      message.innerHTML = difficultyMessage;
      const difficultyLevel = message.querySelector('.difficulty');
      return { message, difficultyLevel };
    },
    winMessage: function () {
      message.innerHTML = winMessage;
      const again = message.querySelector('.play-again');
      return { message, again };
    },
    loseMessage: function () {
      message.innerHTML = loseMessage;
      const again = message.querySelector('.play-again');
      return { message, again };
    },
  };
})();
