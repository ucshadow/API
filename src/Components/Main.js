import { Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';

//3221B7028177669B2617814FECA4A67B

import Home from '../Components/Home';
import About from '../Components/About';
import NotFound from '../Components/NotFound';

const Main = () => (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/about' component={About}/>
      <Route path='*' component={NotFound}/>
    </Switch>
);

export default Main;