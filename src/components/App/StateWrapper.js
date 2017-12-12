import React from 'react'

import { normalizeCardData, filterCardsByLevel } from '../../utilities/dataLogic/cards'
import { updateItemOpenState, mergeItems } from '../../utilities/immutable'
import fetchCards from '../../services/fetchCardsService'
import gameMachine from '../../state/gameMachine'
import CardUIActions from '../actions/CardUIActions'

/**
 * stateSubcription HOC component, controls state changes via a reducer and a dispatcher (transition) for the entire game.
 * @param {Function} WrappedComponent the React Component passed to the HOC.
 * @return {Function}
 */
function stateSubscription(WrappedComponent) {
  return class extends React.PureComponent {
    constructor(props) {
      super(props)

      this.initialState = {
        game: 'start',
        cards: [],
        moves: 0,
        loading: true,
        gameWon: false,
      }

      this.state = this.initialState
      this.transition = this.transition.bind(this)
      this.resetLastMatchedCards = this.resetLastMatchedCards.bind(this)
      this.reducer = this.reducer.bind(this)
      this.fetchCards = fetchCards.bind(this)
    }

    reducer(nextState, action) {
      const prevState = this.state
      let updatedState = {}
      switch (nextState) {
        case 'start':
          updatedState = this.initialState
          break
        case 'loading':
          fetchCards().then(data => {
            const cardsByLevel = filterCardsByLevel(data, action.level)
            const normalizedCardData = normalizeCardData(cardsByLevel)
            this.transition({
              type: 'SUCCESS',
              cards: normalizedCardData,
            })
          })
          break
        case 'playing':
          if (action.type === 'PREV_GAME') {
            const { cards, moves, gameWon } = action.state.state
            updatedState = {
              ...prevState,
              cards,
              moves,
              gameWon,
              loading: false,
            }
          } else if (action.type === 'SUCCESS') {
            updatedState = {
              ...prevState,
              cards: action.cards,
              moves: action.moves || prevState.moves,
              loading: false,
              gameWon: action.gameWon || prevState.gameWon,
            }
          } else if (action.type === 'FLIP_CARD') {
            updatedState = {
              ...prevState,
              cards: updateItemOpenState(prevState.cards, action),
              moves: prevState.moves + 1,
            }
            break
          } else if (action.type === 'IS_MATCH') {
            updatedState = {
              ...prevState,
              cards: mergeItems(prevState.cards, action.items),
            }
          } else if (action.type === 'NO_MATCH') {
            updatedState = {
              ...prevState,
              cards: mergeItems(prevState.cards, action.items),
              moves: prevState.moves + 1,
            }
          } else if (action.type === 'RESET_LAST_MATCH') {
            updatedState = {
              ...prevState,
              cards: mergeItems(prevState.cards, action.items),
            }
          } else if (action.type === 'WON_GAME') {
            updatedState = {
              ...prevState,
              cards: mergeItems(prevState.cards, action.items),
              gameWon: true,
            }
          }
          break
        default:
          break
      }
      return updatedState
    }

    resetLastMatchedCards(action) {
      setTimeout(() => {
        if (action.type === 'NO_MATCH') {
          const lastMatched = CardUIActions.lastMatched(this.state.cards)
          const nextAction = CardUIActions.resetLastMatchedCards(lastMatched)
          this.transition({
            type: nextAction.type,
            items: nextAction.items,
          })
        }
      }, 800)
    }

    transition(action) {
      const currentGameState = this.state.game
      const nextGameState = gameMachine[currentGameState][action.type]
      if (nextGameState) {
        const nextState = this.reducer(nextGameState, action)
        this.setState(
          () => ({
            ...nextState,
            game: nextGameState,
          }),
          () => this.resetLastMatchedCards(action)
        )
      }
    }

    render() {
      return <WrappedComponent {...this.state} transition={this.transition} />
    }
  }
}

export default stateSubscription
