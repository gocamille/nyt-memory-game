import React from 'react'
import PropTypes from 'prop-types'

import stateSubscription from './StateWrapper'

import Game from '../Game/Game'

/**
 * App component, renders the App DOM Element to pass props to Game Component.
 * @param {Object} props the values for the App Element.
 * @param {String} props.game the current state of the game.
 * @param {Array} props.cards the set of all cards on the current game board.
 * @param {Function} props.transition function that triggers all state changes.
 * @param {Boolean} props.loading flag that indicates whether the game is loading.
 * @param {Array} props.moves the number of tries the user has attempted.
 * @param {Boolean} props.gameWon flag that indicates if the user has won the game.
 * @return {Array}
 */
const App = props => {
  const { game, cards, transition, loading, moves, gameWon } = props
  return (
    <div>
      <Game
        game={game}
        cards={cards}
        transition={transition}
        loading={loading}
        moves={moves}
        gameWon={gameWon}
      />
    </div>
  )
}

App.propTypes = {
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

const WrappedApp = stateSubscription(App)

export default WrappedApp
