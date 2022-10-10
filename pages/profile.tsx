import { Loader } from "bookmarker-ui";
import ErrorDiv from "../components/ErrorDiv";
import Form from "../containers/Form";
import Profile from "../containers/Profile";
import { useUser } from "../context/userContext";

export default function ProfilePage() {
  const { loadingUser, user, error } = useUser();

  if (loadingUser) return <Loader fullHeight />;
  if (error) <ErrorDiv error={error} />;
  if (user.uid) return <Profile />;
  return <Form />;
}
