import Form from "../containers/Form";
import Home from "../containers/Home";
import { useUser } from "../context/userContext";
import Center from "../components/Center";

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
