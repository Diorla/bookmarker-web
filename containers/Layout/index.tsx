import { Container, Header, MenuItem, Link as BuiLink } from "bookmarker-ui";
import { useUser } from "context/userContext";
import Link from "next/link";
import sendVerification from "services/sendVerification";
import signOut from "services/signOut";
import LayoutProps from "./LayoutProps";

export default function Layout({
  children,
  activePath,
  search,
  alignCenter = true,
}: LayoutProps) {
  const {
    user: { emailVerified },
  } = useUser();
  if (emailVerified)
    return (
      <Container
        alignCenter={alignCenter}
        fullHeight
        style={{ paddingBottom: 100 }}
      >
        <Header style={{ justifyContent: "space-between" }}>
          <Link href="/">
            <MenuItem active={activePath === "home"}>
              <img
                src="https://bookmarker-one.vercel.app/favicon.ico"
                style={{ height: 24, width: 24 }}
              />
            </MenuItem>
          </Link>
          {search}
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link href="/profile">
              <MenuItem active={activePath === "profile"}>Profile</MenuItem>
            </Link>
            <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
          </div>
        </Header>
        {children}
      </Container>
    );
  return (
    <Container alignCenter justifyCenter fullHeight>
      <div>Please verify your email</div>
      <div>
        Didn't receive it, Please check your spam or{" "}
        <BuiLink onClick={() => sendVerification()}>
          Resend verification
        </BuiLink>
      </div>
    </Container>
  );
}
