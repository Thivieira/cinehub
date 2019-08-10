import {
  TOOGLE_LOADING,
  FETCH_CONFIGURATION,
  FETCH_POPULAR_MOVIES,
} from '../actions/moviesActions';

const INITIAL_STATE = {
  loading: false,
  movies: [],
  configuration: null,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOOGLE_LOADING:
      return Object.assign({}, state, {
        loading: action.bool,
      });
    case FETCH_CONFIGURATION:
      return Object.assign({}, state, {
        configuration: action.data,
      });
    case FETCH_POPULAR_MOVIES:
      return Object.assign({}, state, {
        movies: state.movies.concat(action.data.results),
      });
    default:
      return state;
  }
}
