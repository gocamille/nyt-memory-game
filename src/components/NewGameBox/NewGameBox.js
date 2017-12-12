import React from 'react'
import PropTypes from 'prop-types'

import localGameStorage from '../../services/localStorage'

import styles from './NewGameBox.scss'

const prevGameExists = localGameStorage.getStateFromLocalStorage()

/**
 * Modal Dialog component, renders the NewGameBox DOM Element.
 * @param {Object} props the values for the App Element.
 * @param {Function} props.hardLevel the action that triggers the hard level of the game.
 * @param {Function} props.easyLevel the action that triggers the easy level game.
 * @param {Function} props.getLastGame action that retrieves the last game from localStorage.
 */
const NewGameBox = props => {
  const { hardLevel, easyLevel, getLastGame } = props

  return (
    <div>
      <h1 className={styles.header}>Welcome to the New York Times Memory Card Game!</h1>
      <h2 className={styles.subHeader}>
        The Rules: pick two cards of your choosing. If the cards have the same symbol, the player
        keeps the pair and plays again. If not, the cards are returned to their face-down position.
        Play until all the cards have been matched.
      </h2>
      <div>
        <h3 className={`${styles.subHeader} ${styles.direction}`}>
          Choose the level of Difficulty:
        </h3>
        <button className={styles.button} onClick={hardLevel}>
          Hard
        </button>
        <button className={styles.button} onClick={easyLevel}>
          Easy
        </button>
        {prevGameExists &&
          prevGameExists.length > 0 && <button onClick={getLastGame}>Get Last Game</button>}
      </div>
    </div>
  )
}

NewGameBox.propTypes = {
  hardLevel: PropTypes.func,
  easyLevel: PropTypes.func,
  getLastGame: PropTypes.func,
}

export default NewGameBox
