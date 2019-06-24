import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import history from '../store/history';
import NavigationContainer from './Navigation';
import DashboardContainer from './Dashboard';
import TaskDetailContainer from './TaskDetail';
import store from '../store';

const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div>
                <NavigationContainer />
                <Route
                    exact
                    path="/dashboard"
                    render={() => (<DashboardContainer />)} />
                <Route
                    exact
                    path="/task/:id"
                    render={({ match }) => (<TaskDetailContainer match={match} />)} />
            </div>
        </Provider>
    </Router>
);

export default Main;
