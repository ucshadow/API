import { Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';

import Home from '../Components/Home';
import About from '../Components/About';
import NotFound from '../Components/NotFound';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/about' component={About}/>
      <Route path='*' component={NotFound}/>
    </Switch>
  </main>
);

export default Main;