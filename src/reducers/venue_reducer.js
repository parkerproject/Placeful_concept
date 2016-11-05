import { FETCH_VENUE } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_VENUE:
      return { ...state, venue: action.payload };
    default:
  }

  return state;
}
