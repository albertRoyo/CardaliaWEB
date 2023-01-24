/*
Collection reducer
This is a Redux slice of the Redux store called cardsList that is responsible for managing the state of the user's 
collection of cards.

The slice has an initial state of an empty list, and it contains several reducers that update the 
state based on specific actions. The reducers are:

- setCardsList: sets the list of cards to a new payload (an array of card objects)
- addCard: adds a new card object to the list
- incCard: increases the count of a card object in the list
- decCard: decreases the count of a card object in the list, and removes the card if the count is zero
- modVersionCard: modifies the version_id, set_name, set, collector_number and image_uris.large of a card object in the list
- modExtrasCard: modifies the extras of a card object in the list
- modConditionCard: modifies the condition of a card object in the list

The slice also exports the actions for each of these reducers, which can be used to update the state in other parts of the application.
*/

import { createSlice } from '@reduxjs/toolkit'

export const cardsList = createSlice({
  name: 'cardsList',
  initialState: {
    list: [],
  },
  reducers: {
    setCardsList: (state, action) => {
      state.list = action.payload
    },
    addCard: (state, action) => {
      const index = state.list.findIndex((card) => (card.version_id === action.payload.id && card.extras === "Non Foil" && card.condi === "Near Mint"))
      if (index !== -1) {
        ++state.list[index].count
      }
      else state.list.push({
        version_id: action.payload.id,
        oracle_id: action.payload.oracle_id,
        name: action.payload.name,
        count: 1,
        image_uris: {
          small: action.payload.image_uris.small,
          large: action.payload.image_uris.large
        },
        set_name: action.payload.set_name,
        set: action.payload.set,
        collector_number: action.payload.collector_number,
        extras: "Non Foil",
        condi: "Near Mint"
      })
    },
    incCard: (state, action) => {
      const index = action.payload
      ++state.list[index].count
    },
    decCard: (state, action) => {
      const index = action.payload
      if (state.list[index].count > 1) --state.list[index].count
      else state.list.splice(index, 1)
    },
    modVersionCard: (state, action) => {
      const index = action.payload.id
      state.list[index].version_id = action.payload.newId
      state.list[index].set_name = action.payload.set_name
      state.list[index].set = action.payload.set
      state.list[index].collector_number = action.payload.collector_number
      state.list[index].image_uris.large = action.payload.img
    },
    modExtrasCard: (state, action) => {
      const index = action.payload.id
      state.list[index].extras = action.payload.extras
    },
    modConditionCard: (state, action) => {
      const index = action.payload.id
      state.list[index].condi = action.payload.condi
    }
  },
})


export const { setCardsList, addCard, incCard, decCard, modVersionCard, modExtrasCard, modConditionCard } = cardsList.actions


export default cardsList.reducer