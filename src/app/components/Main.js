import React from 'react';
import { Provider } from 'react-redux';
import Dashboard from './Dashboard';
import store from '../store';

const Main = () => (
    <Provider store={store}>
        <Dashboard />
    </Provider>
);

export default Main;
