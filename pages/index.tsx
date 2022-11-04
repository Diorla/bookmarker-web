import { Loader } from "bookmarker-ui";
import React, { useEffect, useState } from "react";
import { useUser } from "context/userContext";
import NewLink from "containers/NewLink";
import UrlProps from "types/UrlProps";
import fetchUrls from "services/fetchUrls";

const Form = React.lazy(() => import("containers/Form"));
const Home = React.lazy(() => import("containers/Home"));
const ErrorDiv = React.lazy(() => import("components/ErrorDiv"));

export default function Index() {
  const [sharedURL, setSharedURL] = useState({
    title: "",
    favicon: "",
    url: "",
  });

  const [links, setLinks] = useState<UrlProps[]>([]);

  const { loadingUser, user, error } = useUser();

  useEffect(() => {
    const unsubscribe = fetchUrls(user.uid, (links) => {
      setLinks(links);
    });

    window.addEventListener("DOMContentLoaded", () => {
      const parsedUrl = new URL(String(window.location));
      const title = parsedUrl.searchParams.get("title") || "";
      const favicon = parsedUrl.searchParams.get("favicon") || "";
      const url = parsedUrl.searchParams.get("url") || "";

      setSharedURL({ title, favicon, url });
    });

    return () => unsubscribe();
  }, []);

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
  if (loadingUser) return <Loader fullHeight />;
  if (error) <ErrorDiv error={error} />;
  if (user.uid) return <Home links={links} />;
  return <Form />;
}
