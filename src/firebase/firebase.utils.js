import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDJaZ6dksivek2U7IJGNJklTJRpAf2r-iI",
    authDomain: "crwn-db-5fe01.firebaseapp.com",
    databaseURL: "https://crwn-db-5fe01.firebaseio.com",
    projectId: "crwn-db-5fe01",
    storageBucket: "crwn-db-5fe01.appspot.com",
    messagingSenderId: "375872616818",
    appId: "1:375872616818:web:c40c16b87e25d6232f05eb",
    measurementId: "G-W5KLL8M5EH"
  };

export const createUserProfileDocument = async(userAuth,additionalData) => {
  if(!userAuth){
    return;
  }
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if(!snapshot.exists){
    const {displayName,email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){
      console.log(error);
    }
  }

  return userRef;
} 

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;