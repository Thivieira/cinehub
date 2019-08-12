import {
  TOOGLE_LOADING,
  TOOGLE_INFINITE_LOADING,
  TOGGLE_SUGGESTIONS,
  FETCH_CONFIGURATION,
  UNFETCH_MOVIE,
  FETCH_MOVIE,
  FETCH_POPULAR_MOVIES,
  FETCH_TRENDING_MOVIES,
  FETCH_SEARCHED_MOVIES,
} from '../actions/moviesActions';

const INITIAL_STATE = {
  loading: false,
  iLoading: false,
  movies: [],
  activeMovie: null,
  suggestions: [],
  configuration: null,
  isSuggestionsOpen: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOOGLE_LOADING:
      return Object.assign({}, state, {
        loading: action.bool,
      });
    case TOGGLE_SUGGESTIONS:
      return Object.assign({}, state, {
        isSuggestionsOpen: action.bool,
      });
    case TOOGLE_INFINITE_LOADING:
      return Object.assign({}, state, {
        iLoading: action.bool,
      });
    case FETCH_CONFIGURATION:
      return Object.assign({}, state, {
        configuration: action.data,
      });
    case UNFETCH_MOVIE:
      return Object.assign({}, state, {
        activeMovie: null,
      });
    case FETCH_MOVIE:
      return Object.assign({}, state, {
        activeMovie: action.data,
      });
    case FETCH_TRENDING_MOVIES:
      return Object.assign({}, state, {
        suggestions: action.data.results,
      });
    case FETCH_SEARCHED_MOVIES:
      return Object.assign({}, state, {
        suggestions: action.data.results,
      });
    case FETCH_POPULAR_MOVIES:
      return Object.assign({}, state, {
        movies: state.movies.concat(action.data.results),
      });
    default:
      return state;
  }
}
