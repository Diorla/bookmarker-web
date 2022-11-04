import {
  Footer as BuiFooter,
  FooterSegment,
  Link as BuiLink,
  Typography,
} from "bookmarker-ui";
import Link from "next/link";
import styled from "styled-components";

import ArrowUp from "./ArrowUp";

const Segment = styled(FooterSegment)`
  display: flex;
  flex-direction: column;
  min-width: 100px;
  color: red;
  align-items: center;
  text-align: center;
`;

export default function Footer() {
  return (
    <BuiFooter style={{ flex: 0, position: "fixed", flexWrap: "wrap" }}>
      <Segment>
        <Link href="/privacy-policy">
          <BuiLink>Privacy and Policy</BuiLink>
        </Link>
        <Link href="/feedback">
          <BuiLink>Feedback</BuiLink>
        </Link>
      </Segment>
      <Segment>
        <Typography type="h4" style={{ margin: 0, color: "white" }}>
          Download
        </Typography>
        <Segment>
          <BuiLink
            href="https://chrome.google.com/webstore/detail/bookmarker/akbpnbpmfmelpdpiepfmjdemfkeamhcf"
            target="_blank"
            rel="noreferrer"
          >
            Chrome
          </BuiLink>
          <BuiLink
            href="https://addons.mozilla.org/en-US/firefox/addon/multimark/"
            target="_blank"
            rel="noreferrer"
          >
            Firefox
          </BuiLink>
          <BuiLink
            href="https://adeolaade.com"
            target="_blank"
            rel="noreferrer"
          >
            Safari
          </BuiLink>
        </Segment>
      </Segment>
      <Segment>
        <BuiLink href="https://adeolaade.com" target="_blank" rel="noreferrer">
          &copy; Ade Adeola
        </BuiLink>
        <BuiLink href="#top" style={{ display: "flex", alignItems: "center" }}>
          Top
          <ArrowUp />
        </BuiLink>
      </Segment>
    </BuiFooter>
  );
}
