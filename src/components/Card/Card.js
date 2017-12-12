import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './Card.scss'
import GameActions from '../actions/GameActions'
import CardUIActions from '../actions/CardUIActions'

/**
 * Card component, renders the Card DOM Element.
 * @param {Object} props the default values for the Element.
 * @param {Object} props.card the default values for the card item.
 * @param {String} props.card.face the card symbol.
 * @param {Boolean} props.card.open a flag indicating whether the card is showing.
 * @param {Boolean} props.card.matched flag indicating whether the card was matched with another card.
 * @param {Array} props.cards the set of all cards on the current game board.
 * @param {Function} props.transition function that triggers all state changes.
 */
const Card = props => {
  const { card, card: { face, open, matched }, cards, transition } = props
  const flipCard = (chosenCard, allCards) => {
    const action = GameActions.triggerPlay(chosenCard, allCards)
    if (action.type)
      transition({
        type: action.type,
        item: action.item,
        items: action.items,
      })
  }

  const cardsOpen = CardUIActions.isOpen(cards)

  const classes = classnames({
    [`${styles.card}`]: true,
    [`${styles.flipped}`]: open,
    [`${styles.unmatched} ${styles.ummatchedAnimation}`]: cardsOpen.length > 1 && open && !matched,
    [`${styles.matched} ${styles.flipped}`]: matched,
  })

  return (
    <div
      className={classes}
      role="button"
      tabIndex={0}
      onClick={!card.open ? () => flipCard(card, cards) : null}
      aria-disabled={card.open}
    >
      {face}
    </div>
  )
}

Card.propTypes = {
  card: PropTypes.shape({
    value: PropTypes.string,
    open: PropTypes.bool,
    matched: PropTypes.bool,
  }),
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      open: PropTypes.bool,
      matched: PropTypes.bool,
      index: PropTypes.number,
    })
  ),
  transition: PropTypes.func,
}

export default Card
