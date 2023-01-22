import { createSlice } from '@reduxjs/toolkit'

export const tradeData = createSlice({
    name: 'tradeData',
    initialState: {
        list: []
    },
    reducers: {
        setTrades: (state, action) => {
            state.list = action.payload
        },
    },
})


export const { setTrades } = tradeData.actions


export default tradeData.reducer