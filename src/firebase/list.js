import { db } from "./config";
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  deleteField,
  serverTimestamp,
} from "firebase/firestore";

function userListDoc(user) {
  const docRef = doc(db, `/lists/${user.uid}`);
  return { create, get, update, addItem, removeItem };
  //***/
  function create() {
    return setDoc(docRef, {});
  }
  function get() {
    return getDoc(docRef);
    //TODO still need to call .data() when promise resloved
  }
  function update(data) {
    return updateDoc(docRef, data);
  }
  function addItem(itemId) {
    return update({ [itemId]: { itemId, added: serverTimestamp() } });
  }
  function removeItem(itemId) {
    return update({ [itemId]: deleteField() });
  }
}

export { userListDoc };
