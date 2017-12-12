import React from 'react'
import PropTypes from 'prop-types'

import GameActions from '../actions/GameActions'
import CardUIActions from '../actions/CardUIActions'

import Deck from '../Deck/Deck'
import Timer from '../Timer/Timer'
import Button from '../Button/Button'
import GameModal from '../Modal/GameModal'
import ConfirmBox from '../ConfirmBox/ConfirmBox'
import NewGameBox from '../NewGameBox/NewGameBox'
import styles from './Game.scss'

/**
 * Game component, renders the Game DOM Element.
 * @param {Object} props the default values for the Element.
 * @param {String} props.game the current state of the game.
 * @param {Array} props.cards the set of all cards on the current game board.
 * @param {Function} props.transition function that triggers all state changes.
 * @param {Boolean} props.loading flag that indicates whether the game is loading.
 * @param {Array} props.moves the number of tries the user has attempted.
 * @param {Boolean} props.gameWon flag that indicates if the user has won the game.
 */
const Game = props => {
  const { game, cards, transition, loading, moves, gameWon } = props
  const matches = CardUIActions.matchedTrue(cards)
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>NYT Games Code Test</h1>
      <div>Timer: </div> {moves > 0 ? <Timer /> : <span>0:00</span>}
      <div>{`Moves: ${moves}`}</div>
      <div>{`Matches: ${matches.length / 2 || 0}`}</div>
      <div className={styles.buttonContainer}>
        <Button action={() => transition({ type: 'RESET' })}>Start new game</Button>
        <Button
          action={() => transition({ type: 'RESET', action: GameActions.saveGame(props) })}
          disabled={moves < 1}
        >
          Save this game
        </Button>
      </div>
      {game === 'start' && (
        <GameModal isOpen={game === 'start'}>
          <NewGameBox
            hardLevel={() => transition({ type: 'LEVEL_SELECTION', level: 'hard' })}
            easyLevel={() => transition({ type: 'LEVEL_SELECTION', level: 'easy' })}
            getLastGame={() => transition({ type: 'PREV_GAME', state: GameActions.getLastGame() })}
          />
        </GameModal>
      )}
      {gameWon && (
        <GameModal isOpen={gameWon}>
          <ConfirmBox resetWonGame={() => transition({ type: 'RESET' })} moves={moves} />
        </GameModal>
      )}
      <Deck cards={cards} loading={loading} transition={transition} />
    </div>
  )
}

Game.propTypes = {
  game: PropTypes.string,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      open: PropTypes.bool,
      matched: PropTypes.bool,
      index: PropTypes.number,
    })
  ),
  transition: PropTypes.func,
  loading: PropTypes.bool,
  moves: PropTypes.number,
  gameWon: PropTypes.bool,
}

export default Game
