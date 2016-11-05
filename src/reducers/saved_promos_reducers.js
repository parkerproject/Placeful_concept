import { FETCH_SAVED_PROMOS } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_SAVED_PROMOS:
      return { ...state, saved_promos: action.payload };
    default:
  }
  return state;
}
