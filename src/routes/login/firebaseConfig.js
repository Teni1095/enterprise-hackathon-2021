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

  debugger;

  return length !== 0;
};

export const signIn = async () => { //Use this function to sign in via Google
  const provider = new firebase.auth.GoogleAuthProvider();

  let userCredential;

  try {
    userCredential = await firebase.auth().signInWithRedirect(provider);
  } catch (e) {
    console.error(e);
  }
};

export const updateDb = async (user) => {
  const userExists = await check_if_user_exists(user.email);

  debugger;

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
}

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
}

export const getRedirectResult = async () => {
  const uc = await firebase.auth().getRedirectResult();
  return uc.user;
};

export const signOut = async () => {
  await firebase.auth().signOut();
}

export const getAllTopics = async () => {
  const list = [];
  const coll = await firebase.firestore().collection("topics").get();
  coll.docs.forEach((topic)=>{
    const data = topic.data();
    list.push({
      id: topic.id,
      title: data.title,
      description: data.description,
      owner: data.email,
      involvedCount: data.involvedCount
    });
  });
  return list;
}

export const createTopic = async (title, description) => { //for creating a topic
  const currentUser = await getCurrentUser();
  const email = currentUser.email;
  const topic = {
    title: title,
    description: description,
    owner: email,
    involvedCount: 0
  };
  await firebase.firestore().collection("topics").add(topic);
  return topic;
};

export const increaseInvolvedCount = async (id) => {
  await firebase.firestore().collection("topics").doc(id).update({involvedCount:firebase.firestore.FieldValue.increment(1)});
}