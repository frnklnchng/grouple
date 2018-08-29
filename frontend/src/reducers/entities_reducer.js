import {combineReducers} from 'redux';
import users from './users_reducer';
import msgs from './messages_reducer';

export default combineReducers({
  users,
  msgs
});