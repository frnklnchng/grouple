import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../util/session_api_util';
import SessionForm from '../session_form';

const mstp = ({errors}) => {
  return {
    errors: errors.session, 
    formType: 'signup',
    navLink: <Link to="/login">log in</Link>,
  };
};

const mdtp = (dispatch) => {
  return {
    processForm: (user) => dispatch(registerUser(user)),
  };
};

export default connect(mstp, mdtp)(SessionForm);