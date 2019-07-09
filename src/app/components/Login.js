import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../actions';
import * as constants from '../constants';

const Login = ({ authenticateUser, authenticated }) => (
    <div className="card p-3 col-6">
      <h2>Please Login</h2>
      <form onSubmit={authenticateUser}>
        <input
          className="form-control"
          type="text"
          placeholder="username"
          name="username"
          defaultValue="Dev" />
        <input
          className="form-control p-2 mt-2"
          type="password"
          placeholder="password"
          name="password"
          defaultValue="TUPLES" />
        {authenticated === constants.NOT_AUTHENTICATED ? <p>Login incorrect</p> : null}
        <button type="submit" className="form-control btn btn-primary mt-2">Login</button>
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
