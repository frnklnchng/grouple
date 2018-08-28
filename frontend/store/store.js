import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';
import { createStore, applyMiddleware } from 'redux';

const _defaultState = {};

const configureStore = (preloadedState = _defaultState) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
};

export default configureStore;