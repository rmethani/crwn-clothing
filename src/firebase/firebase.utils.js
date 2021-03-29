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

  export const createUserProfileDocument = async(userAuth, additionalData) => {
    
    if(!userAuth) return;

    const userRef =firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          });
        }
        catch(error){
            console.log("error creating user", error.message);
        }

      }
      return userRef;
  }

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
    objectsToAdd.forEach((obj) => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    })

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) =>{
  const transformedCollection = collections.docs.map(doc =>{
    const {title, items} = doc.data();
    return{
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items

    }
  })

 return transformedCollection.reduce( (accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
  
}

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt : 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;