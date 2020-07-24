// Variables
export const MAX_FLIPS_PER_ROUND = 2; //total number of panel flips allowed
export const TIME_BETWEEN_ROUNDS = 1000;

export const DIFFICULTY = {
  EASY_MODE: { label: 'easy', panels: 8, rounds: 8 },
  MEDIUM_MODE: { label: 'medium', panels: 12, rounds: 10 },
  HARD_MODE: { label: 'hard', panels: 16, rounds: 14 },
};

const EMOJI = {
  DONUT_EMOJI: '&#127849',
  BEER_EMOJI: '&#127866',
  MONKEY_EMOJI: '&#128053',
  VIOLIN_EMOJI: '&#127931',
  DICE_EMOJI: '&#127922',
  FOOTBALL_EMOJI: '&#127944',
  FOX_EMOJI: '&#128049',
  CROWN_EMOJI: '&#128081',
  GHOST_EMOJI: '&#128123',
  ALIEN_EMOJI: '&#128125',
  LOVE_EMOJI: '&#128147',
  BOMB_EMOJI: '&#128163',
  FIRE_EMOJI: '&#128293',
  CRY_EMOJI: '&#128557',
  POOP_EMOJI: '&#128169',
  CHEESE_EMOJI: '&#129472',
  BOLT_EMOJI: '&#9889',
  CACTUS_EMOJI: '&#127797',
};

export const BOARDEMOJIS = {
  [DIFFICULTY.EASY_MODE.label]: [
    ...Array(2).fill(EMOJI.DONUT_EMOJI),
    ...Array(2).fill(EMOJI.BEER_EMOJI),
    ...Array(2).fill(EMOJI.MONKEY_EMOJI),
    ...Array(2).fill(EMOJI.VIOLIN_EMOJI),
  ],
  [DIFFICULTY.MEDIUM_MODE.label]: [
    ...Array(2).fill(EMOJI.FOX_EMOJI),
    ...Array(2).fill(EMOJI.DICE_EMOJI),
    ...Array(2).fill(EMOJI.POOP_EMOJI),
    ...Array(2).fill(EMOJI.FIRE_EMOJI),
    ...Array(2).fill(EMOJI.GHOST_EMOJI),
    ...Array(2).fill(EMOJI.FOOTBALL_EMOJI),
  ],
  [DIFFICULTY.HARD_MODE.label]: [
    ...Array(2).fill(EMOJI.CHEESE_EMOJI),
    ...Array(2).fill(EMOJI.BOMB_EMOJI),
    ...Array(2).fill(EMOJI.CRY_EMOJI),
    ...Array(2).fill(EMOJI.CACTUS_EMOJI),
    ...Array(2).fill(EMOJI.LOVE_EMOJI),
    ...Array(2).fill(EMOJI.CROWN_EMOJI),
    ...Array(2).fill(EMOJI.ALIEN_EMOJI),
    ...Array(2).fill(EMOJI.BOLT_EMOJI),
  ],
};
