import React from "react";
import { useUser } from "../context/userContext";

const Form = React.lazy(() => import("../containers/Form"));
const Home = React.lazy(() => import("../containers/Home"));
const Center = React.lazy(() => import("../components/Center"));

export default function Index() {
  const { loadingUser, user, error } = useUser();

  if (loadingUser)
    return (
      <Center>
        <img src="spinner.gif" />
      </Center>
    );
  if (error)
    <Center>
      <div>{error.message}</div>
    </Center>;
  if (user.uid) return <Home />;
  return (
    <Center>
      <Form />
    </Center>
  );
}
