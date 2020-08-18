import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../src/views/loginPage/loginPage';
import Home from '../src/views/homePage/homePage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/home' component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
