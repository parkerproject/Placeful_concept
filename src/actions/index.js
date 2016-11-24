/* global localStorage */
import axios from 'axios';
import localStore from 'react-native-simple-store';
import Intercom from 'react-native-intercom';
import {
  Actions
} from 'react-native-router-flux';
import {
  AUTH_USER,
  AUTH_ERROR,
  FETCH_PROMOS,
  FETCH_SINGLE_PROMO,
  FETCH_SAVED_PROMOS,
  FETCH_COLLECTIONS,
  FETCH_COLLECTION,
  FETCH_FEATURED_IMAGE,
  FETCH_YELP,
  SELECTED_CITY,
  FETCH_VENUE,
} from './types';
import firebaseApp from '../firebase';
import {
  ROOT_URL,
  KEY
} from '../../config.js';


export function fetchPromos(latitude, longitude, userId, city, page, cb) {
  return function dispatchPromos(dispatch) {
    const geo = `${longitude},${latitude}`;
    axios.get(`${ROOT_URL}/v2/promotions?key=${KEY}&geo=${geo}&page=${page}&user_id=${userId}&merchant_locality=${city}`)
      .then(response => {
        dispatch({
          type: FETCH_PROMOS,
          payload: response.data,
        });
        cb(response.data);
      })
      .catch(error => console.log(error));
  };
}

export function fetchYelp(phone, merchant, next) {
  return function dispatchPromos(dispatch) {
    const safeMerchant = encodeURIComponent(merchant);
    axios.get(`${ROOT_URL}/yelp/reviews?key=${KEY}&merchant=${safeMerchant}&phone=${phone}`)
      .then(response => {
        dispatch({
          type: FETCH_YELP,
          payload: response.data,
        });
        next(response.data);
      });
  };
}

export function fetchFoursquareVenues(lat, lon, merchantName, next) {
  return function dispatchPromos(dispatch) {
    const v = encodeURIComponent(merchantName);
    axios.get(`${ROOT_URL}/foursquare?key=${KEY}&lat=${lat}&lon=${lon}&venue=${v}`)
      .then(response => {
        dispatch({
          type: FETCH_VENUE,
          payload: response.data,
        });
        next(response.data);
      });
  };
}


export function fetchCollections(latitude, longitude, next) {
  return function dispatchPromos(dispatch) {
    axios.get(`${ROOT_URL}/collections?key=${KEY}&latitude=${latitude}&longitude=${longitude}`)
      .then(response => {
        dispatch({
          type: FETCH_COLLECTIONS,
          payload: response.data,
        });
        next(response.data);
      }).catch((error) => {
        console.log(error);
      });
  };
}

export function fetchCollection(cId, limit, geo, imgScr, title, description) {
  const {
    lat,
    lon
  } = geo;
  return function dispatchPromos(dispatch) {
    axios.get(`${ROOT_URL}/collection?key=${KEY}&cId=${cId}&limit=${limit}&lat=${lat}&lon=${lon}`)
      .then(response => {
        dispatch({
          type: FETCH_FEATURED_IMAGE,
          payload: {
            imgScr,
            title,
            description
          },
        });
        dispatch({
          type: FETCH_COLLECTION,
          payload: response.data,
        });
      });
  };
}

export function savePromo(plan, userId) {
  return function dispatchPromos(dispatch) {
    axios.post(`${ROOT_URL}/v2/user/ticket`, {
        key: KEY,
        plan,
        user_id: userId
      })
      .then(response => {
        dispatch({
          type: FETCH_SAVED_PROMOS,
          payload: response.data,
        });
      });
  };
}

export function unSavePromo(plan, userId) {
  return function dispatchPromos(dispatch) {
    axios.post(`${ROOT_URL}/v2/delete/ticket`, {
        key: KEY,
        ticket_id: plan.ticket_id,
        user_id: userId
      })
      .then(response => {
        dispatch({
          type: FETCH_SAVED_PROMOS,
          payload: response.data,
        });
      });
  };
}

