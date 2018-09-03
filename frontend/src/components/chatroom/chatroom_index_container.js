import React from 'react';
import { connect } from 'react-redux';
import ChatIndex from './chatroom_index';
//import respective chatroom api utils

const mapStateToProps = (state, ownProps) => {
  return {
    // subredditName:  state.entities.subreddits[ownProps.match.params.subreddit],
    visitedChats: state.session.visitedChats
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatIndex);