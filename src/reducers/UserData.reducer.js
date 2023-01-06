import { createSlice } from '@reduxjs/toolkit'

export const userData = createSlice({
  name: 'userData',
  initialState: {
    username: "",
    token: "",
  },
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload
    },
    setUserToken: (state, action) => {
      state.token = action.payload
    },
  },
})

export const { setUserName, setUserToken } = userData.actions

export default userData.reducer