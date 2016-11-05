import { SELECTED_CITY } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SELECTED_CITY:
      return { ...state, city: action.payload };
    default:
  }

  return state;
}
