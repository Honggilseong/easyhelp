import firebase from 'firebase';
import config from './config';
const firebaseConfig = {
  apiKey: `${config.FIREBASE_API_KEY}`,
  authDomain: 'heelp-89c02.firebaseapp.com',
  projectId: 'heelp-89c02',
  storageBucket: 'heelp-89c02.appspot.com',
  messagingSenderId: '993067868104',
  appId: '1:993067868104:web:722a26389f4cee18992afd',
  measurementId: 'G-KZC51S371V',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
firebase.firestore().settings({experimentalForceLongPolling: true, merge: true});
const db = firebase.firestore();

const auth = app.auth();

const storage = firebase.storage();

export {db, auth, storage};
