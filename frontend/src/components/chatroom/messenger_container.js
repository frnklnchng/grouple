import Messenger from './messenger';
import { connect } from 'react-redux';
import { fetchAllMessages, postMessage } from '../../util/message_util';

const mapStateToProps = (state) => {
  return {
    messages: Object.values(state.entities.msgs) || [],
    currentUser: state.session.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllMessages: () => dispatch(fetchAllMessages()),
    postMessage: (message) => dispatch(postMessage(message)),
  };
};

const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(Messenger);
export default MessengerContainer;