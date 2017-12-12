import React from 'react'
import PropTypes from 'prop-types'

import Card from '../Card/Card'
import styles from './Deck.scss'

/**
 * Deck component, renders the Deck DOM Element.
 * @param {Object} props the default values for the Element.
 * @param {Array} props.cards the set of all cards on the current game board.
 * @param {Function} props.transition function that triggers all state changes.
 * @param {Boolean} props.loading flag that indicates whether the game is loading.
 */
const Deck = props => {
  const { cards, transition, loading } = props
  const renderedCards = cards.map(card => (
    <Card key={Math.random()} cards={cards} card={card} transition={transition} />
  ))
  return <div className={styles.container}>{!loading && renderedCards}</div>
}

Deck.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      open: PropTypes.bool,
      matched: PropTypes.bool,
      index: PropTypes.number,
    })
  ),
  loading: PropTypes.bool,
  transition: PropTypes.func,
}

export default Deck
