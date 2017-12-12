import 'es6-promise'
import 'isomorphic-fetch'

/**
 * Function to fetch all cards available
 * @return {Object}
 */
const fetchCards = () =>
  fetch(`https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json`).then(response =>
    response.json()
  )

export default fetchCards
