import Messenger from './messenger';
import { connect } from 'react-redux';
import { fetchMessages } from '../../util/message_util';

const mapStateToProps = (state) => {
  return {
    messages: [
      { id: 1, text: 'hello' },
      { id: 2, text: 'mongo' },
      { id: 3, text: 'bongo' }
    ]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: () => dispatch(fetchMessages())
  };
};

const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(Messenger);
export default MessengerContainer;