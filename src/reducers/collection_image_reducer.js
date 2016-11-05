import { FETCH_FEATURED_IMAGE } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_FEATURED_IMAGE:
      return { ...state, image: action.payload };
    default:
  }

  return state;
}
