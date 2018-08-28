import { combineReducers } from 'redux';
import messagesReducer from './messages_reducer';

const entitiesReducer = combineReducers({
  messages: messagesReducer
});

export default entitiesReducer;
