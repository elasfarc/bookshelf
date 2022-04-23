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
  return {
    create,
    get,
    update,
    addItem,
    removeItem,
    addItemProp,
    removeItemProp,
  };
  //***/
  function create() {
    return setDoc(docRef, {});
  }
  async function get() {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    else return Promise.reject(`No such document! check ${docRef}`);
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
  function addItemProp({ itemId, prop, value = true }) {
    return update({
      [`${itemId}.${prop}`]: value === "NOW" ? serverTimestamp() : value,
    });
  }
  function removeItemProp({ itemId, prop }) {
    return update({ [`${itemId}.${prop}`]: deleteField() });
  }
}

export { userListDoc };
