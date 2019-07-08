import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import history from '../store/history';
import NavigationContainer from './Navigation';
import DashboardContainer from './Dashboard';
import TaskDetailContainer from './TaskDetail';
import Login from './Login';
import store from '../store';

const RouteGuard = Component => ({ match }) => (!store.getState().session.authenticated
  ? <Redirect to="/"/>
  : <Component match={match}/>);

const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div>
                <NavigationContainer />
                <Route exact path="/" component={Login} />
                <Route
                    exact
                    path="/dashboard"
                    render={RouteGuard(DashboardContainer)} />
                <Route
                    exact
                    path="/task/:id"
                    render={RouteGuard(TaskDetailContainer)} />
            </div>
        </Provider>
    </Router>
);

export default Main;