export function fetchUserPromos(user) {
  const userId = user.uid;
  return function dispatchPromos(dispatch) {
    axios.get(`${ROOT_URL}/user/tickets?key=${KEY}&user_id=${userId}`)
      .then(response => {
        dispatch({
          type: FETCH_SAVED_PROMOS,
          payload: response.data,
        });
        dispatch({
          type: AUTH_USER,
          payload: {
            authenticated: true,
            user
          },
        });
      })
      .catch(error => console.log(error));
  };
}


export function likePromo(userId, dealId, geo) {
  return function dispatchLike(dispatch) {
    axios.post(`${ROOT_URL}/v2/promotion/like`, {
        user_id: userId,
        deal_id: dealId,
        key: KEY,
        geo
      })
      .then(response => {
        dispatch({
          type: FETCH_SINGLE_PROMO,
          payload: response.data.promo,
        });
        dispatch({
          type: FETCH_PROMOS,
          payload: response.data.promos,
        });
      });
  };
}

export function unLikePromo(userId, dealId, geo) {
  return function dispatchLike(dispatch) {
    axios.post(`${ROOT_URL}/v2/promotion/unlike`, {
        user_id: userId,
        deal_id: dealId,
        key: KEY,
        geo
      })
      .then(response => {
        dispatch({
          type: FETCH_SINGLE_PROMO,
          payload: response.data.promo,
        });
        dispatch({
          type: FETCH_PROMOS,
          payload: response.data.promos,
        });
      });
  };
}

export function selectCity(city) {
  return function dispatchCity(dispatch) {
    dispatch({
      type: SELECTED_CITY,
      payload: {
        city
      },
    });
  };
}


export function authUser() {
  return {
    type: AUTH_USER,
    payload: true,
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

/*
var auth = firebase.auth();
var emailAddress = "user@example.com";

auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
}, function(error) {
  // An error happened.
});
*/

export function resetPassword(email) {
  return function dispatchUser(dispatch) {
    const auth = firebaseApp.auth();
    auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('password changed emailed');
      }, (error) => {
        console.log(error);
      });
  };
}

export function intercomFunc(person) {
  Intercom.registerIdentifiedUser({
      userId: person.displayName
    })
    .then(() => {
      console.log('registerIdentifiedUser done');

      return Intercom.updateUser({
        email: person.email,
        name: person.displayName,
      });
    })
    .catch((err) => {
      console.log('registerIdentifiedUser ERROR', err);
    });
}


export function signInWithEmailAndPassword(formProps, caller) {
  return function dispatchUser(dispatch) {
    firebaseApp.auth().signInWithEmailAndPassword(formProps.email, formProps.password)
      .then((result) => {
        intercomFunc(result);
        localStore.save('placeful_user', {
            email: result.email,
            name: result.displayName,
            uid: result.uid,
          })
          .then(() => {
            dispatch({
              type: AUTH_USER,
              payload: {
                authenticated: true,
                user: result
              },
            });
            caller.fetchUserPromos(result.uid);
            Actions.plans({
              type: 'reset'
            });
          })
          .catch(error => dispatch(authError(error.message)));
      })
      .catch(error => dispatch(authError(error.message)));
  };
}

export function signUpUser(formProps, provider) {
  return function dispatchUser(dispatch) {
    firebaseApp.auth().createUserWithEmailAndPassword(formProps.email, formProps.password)
      .then(() => {
        firebaseApp.auth().currentUser.updateProfile({
            displayName: formProps.title,
          })
          .then(() => {
            const uid = firebaseApp.auth().currentUser.uid;
            const name = firebaseApp.auth().currentUser.displayName;
            const email = firebaseApp.auth().currentUser.email;
            const receiveLetters = true;

            firebaseApp.database().ref(`users/${uid}`).set({
              name,
              email,
              receive_letters: receiveLetters,
              provider,
            });

            intercomFunc({
              email,
              displayName: name
            });

            localStore.save('placeful_user', {
                uid,
                name,
                email
              })
              .then(() => {
                dispatch({
                  type: AUTH_USER,
                  payload: true,
                });
              })
              .catch(error => dispatch(authError(error.message)));
          })
          .catch(error => dispatch(authError(error.message)));
      })
      .catch(error => dispatch(authError(error.message)));
  };
}