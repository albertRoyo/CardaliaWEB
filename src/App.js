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
  );
}

