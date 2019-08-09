import axios from 'axios';

export const TOOGLE_LOADING = 'TOOGLE_LOADING';
export const FETCH_POPULAR_MOVIES = 'FETCH_POPULAR_MOVIES';

export function toggleLoading(bool) {
  return { type: TOOGLE_LOADING, bool };
}

export function popularMoviesWasFetched(data) {
  return { type: FETCH_POPULAR_MOVIES, data };
}

export function fetchPopularMovies(location) {
  return (dispatch, getState) => {
    dispatch(toggleLoading(true));
    axios
      .get(`movies/popular?lang=${lang}&page=${page}`)
      .then(data => {
        let parsedJson = JSON.parse(data);
        dispatch(popularMoviesWasFetched(parsedJson));
        dispatch(toggleLoading(false));
      })
      .catch(err => console.log(err));
  };
}
