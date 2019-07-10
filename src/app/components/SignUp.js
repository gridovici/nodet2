import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as constants from '../constants';
import * as actions from '../actions';

export const SignupComponent = ({ requestCreateUserAccount, authenticated }) => (
  <div className="card p-3 col-6">
        <h2>
            Complete the following form to create a new account.
        </h2>

        <form onSubmit={requestCreateUserAccount}>
            <label>
                <span>User Name</span>
                <input type="text" placeholder="username" name="username" defaultValue="Morty" className="form-control"/>
            </label>
            <label>
                <span>Password</span>
                <input type="text" placeholder="password" name="password" defaultValue="COURAGE" className="form-control mt-2"/>
            </label>

            {authenticated === constants.USERNAME_RESERVED
              ? <p>A user by that name already exists.</p>
              : null}
            <button type="submit" className="form-control mt-2 btn btn-primary">Sign Up</button>
        </form>
  </div>
);

SignupComponent.propTypes = {
  requestCreateUserAccount: PropTypes.func.isRequired,
  authenticated: PropTypes.string
};

const mapStateToProps = state => ({
  authenticated: state.session.authenticated
});

const mapDispatchToProps = dispatch => ({
  requestCreateUserAccount(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    console.log('Creating!', username, password);
    dispatch(actions.requestCreateUserAccount(username, password));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupComponent);
