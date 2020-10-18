import React from 'react'
import { Switch, Route } from "react-router";
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Movie from './components/Movie';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/about">
                <About />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <ProtectedRoute path='/movie' component={Movie} />
        </Switch>
    )
}

export default Routes
