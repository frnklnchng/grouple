import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Chatroom from './chatroom';
import { fetchAllMessages, postMessage } from '../../util/message_util'
//import respective chatroom api utils

const mapStateToProps = (state, ownProps) => {
  return {
    msgs: Object.values(state.entities.msgs),
    currentUser: state.session.email,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllMessages: () => dispatch(fetchAllMessages()),
    postMessage: (message) => dispatch(postMessage(message)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);