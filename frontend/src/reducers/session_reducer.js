import { 
  SET_CURRENT_USER, 
} from '../actions/session_actions';

import {
  SET_CURRENT_VISITED_CHATS
} from '../util/session_api_util';

const _nullUser = Object.freeze({
  id: null
});

const sessionReducer = (state = _nullUser, action) => {
  let nextState = {};
  Object.freeze(state);

  switch(action.type) {
     
    case SET_CURRENT_USER:
      return { id: action.payload.id,
              email: action.payload.name,
              // visitedChats: action.payload.visitedChats 
            };
    case SET_CURRENT_VISITED_CHATS:
      nextState = Object.assign({}, state, action.payload);
      nextState.visitedChats = action.payload.visitedChats;
      // debugger
      return nextState;

    default:
      return state; 
  }
};

export default sessionReducer;
