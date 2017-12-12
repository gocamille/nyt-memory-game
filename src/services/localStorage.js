/* globals window document localStorage */
/**
 * Methods to store current state of play to be retrieved at a later date
 */
import store from 'store'

const localGameStorage = {
  setStateToLocalStorage(state) {
    const stateEntries = Object.entries(state)
    store.set('game', stateEntries)
  },
  getStateFromLocalStorage() {
    return store.get('game')
  },
  clearLocalGameStorage() {
    store.clearAll()
  },
}

export default localGameStorage
