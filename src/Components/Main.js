import { Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';

import Home from '../Components/Home';
import NotFound from '../Components/NotFound';

const Main = () => (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='*' component={NotFound}/>
    </Switch>
);

export default Main;