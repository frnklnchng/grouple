import {
  GET_ALL_MESSAGES
} from '../util/message_util';

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case GET_ALL_MESSAGES:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
export default messagesReducer;