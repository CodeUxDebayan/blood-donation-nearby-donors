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
import Login from './views/login'
import Signup from './views/signup'
import becomeDonor from './views/becomeDonor'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={NearbyDonors} path="/nearby-donors" />
        <Route component={DonationRequestForm} path="/request" />
        <Route component={Login} path="/login" />
        <Route component={Signup} path="/signup" />
        <Route component={becomeDonor} path="/become-donor" />
        <Route component={NotFound} path="**" />
        
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
