import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import RegisterPage from './views/RegisterPage'
import NotFound from './views/NotFound'
import LandPage from './views/LandPage'

export default function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  )
}
