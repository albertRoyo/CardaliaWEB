/*
User data reducer

This is a redux slice of the Redux store thatis responsible for managing the state of the user's data 
such as their username, email and token. 

The initial state is an object with three properties: username, email, and token, all set to an empty string.

The slice has two reducers, setUserData and resetUserData. The setUserData reducer is responsible for setting 
the user's data in the state and the resetUserData reducer is responsible for resetting the state of 
the user data to its initial state.

The slice also exports two action creators, setUserData and resetUserData, that correspond to the two reducers.
*/

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