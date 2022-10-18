import { doc, getFirestore, onSnapshot } from "firebase/firestore";

export default async function getCollections(
  userId: string,
  callback: (args: string[]) => void
) {
  const db = getFirestore();
  const docRef = doc(db, `users/${userId}`);

  onSnapshot(docRef, (doc) => {
    const { collections = [] } = doc.data() as { collections: string[] };
    callback(collections);
  });
}
