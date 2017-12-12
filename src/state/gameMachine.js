/**
 * State machine to control game state. Sources for the idea
 * include github.com/davidkpiano/xstate
 * and css-tricks.com/finite-state-machines-with-react/
 */
const gameMachine = {
  start: {
    LEVEL_SELECTION: 'loading',
    SUCCESS: 'loading',
    PREV_GAME: 'playing',
  },
  loading: {
    SUCCESS: 'playing',
    FAIL: 'start',
  },
  playing: {
    FLIP_CARD: 'playing',
    WON_GAME: 'playing',
    NO_MATCH: 'playing',
    IS_MATCH: 'playing',
    RESET_LAST_MATCH: 'playing',
    RESET: 'start',
  },
}

export default gameMachine
