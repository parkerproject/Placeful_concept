import { FETCH_COLLECTIONS } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_COLLECTIONS:
      return { ...state, collections: action.payload };
    default:
  }

  return state;
}
