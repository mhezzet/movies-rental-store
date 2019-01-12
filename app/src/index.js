import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Apollo from './store'

ReactDOM.render(
  <Apollo>
    <App />
  </Apollo>,
  document.getElementById('root')
)
