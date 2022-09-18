import { collection, getFirestore, onSnapshot } from "firebase/firestore";

export default function fetchUrls(
  userId: string,
  getLinks: (arg0: any[]) => void
) {
  const db = getFirestore();
  const q = collection(db, `users/${userId}/links`);
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const links = [];
    querySnapshot.forEach((doc) => {
      links.push(doc.data());
    });
    getLinks(links);
  });
  return unsubscribe;
}
