import React from 'react';
import { Provider } from 'react-redux';
import localStore from 'react-native-simple-store';
import App from './components/App';
import configureStore from './store/configureStore';
import { AUTH_USER } from './actions/types';

const store = configureStore();

localStore.get('placeful_user')
.then(user => {
  if (user) {
    store.dispatch({
      type: AUTH_USER,
      payload: { authenticated: true, user },
    });
  }
});


export default() => {
  const provider = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  return provider;
};
