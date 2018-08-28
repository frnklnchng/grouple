import Messenger from './messenger';
import { connect } from 'react-redux';
// import { fetchMessages } from '../../actions/message_actions';

const mapStateToProps = (state) => {
  return {
    // messages: Object.values(state.entities.messages) || []
    messages: ['a','a','a']
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchMessages: () => dispatch(fetchMessages())
  };
};

const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(Messenger);
export default MessengerContainer;