import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import Home from './views/home'
import NotFound from './views/not-found'
import  NearbyDonors  from './views/nearbyDonors'
import DonationRequestForm from './views/DonationRequestForm'
import login from './views/login'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={NearbyDonors} path="/nearby-donors" />
        <Route component={DonationRequestForm} path="/request" />
        <Route component={login} path="/login" />
        <Route component={NotFound} path="**" />
        
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
