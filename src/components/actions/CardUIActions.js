/**
 * Methods to trigger all card state updates
 * Triggers all card visibility states
 * Triggers all state updates for each card state (open, matched)
 */
const CardUIActions = {
  matchedTrue(cards) {
    return cards.filter(item => item.matched)
  },
  isOpen(cards) {
    return cards.filter(item => item.open)
  },
  lastMatched(cards) {
    return cards.filter(item => item.open && !item.matched)
  },
  flipCard(item) {
    return {
      type: 'FLIP_CARD',
      item: {
        ...item,
        open: true,
      },
    }
  },
  shuffleCards(cards) {
    let randomIndex = 0
    let temporaryValue = null
    let currentIndex = cards.length

    // based on the Fisher-Yates shuffle -- specifically
    // https://www.frankmitchell.org/2015/01/fisher-yates/
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = cards[currentIndex]
      cards[currentIndex] = cards[randomIndex]
      cards[randomIndex] = temporaryValue
    }

    return cards
  },
  unmatchCards(card, otherCardsFlipped) {
    const newFlippedCard = {
      face: card.face,
      open: true,
      matched: false,
      index: card.index,
    }
    return {
      type: 'NO_MATCH',
      items: [newFlippedCard, ...otherCardsFlipped],
    }
  },
  resolveCards(card, otherCardsFlipped) {
    const otherCardsMatched = otherCardsFlipped.map(flippedCard => {
      const newObject = {
        face: flippedCard.face,
        open: true,
        matched: true,
        index: flippedCard.index,
      }
      return newObject
    })
    const newMatchedCard = {
      face: card.face,
      open: true,
      matched: true,
      index: card.index,
    }
    return {
      type: 'IS_MATCH',
      items: [newMatchedCard, ...otherCardsMatched],
    }
  },
  resetLastMatchedCards(cards) {
    const lastMatchedCards = cards.map(card => {
      const newObject = {
        face: card.face,
        open: false,
        matched: false,
        index: card.index,
      }
      return newObject
    })
    return {
      type: 'RESET_LAST_MATCH',
      items: [...lastMatchedCards],
    }
  },
}

export default CardUIActions
