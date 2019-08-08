// import { TOGGLE_CARD, TOGGLE_SUGGESTIONS, TOOGLE_LOADING, FETCH_CITY } from '../actions/uiActions';

const INITIAL_STATE = {
  loading: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    // case TOOGLE_LOADING:
    //   return Object.assign({}, state, {
    //     loading: action.bool,
    //   });
    // case TOGGLE_SUGGESTIONS:
    //   return Object.assign({}, state, {
    //     isSuggestionsOpen: action.bool,
    //   });
    // case TOGGLE_CARD:
    //   return Object.assign({}, state, {
    //     isCardOpen: action.bool,
    //   });
    // case FETCH_CITY:
    //   return Object.assign({}, state, {
    //     selectedCapitalForecast: action.data,
    //   });
    default:
      return state;
  }
}
