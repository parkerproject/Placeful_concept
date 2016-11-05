import { FETCH_SINGLE_PROMO } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_SINGLE_PROMO:
      return { ...state, promo: action.payload };
    default:
  }

  return state;
}
