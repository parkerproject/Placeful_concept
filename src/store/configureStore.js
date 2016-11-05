import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from '../reducers';

// import syncOffline from './syncOffline'

const logger = createLogger();

export default function configureStore() {
  const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(createStore);
  const store = createStoreWithMiddleware(reducers);
  // syncOffline(store)
  return store;
}
