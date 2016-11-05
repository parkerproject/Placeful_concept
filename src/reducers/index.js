import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import promosReducer from './promos_reducer';
import savedPromosReducer from './saved_promos_reducers';
import promoReducer from './promo_reducer';
import authReducer from './auth_reducer';
import collectionsReducer from './collections_reducer';
import collectionReducer from './collection_reducer';
import collectionImageReducer from './collection_image_reducer';
import yelpReducer from './yelp_reducer';
import selectedCityReducer from './selected_city_reducer';
import venueReducer from './venue_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  promos: promosReducer,
  promo: promoReducer,
  auth: authReducer,
  savedPromos: savedPromosReducer,
  collections: collectionsReducer,
  collection: collectionReducer,
  collectionImage: collectionImageReducer,
  yelp: yelpReducer,
  city: selectedCityReducer,
  venue: venueReducer,
});

export default rootReducer;
