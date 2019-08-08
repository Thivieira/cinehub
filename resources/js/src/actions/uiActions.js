import request from '../services/request';
import { normalizeString } from '../helpers';

export const TOOGLE_LOADING = 'TOOGLE_LOADING';
export const TOGGLE_SUGGESTIONS = 'TOGGLE_SUGGESTIONS';
export const TOGGLE_CARD = 'TOGGLE_CARD';
export const FETCH_CITY = 'FETCH_CITY';

export function toggleLoading(bool) {
  return { type: TOOGLE_LOADING, bool };
}

export function toggleCard(bool) {
  return { type: TOGGLE_CARD, bool };
}

export function toggleSuggestions(bool) {
  return { type: TOGGLE_SUGGESTIONS, bool };
}

export function cityWasFetched(data) {
  return { type: FETCH_CITY, data };
}

export function fetchCity(location) {
  return (dispatch, getState) => {
    dispatch(toggleLoading(true));
    let capitalIndex = getState().card.capitais.findIndex(
      capital => normalizeString(capital) === normalizeString(location),
    );
    capitalIndex = getState().card.capitais.length < capitalIndex ? capitalIndex : capitalIndex;
    let value = getState().card.capitaisCode[capitalIndex];
    request.get(
      `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${value}&format=json&u=c`,
      null,
      null,
      function(err, data, result) {
        if (err) {
          console.log(err);
        } else {
          let parsedJson = JSON.parse(data);
          dispatch(cityWasFetched(parsedJson));
          dispatch(toggleSuggestions(false));
          dispatch(toggleLoading(false));
          dispatch(toggleCard(true));
        }
      },
    );
  };
}
