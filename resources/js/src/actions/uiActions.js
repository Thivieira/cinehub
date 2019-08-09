export const TOOGLE_LOADING = 'TOOGLE_LOADING';
export const TOGGLE_SUGGESTIONS = 'TOGGLE_SUGGESTIONS';
export const TOGGLE_CARD = 'TOGGLE_CARD';

export function toggleLoading(bool) {
  return { type: TOOGLE_LOADING, bool };
}

export function toggleCard(bool) {
  return { type: TOGGLE_CARD, bool };
}

export function toggleSuggestions(bool) {
  return { type: TOGGLE_SUGGESTIONS, bool };
}
