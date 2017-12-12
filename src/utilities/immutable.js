// adopted from https://redux.js.org/recipes/structuringreducers/immutableupdatepatterns
export const updateItemOpenState = (items, action) => {
  const updatedItem = items.map((item, index) => {
    if (index !== action.item.index) {
      return {
        ...item,
        open: false,
      }
    }
    return {
      ...item,
      open: action.item.open,
      matched: action.item.matched,
    }
  })
  return updatedItem
}

export const mergeItems = (items, action) => {
  let actionIndices = new Map()

  actionIndices = action.map(actionItem => actionItem.index)
  return items.map((item, index) => {
    const itemMatch = actionIndices.includes(index)
    if (itemMatch) {
      return action.find(returnedItem => returnedItem.index === index)
    }
    return item
  })
}
