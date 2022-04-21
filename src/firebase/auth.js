import { auth } from "./config";
import { createUserDocument } from "./user";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from "firebase/auth";

async function signUp({ email, password, firstName, lastName }) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  //await newUser.updateProfile({ displayName: `${firstName} ${lastName}` });
  await createUserDocument(user);
  return user;
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
