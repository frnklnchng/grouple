import { connect } from 'react-redux';
import Chatroom from './chatroom';
import { fetchAllMessages, postMessage } from '../../util/message_util';

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);