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
      console.log("action: ", action.payload)
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