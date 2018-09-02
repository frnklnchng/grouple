import { RECEIVE_MESSAGE_ERRORS } from '../util/message_util';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MESSAGE_ERRORS:
      return action.errors;
    default:
      return state;
  }
};