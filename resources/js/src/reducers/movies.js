import { TOOGLE_LOADING, FETCH_POPULAR_MOVIES } from '../actions/uiActions';

const INITIAL_STATE = {
  loading: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOOGLE_LOADING:
      return Object.assign({}, state, {
        loading: action.bool,
      });
    case FETCH_POPULAR_MOVIES:
      return Object.assign({}, state, {
        movies: action.data,
      });
    default:
      return state;
  }
}
