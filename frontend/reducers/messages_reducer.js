import { merge } from 'lodash';
import { RECEIVE_MESSAGES } from '../actions/message_actions';

const _defaultState = {};

const messagesReducer = (messagesState = _defaultState, action) => {
  Object.freeze(messagesState);
  const newHomesState = merge({}, messagesState);

  switch (action.type) {
    case RECEIVE_MESSAGES:
      return action.messages;
    default:
      return messagesState;
  }
};

export default messagesReducer;