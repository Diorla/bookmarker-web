import { getFirestore, doc, setDoc, arrayRemove } from "firebase/firestore";

const removeCollection = async (userId: string, collection: string) => {
  const db = getFirestore();
  const docRef = doc(db, `users/${userId}`);

  return setDoc(
    docRef,
    { collections: arrayRemove(collection) },
    { merge: true }
  );
};

export default removeCollection;
