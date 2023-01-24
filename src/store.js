/*
Store

This file exports the default configuration of a Redux store, which includes the combination of three 
different reducers: cardsList, userData, and tradeData. The store is also configured with the default 
middleware provided by the "redux-toolkit" library. This store can be imported and used in the application 
to manage the global state.
*/

import { configureStore } from '@reduxjs/toolkit'

import cardsListReducer from './reducers/CardsList.reducer'
import tradeDataReducer from './reducers/TradeData.reducer'
import dataUserReducer from './reducers/UserData.reducer'

export default configureStore({
  reducer: {
    cardsList: cardsListReducer,
    userData: dataUserReducer,
    tradeData: tradeDataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

