import { Container, Header, MenuItem } from "bookmarker-ui";
import Link from "next/link";
import signOut from "services/signOut";
import LayoutProps from "./LayoutProps";

export default function Layout({
  children,
  activePath,
  search,
  alignCenter = true,
}: LayoutProps) {
  return (
    <Container alignCenter={alignCenter}>
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
}
