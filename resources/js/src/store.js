import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import moviesReducer from './reducers/movies';

const initialState = {};

function root(state = initialState, action) {
  return state;
}
/* eslint-disable no-underscore-dangle */
const store = createStore(
  combineReducers({
    root,
    movies: moviesReducer,
  }),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

/* eslint-enable */
export default store;
