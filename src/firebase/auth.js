import { auth } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from "firebase/auth";

async function signUp({ email, password, firstName, lastName }) {
  return createUserWithEmailAndPassword(auth, email, password).then(
    (res) => res.user
  );
}
function signIn({ email, password }) {
  return signInWithEmailAndPassword(auth, email, password).then(
    ({ user }) => user
  );
}

function signOut() {
  return fbSignOut(auth);
}

export { signUp, signIn, signOut };
