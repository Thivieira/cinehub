import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import moviesReducer from './reducers/movies';

const initialState = {};

function root(state = initialState, action) {
  return state;
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : compose;

const store = createStore(
  combineReducers({
    root,
    movies: moviesReducer,
  }),
  compose(
    applyMiddleware(thunk),
    composeEnhancers,
  ),
);

/* eslint-enable */
export default store;
