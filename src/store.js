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

