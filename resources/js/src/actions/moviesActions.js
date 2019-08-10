import axios from 'axios';
import Cookies from 'universal-cookie';

export const TOOGLE_LOADING = 'TOOGLE_LOADING';
export const FETCH_CONFIGURATION = 'FETCH_CONFIGURATION';
export const FETCH_POPULAR_MOVIES = 'FETCH_POPULAR_MOVIES';

export function toggleLoading(bool) {
  return { type: TOOGLE_LOADING, bool };
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
        .get(`api/configuration`)
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

export function fetchPopularMovies(obj = {}) {
  return (dispatch, getState) => {
    dispatch(toggleLoading(true));

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
      .get(`api/movies/popular${str}`)
      .then(data => {
        dispatch(popularMoviesWasFetched(data.data));
        dispatch(toggleLoading(false));
      })
      .catch(err => console.log(err));
  };
}
