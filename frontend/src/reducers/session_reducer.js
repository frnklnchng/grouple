import { SET_CURRENT_USER } from '../actions/session_actions';

const _nullUser = Object.freeze({
  id: null
});

const sessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch(action.type) {
     
    case SET_CURRENT_USER:
      return { id: action.payload.id,
              email: action.payload.name,
              visitedChats: action.payload.visitedChats };
    default:
      return state; 
  }
};

export default sessionReducer;
