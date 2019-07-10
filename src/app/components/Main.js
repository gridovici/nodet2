/* eslint-disable react/display-name, react/prop-types */
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import history from '../store/history';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import TaskDetail from './TaskDetail';
import Login from './Login';
import SignUp from './SignUp';
import store from '../store';

const RouteGuard = Component => ({ match }) => (!store.getState().session.authenticated
  ? <Redirect to="/"/>
  : <Component match={match}/>);

const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div className="container mt-3">
                <Navigation />
                <Route exact path="/" render={() => <Login />} />
                <Route exact path="/signup" render={() => <SignUp />}/>
                <Route
                    exact
                    path="/dashboard"
                    render={RouteGuard(Dashboard)} />
                <Route
                    exact
                    path="/task/:id"
                    render={RouteGuard(TaskDetail)} />
            </div>
        </Provider>
    </Router>
);

export default Main;
