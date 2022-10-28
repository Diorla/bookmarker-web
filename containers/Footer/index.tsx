import {
  Footer as BuiFooter,
  FooterSegment,
  Link as BuiLink,
  Typography,
} from "bookmarker-ui";
import Link from "next/link";

import styled from "styled-components";
import ArrowUp from "./ArrowUp";

const FooterHeader = styled(Typography)`
  margin: 0;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSegment = styled(FooterSegment)`
  display: flex;
  flex-direction: column;
`;

export default function Footer() {
  return (
    <BuiFooter style={{ flex: 0, position: "fixed" }}>
      <StyledSegment>
        <Link href="/privacy-policy">
          <BuiLink>Privacy and Policy</BuiLink>
        </Link>
        <Link href="/feedback">
          <BuiLink>Feedback</BuiLink>
        </Link>
      </StyledSegment>
      <StyledSegment>
        <FooterHeader>Download</FooterHeader>
        <Column>
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
        </Column>
      </StyledSegment>
      <StyledSegment>
        <BuiLink href="https://adeolaade.com" target="_blank" rel="noreferrer">
          &copy; Ade Adeola
        </BuiLink>
        <BuiLink href="#top" style={{ display: "flex", alignItems: "center" }}>
          Top
          <ArrowUp />
        </BuiLink>
      </StyledSegment>
    </BuiFooter>
  );
}
