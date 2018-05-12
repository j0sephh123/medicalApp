import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from '../components/home';
import Create from '../components/create';


const routes = () => {
  return (
    <Switch>
      <Route path='/create' component={Create} />
      <Route path='/' component={Home} />
    </Switch>
  );
}

export default routes;