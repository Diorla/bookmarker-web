import { Link, Loader } from "bookmarker-ui";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import verifyEmail from "services/verifyEmail";

export default function VerifyEmail({ actionCode }: { actionCode: string }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    verifyEmail(actionCode)
      .then(() => setLoading(false))
      .catch((err) => console.log(err));

    return () => {};
  }, []);

  if (loading) return <Loader fullHeight />;
  return (
    <>
      <h2>Email verified</h2>
      <div>Your email has been verified</div>
      <div>
        Go{" "}
        <NextLink href="/">
          <Link>Home</Link>
        </NextLink>
      </div>
    </>
  );
}
