import { Loader } from "bookmarker-ui";
import React, { useEffect, useState } from "react";
import { useUser } from "context/userContext";
import UrlProps from "types/UrlProps";
import fetchUrls from "services/fetchUrls";
import { Unsubscribe } from "firebase/firestore";

const Form = React.lazy(() => import("containers/Form"));
const Home = React.lazy(() => import("containers/Home"));
const NewLink = React.lazy(() => import("containers/NewLink"));
const ErrorDiv = React.lazy(() => import("components/ErrorDiv"));

export default function Index() {
  const [sharedURL, setSharedURL] = useState({
    title: "",
    favicon: "",
    url: "",
  });

  const [links, setLinks] = useState<UrlProps[]>([]);

  const { loadingUser, user, error } = useUser();

  const [loadingLinks, setLoadingLinks] = useState(true);
  useEffect(() => {
    let unsubscribe: Unsubscribe;
    if (user.uid) {
      unsubscribe = fetchUrls(user.uid, (links) => {
        setLinks(links);
        setLoadingLinks(false);
      });
    }

    window.addEventListener("DOMContentLoaded", () => {
      const parsedUrl = new URL(String(window.location));
      const title = parsedUrl.searchParams.get("title") || "";
      const favicon = parsedUrl.searchParams.get("favicon") || "";
      const url = parsedUrl.searchParams.get("url") || "";

      setSharedURL({ title, favicon, url });
    });

    return () => unsubscribe && unsubscribe();
  }, [user.uid]);

  if (loadingUser) return <Loader fullHeight />;
  if (error) <ErrorDiv error={error} />;

  if (user.uid) {
    if (loadingLinks) return <Loader fullHeight />;
    if (sharedURL.url)
      return (
        <NewLink
          links={links}
          {...sharedURL}
          onClear={() =>
            setSharedURL({
              title: "",
              favicon: "",
              url: "",
            })
          }
        />
      );
    return <Home links={links} />;
  }
  return <Form />;
}
