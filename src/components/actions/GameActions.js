import localGameStorage from '../../services/localStorage'
import CardUIActions from './CardUIActions'

/**
 * Methods to trigger all game state updates
 * returns the correct game result based on user's action
 */
const GameActions = {
  triggerPlay(card, cards) {
    let action = {}
    const otherCardsFlipped = CardUIActions.isOpen(cards)
    if (!card.isOpen) {
      action =
        otherCardsFlipped.length > 0 && otherCardsFlipped.length < 2
          ? GameActions.checkForMatches(card, otherCardsFlipped, cards)
          : CardUIActions.flipCard(card)
    }
    return action
  },
  checkForMatches(card, otherCardsFlipped, cards) {
    const isMatch = otherCardsFlipped.filter(otherCard => otherCard.face === card.face)
    return isMatch.length > 0
      ? GameActions.checkForWin(card, otherCardsFlipped, cards)
      : CardUIActions.unmatchCards(card, otherCardsFlipped)
  },
  checkForWin(card, otherCardsFlipped, cards) {
    const matches = CardUIActions.matchedTrue(cards)
    if (matches.length === cards.length - 2) {
      return GameActions.resetWonGame(cards)
    }
    return CardUIActions.resolveCards(card, otherCardsFlipped)
  },
  resetWonGame(items) {
    return {
      type: 'WON_GAME',
      items,
    }
  },
  restartGame() {
    return {
      type: 'RESET',
    }
  },
  saveGame(state) {
    const { transition, game, loading, ...storageState } = state
    localGameStorage.setStateToLocalStorage(storageState)
  },
  getLastGame() {
    const prevState = localGameStorage.getStateFromLocalStorage()
    const cardsValue = prevState[0][1]
    const movesValue = prevState[1][1]
    const gameWonValue = prevState[2][1]
    const normalizedState = {
      cards: cardsValue,
      moves: movesValue,
      gameWon: gameWonValue,
    }

    localGameStorage.clearLocalGameStorage()
    return {
      state: normalizedState,
    }
  },
}

export default GameActions
