import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyBOeTJpAq1HVeUX1Zsjyuz2uPuB0cbDsJw",
    authDomain: "crwn-db-686d1.firebaseapp.com",
    projectId: "crwn-db-686d1",
    storageBucket: "crwn-db-686d1.appspot.com",
    messagingSenderId: "1071691337664",
    appId: "1:1071691337664:web:12a7f8dd12b09033834225",
    measurementId: "G-KXF34RCYEK"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt : 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;