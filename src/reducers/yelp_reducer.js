import { FETCH_YELP } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_YELP:
      return { ...state, yelp_data: action.payload };
    default:
  }

  return state;
}
