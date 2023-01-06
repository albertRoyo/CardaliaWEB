import { configureStore } from '@reduxjs/toolkit'

import cardsListReducer from './reducers/CardsList.reducer'
import tradeListReducer from './reducers/TradeList.reducer'
import dataUserReducer from './reducers/UserData.reducer'

export default configureStore({
  reducer: {
    cardsList: cardsListReducer,
    userData: dataUserReducer,
    tradeList: tradeListReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

