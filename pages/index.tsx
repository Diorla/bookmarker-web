import Form from "../containers/Form";
import Home from "../containers/Home";
import { useUser } from "../context/userContext";

export default function Index() {
  const { loadingUser, user, error } = useUser();

  if (loadingUser)
    return (
      <div>
        <img src="spinner.gif" />
      </div>
    );
  if (error) return <div>{error.message}</div>;
  if (user.uid) return <Home />;
  return <Form />;
}
