import React from 'react';
import { Link } from 'react-router-dom';
import { signup, login } from '../../util/session_api_util';
import { connect } from 'react-redux';
import SessionForm from './session_form'; 

const formType = (location) => {
  let type = location.pathname.slice(1) === 'signup' ? 'signup' : 'login';

  return type;
};

const navType = (location) => {
  if (formType(location) === 'signup') {
    return (
      <div>Already have an account? <Link to="/login">Sign In</Link></div>
    );
  }

  return (
    <div>Don't have an account? <Link to="/signup">Sign Up</Link></div>
  );
};

const mapStateToProps = ({ errors }, { location }) => {
  return {
    errors: errors.session,
    formType: formType(location),
    navLink: navType(location)
  };
};

const mapDispatchToProps = (dispatch, { location }) => {
  const processForm = formType(location) === 'signup' ? signup : login;

  return {
    processForm: (user) => dispatch(processForm(user)),
    // demo: (user) => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);