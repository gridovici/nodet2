import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const NavigationComponent = () => (
    <div>
        <Link to="/dashboard">
            <h1>
                Show Dashboard
            </h1>
        </Link>
    </div>
);

export default connect(state => state)(NavigationComponent);
