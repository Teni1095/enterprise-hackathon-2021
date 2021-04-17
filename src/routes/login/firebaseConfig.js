import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAcv9WPOlPb2ZKIz0pyrHGBhg8j9PoMPvA",
  authDomain: "backendapp-3fbc3.firebaseapp.com",
  projectId: "backendapp-3fbc3",
  storageBucket: "backendapp-3fbc3.appspot.com",
  messagingSenderId: "532366068277",
  appId: "1:532366068277:web:c17863edea42b377157f7c",
  measurementId: "G-1HBC69LWK4"
};

firebase.initializeApp(firebaseConfig);

const check_if_user_exists = async email => {
  const db = firebase.firestore();
  let length = 0;
  try {
    const querySnapshot = await db.collection("users").where("email", "==", email).get();
    length = querySnapshot.docs.length;
  } catch (e) {
    console.log("Error getting documents: ", e);
  }

  return length !== 0;
};

export const signIn = async () => { //Use this function to sign in via Google
  const provider = new firebase.auth.GoogleAuthProvider();

  let userCredential;

  try {
    userCredential = firebase.auth().signInWithRedirect(provider);
  } catch (e) {
    console.error(e);
  }

  /** @type {firebase.auth.OAuthCredential} */
  const credential = userCredential.credential;

  // This gives you a Google Access Token. You can use it to access the Google API.
  const token = credential.accessToken;

  // The signed-in user info.
  const user = userCredential.user;
  const userExists = await check_if_user_exists(user.email);

  if (!userExists) {
    const db = firebase.firestore();
    try {
      await db.collection("users").doc().set({
        email: user.email,
        name: user.displayName
      });
      console.log("Document successfully written!")
    } catch (e) {
      console.error("Error writing document: ", e)
    }
  }

  return userCredential;
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
}

export const getRedirectResult = async () => {
  const uc = await firebase.auth().getRedirectResult();
  return uc.user;
};