import React from "react";
import { useState } from "react";
import { useUser } from "../../context/userContext";

const EmailSent = React.lazy(() => import("./EmailSent"));
const ResetEmail = React.lazy(() => import("./ResetEmail"));
const ErrorDiv = React.lazy(() => import("../../components/ErrorDiv"));
const Loader = React.lazy(() => import("../../components/Loader"));

export default function ResetPassword() {
  const [confirmed, setConfirmed] = useState(false);
  const [email, setEmail] = useState("");
  const { user, error, loadingUser } = useUser();
  if (loadingUser) return <Loader />;
  if (error) return <ErrorDiv error={error} />;
  if (user.uid) return <div>Sorry, you are already logged in</div>;
  if (confirmed) return <EmailSent email={email} />;
  return (
    <ResetEmail
      confirmEmail={(email) => {
        setConfirmed(true);
        setEmail(email);
      }}
    />
  );
}
