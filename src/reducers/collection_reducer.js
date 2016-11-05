import { FETCH_COLLECTION } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_COLLECTION:
      return { ...state, collection: action.payload };
    default:
  }

  return state;
}
