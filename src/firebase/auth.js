import firebase from "firebase/compat/app";
import "firebase/compat/auth";

async function signUp({ email, password, firstName, lastName }) {
  return await firebase.auth().createUserWithEmailAndPassword(email, password)
    .user;
}
function signIn({ email, password }) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => user);
}

function signOut() {
  return firebase.auth().signOut();
}

export { signUp, signIn, signOut };
