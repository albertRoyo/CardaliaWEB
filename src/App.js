/*
App

This is the main App component of the application. It wraps the entire web views in a BrowserRouter 
component from the react-router-dom library. This allows the application to handle client-side routing.

The component imports and renders the Views component, which is responsible for rendering the appropriate 
view depending on whether the user is logged in or not. The Views component also renders the AppBar, which 
is the navigation bar that appears at the top of the screen on every view.
*/

import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"

import { Views } from './pages/Views'

export function App() {

  return (
    <div>
      <Router>
        <Views />
      </Router>
    </div>
  )
}

