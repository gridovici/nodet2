import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../actions';
import * as constants from '../constants';

const Login = ({ authenticateUser, authenticated }) => (
    <div>
      <h2>Please Login</h2>
      <form onSubmit={authenticateUser}>
        <input type="text" placeholder="username" name="username" defaultValue="John Doe" />
        <input type="password" placeholder="password" name="password" defaultValue="" />
        {authenticated === constants.NOT_AUTHENTICATED ? <p>Login incorrect</p> : null}
        <button type="submit">Login</button>
      </form>
    </div>
);

Login.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  authenticated: PropTypes.string
};

const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated
});

const mapDispatchToProps = dispatch => ({
  authenticateUser(e) {
    e.preventDefault(); // so the page does not refresh
    const username = e.target.username.value;
    const password = e.target.password.value;
    dispatch(actions.requestAuthenticateUser(username, password));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
