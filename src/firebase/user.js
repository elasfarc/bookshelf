import { doc, setDoc } from "firebase/firestore";
import { db } from "./config";

function createUserDocument(user) {
  const docRef = doc(db, `/users/${user.uid}`);
  const userProfile = {
    uid: user.uid,
    email: user.email,
    firstName: "",
    lastName: "",
  };
  return setDoc(docRef, userProfile);
}

export { createUserDocument };
