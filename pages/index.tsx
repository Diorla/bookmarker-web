import { Loader } from "bookmarker-ui";
import React from "react";
import { useUser } from "../context/userContext";

const Form = React.lazy(() => import("../containers/Form"));
const Home = React.lazy(() => import("../containers/Home"));
const ErrorDiv = React.lazy(() => import("../components/ErrorDiv"));

export default function Index() {
  const { loadingUser, user, error } = useUser();

  if (loadingUser) return <Loader fullHeight />;
  if (error) <ErrorDiv error={error} />;
  if (user.uid) return <Home />;
  return <Form />;
}
