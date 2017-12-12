import React from 'react'
import PropTypes from 'prop-types'

import styles from './ConfirmBox.scss'

/**
 * Dialog Box component, renders the ConfirmBox DOM Element.
 * @param {Object} props the default values for the Element.
 * @param {Object} props.resetWonGame the action that saves the current game.
 * @param {Array} props.moves the number of tries the user has attempted.
 */
const ConfirmBox = props => {
  const { resetWonGame, moves } = props
  return (
    <div>
      <h1 className={styles.header}>Congratulations! You Won!</h1>
      <div className={styles.subHeader}>Number of Moves to Win: {moves}</div>
      <button className={styles.button} onClick={resetWonGame}>
        Start New Game
      </button>
    </div>
  )
}

ConfirmBox.propTypes = {
  resetWonGame: PropTypes.func,
  moves: PropTypes.number,
}

export default ConfirmBox
