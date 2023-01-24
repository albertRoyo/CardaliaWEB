/*
Trade reducer

This is a slice of the Redux store that manages the data related to trading. 

It has an initial state with an empty list called 'list' to store the trades and one 
exported action, setTrades, that updates the list with the payload received.
*/

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