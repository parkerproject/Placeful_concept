// import and configure firebase
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCwIR_oc-NI0QzytZBBKwZ46nkMofifb2g',
  authDomain: 'placeful.firebaseio.com',
  databaseURL: 'https://placeful.firebaseio.com',
  storageBucket: 'firebase-placeful.appspot.com',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
