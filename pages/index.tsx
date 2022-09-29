import React from "react";
import { useUser } from "../context/userContext";

const Form = React.lazy(() => import("../containers/Form"));
const Home = React.lazy(() => import("../containers/Home"));
const ErrorDiv = React.lazy(() => import("../components/ErrorDiv"));
const Loader = React.lazy(() => import("../components/Loader"));

export default function Index() {
  const { loadingUser, user, error } = useUser();

  if (loadingUser) return <Loader />;
  if (error) <ErrorDiv error={error} />;
  if (user.uid) return <Home />;
  return <Form />;
}
