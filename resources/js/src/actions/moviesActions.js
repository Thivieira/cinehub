import axios from 'axios';
import Cookies from 'universal-cookie';

export const TOOGLE_LOADING = 'TOOGLE_LOADING';
export const FETCH_CONFIGURATION = 'FETCH_CONFIGURATION';
export const TOGGLE_SUGGESTIONS = 'TOGGLE_SUGGESTIONS';
export const FETCH_MOVIE = 'FETCH_MOVIE';
export const UNFETCH_MOVIE = 'UNFETCH_MOVIE';
export const TOOGLE_INFINITE_LOADING = 'TOOGLE_INFINITE_LOADING';
export const FETCH_POPULAR_MOVIES = 'FETCH_POPULAR_MOVIES';
export const FETCH_TRENDING_MOVIES = 'FETCH_TRENDING_MOVIES';
export const FETCH_SEARCHED_MOVIES = 'FETCH_SEARCHED_MOVIES';

export function toggleLoading(bool, i = false) {
  if (i) {
    return { type: TOOGLE_INFINITE_LOADING, bool };
  }
  return { type: TOOGLE_LOADING, bool };
}

export function toggleSuggestions(bool) {
  return { type: TOGGLE_SUGGESTIONS, bool };
}

export function movieWasFetched(data) {
  return { type: FETCH_MOVIE, data };
}

export function moviesSearchWasFetched(data) {
  return { type: FETCH_SEARCHED_MOVIES, data };
}

export function trendingMoviesWasFetched(data) {
  return { type: FETCH_TRENDING_MOVIES, data };
}

export function popularMoviesWasFetched(data) {
  return { type: FETCH_POPULAR_MOVIES, data };
}

export function configurationWasFetched(data) {
  return { type: FETCH_CONFIGURATION, data };
}

export function fetchConfiguration() {
  const cookies = new Cookies();
  if (!cookies.get('configuration')) {
    return (dispatch, getState) => {
      dispatch(toggleLoading(true));
      axios
        .get(`configuration`)
        .then(data => {
          cookies.set('configuration', data.data, { path: '/' });
          dispatch(configurationWasFetched(data.data));
          dispatch(toggleLoading(false));
        })
        .catch(err => console.log(err));
    };
  } else {
    return (dispatch, getState) => {
      dispatch(configurationWasFetched(cookies.get('configuration')));
    };
  }
}

export function fetchMovie(obj) {
  return (dispatch, getState) => {
    dispatch(toggleLoading(true));
    let str = '?';
    if ('lang' in obj) {
      str += `lang=${obj.lang}`;
    }
    axios
      .get(`movie/${obj.id}${str}`)
      .then(data => {
        dispatch(movieWasFetched(data.data));
        dispatch(toggleLoading(false));
      })
      .catch(err => console.log(err));
  };
}

export function fetchTrendingMovies() {
  return (dispatch, getState) => {
    dispatch(toggleLoading(true));
    axios
      .get(`movies/trending`)
      .then(data => {
        dispatch(trendingMoviesWasFetched(data.data));
        dispatch(toggleLoading(false));
      })
      .catch(err => console.log(err));
  };
}

export function fetchPopularMovies(obj = {}) {
  return (dispatch, getState) => {
    let i = false;

    if ('infinite' in obj) {
      console.log(obj);
      i = true;
    }

    dispatch(toggleLoading(true, i));

    let str = '?';
    if ('lang' in obj) {
      str += `lang=${obj.lang}`;
    }

    if ('page' in obj) {
      if (str != '?') {
        str += `&page=${obj.page}`;
      } else {
        str += `page=${obj.page}`;
      }
    }

    axios
      .get(`movies/popular${str}`)
      .then(data => {
        dispatch(popularMoviesWasFetched(data.data));
        dispatch(toggleLoading(false, i));
      })
      .catch(err => console.log(err));
  };
}

export function searchMovies(location) {
  return (dispatch, getState) => {
    dispatch(toggleLoading(true));
    // let capitalIndex = getState().card.capitais.findIndex(
    //   capital => normalizeString(capital) === normalizeString(location),
    // );
    // capitalIndex = getState().card.capitais.length < capitalIndex ? capitalIndex : capitalIndex;
    // let value = getState().card.capitaisCode[capitalIndex];
    dispatch(toggleSuggestions(false));
    dispatch(toggleLoading(false));
  };
}

function normalizeString(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
