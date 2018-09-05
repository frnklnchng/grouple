import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Chatroom from './chatroom';
import { fetchAllMessages, postMessage } from '../../util/message_util';
import { patchChats } from '../../util/session_api_util';
//import respective chatroom api utils

const mapStateToProps = (state, ownProps) => {
  return {
    // subredditName:  state.entities.subreddits[ownProps.match.params.subreddit],
    subredditId: ownProps.match.params.id,
    msgs: Object.values(state.entities.msgs),
    currentUser: state.session.email,
    currentUserId: state.session.id,
    visitedChats: state.session.visitedChats
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllMessages: () => dispatch(fetchAllMessages()),
    postMessage: (message) => dispatch(postMessage(message)),
    patchChats: (userData) => dispatch(patchChats(userData)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);