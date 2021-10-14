import React, { Component, Fragment } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import HomePage from './containers/HomePage';
import DetailsPage from './containers/DetailsPage';

const App  = () => {
    return(
    <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shops/:slug" component={DetailsPage} />
        </Switch>
    </Router>
    )
}

export default App