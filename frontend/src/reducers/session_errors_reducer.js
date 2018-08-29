import { GET_ERRORS} from '../util/session_api_util';
import { SET_CURRENT_USER } from '../actions/session_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case SET_CURRENT_USER:
      return [];
    default:
      return state;
  }
};