/*
Index

This code uses the ReactDOM.createRoot() method to create a root element of the hole application and 
render it to the DOM. 

It also wraps the App component in a Provider component, which is provided by the react-redux library. 
The Provider component is used to make the store available to all the components in the App component. 
This allows the components to access and update the store's state and dispatch actions to update the state.
*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { App } from './App'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)