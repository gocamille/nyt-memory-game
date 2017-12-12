import CardUIActions from '../../components/actions/CardUIActions'

export const filterCardsByLevel = (data, level) => {
  const filteredCards = data.levels
    .filter(item => item.difficulty === level)
    .map(item => item.cards)

  return filteredCards.reduce((curr, cards) => curr.concat(cards), [])
}

export const normalizeCardData = cards => {
  const shuffledCards = CardUIActions.shuffleCards(cards)
  const normalizedCards = shuffledCards.map((value, index) => {
    const cardObject = {
      face: value,
      open: false,
      matched: false,
      index,
    }
    return cardObject
  })
  return normalizedCards
}

export const normalizedOtherData = () => {}
