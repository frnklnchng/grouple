import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Chatroom from './chatroom';
import { fetchAllMessages } from '../../util/message_util'
//import respective chatroom api utils

const mapStateToProps = (state, ownProps) => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllMessages: () => dispatch(fetchAllMessages()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);