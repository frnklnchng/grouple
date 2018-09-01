import {SET_CURRENT_USER} from '../actions/session_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
  case SET_CURRENT_USER:
    return { [action.payload.id]: action.payload.name };
  default:
    return state;
  }
};