import React from 'react';
import { connect } from 'react-redux';
import ChatIndex from './chatroom_index';
import { patchChats } from '../../util/session_api_util';
//import respective chatroom api utils

const mapStateToProps = (state, ownProps) => {
  return {
    id: state.session.id,
    visitedChats: state.session.visitedChats
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateChats: (userData) => dispatch(patchChats(userData))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatIndex);