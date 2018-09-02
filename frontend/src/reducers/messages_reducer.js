import { merge } from 'lodash';
import { RECEIVE_MESSAGE, GET_ALL_MESSAGES, RECEIVE_MESSAGE_ERRORS } from '../util/message_util';

const _defaultState = {};

const messagesReducer = (messagesState = _defaultState, action) => {
  Object.freeze(messagesState);
  const newMessagesState = merge(messagesState, {});

  switch (action.type) {
  case RECEIVE_MESSAGE:
    newMessagesState[action.message.id] = action.message;
    return newMessagesState;

  case GET_ALL_MESSAGES:
    return Object.assign({}, action.payload);

  default:
    return messagesState;
  }
};

export default messagesReducer;