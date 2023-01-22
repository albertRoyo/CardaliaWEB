import { createSlice } from '@reduxjs/toolkit'

export const userData = createSlice({
  name: 'userData',
  initialState: {
    username: "",
    email: "",
    token: "",
  },
  reducers: {
    setUserData: (state, action) => {
      state.username = action.payload.username
      state.email = action.payload.email
      state.token = action.payload.token
    },
    resetUserData: (state, action) => {
      state.username = ""
      state.email = ""
      state.token = ""
    },
  },
})

export const { setUserData, resetUserData } = userData.actions

export default userData.reducer