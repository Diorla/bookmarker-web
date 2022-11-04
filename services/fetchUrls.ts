import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import UrlProps from "types/UrlProps";

export default function fetchUrls(
  userId: string,
  getLinks: (arg0: any[]) => void
) {
  const db = getFirestore();
  const q = collection(db, `users/${userId}/links`);
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const links: UrlProps[] = [];
    querySnapshot.forEach((doc) => {
      links.push(doc.data() as UrlProps);
    });
    getLinks(links);
  });
  return unsubscribe;
}
