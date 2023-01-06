import { createSlice } from '@reduxjs/toolkit'

export const tradeList = createSlice({
    name: 'tradeList',
    initialState: {
        list: []
    },
    reducers: {
        setTrades: (state, action) => {
            state.list = action.payload
        },
    },
})


export const { setTrades } = tradeList.actions


export default tradeList.reducer