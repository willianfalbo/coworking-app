import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewSpot from './pages/NewSpot'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/Dashboard" component={Dashboard} />
                <Route path="/NewSpot" component={NewSpot} />
            </Switch>
        </BrowserRouter>
    );
}
