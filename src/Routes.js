import React from "react";
import { HashRouter, Switch, Route } from 'react-router-dom';
import UsersDice from "./pages/UserDice";
import Home from "./pages/Home";
import EditUser from "./pages/EditUser";

function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/busca' component={UsersDice} />
        <Route path='/edit/:id' component={EditUser} />
      </Switch>
    </HashRouter>
  )
}

export default Routes;