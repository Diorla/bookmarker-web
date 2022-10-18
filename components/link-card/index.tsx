import { Button, Chip, Link, Board } from "bookmarker-ui";
import { useState } from "react";
import styled from "styled-components";
import CardProps from "./CardProps";
import Chips from "./Chips";
import Icon from "./Icon";
import Top from "./Top";

const ExtCard = styled(Board)`
  margin-bottom: 0.6rem;
  padding: 0.4rem 0.6rem;
`;

export default function LinkCard({
  favicon,
  title,
  tags,
  description,
  onDelete,
  url,
}: CardProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <ExtCard depth={1}>
      <Top onClick={() => setExpanded(!expanded)}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={favicon}
            style={{ height: 24, width: 24, marginRight: 4 }}
          />
          <Link
            href={url}
            target="_blank"
            referrerPolicy="no-referrer"
            style={{ overflowWrap: "anywhere" }}
          >
            {title}
          </Link>
        </div>
        <Icon expanded={expanded}>{">"}</Icon>
      </Top>
      {expanded ? (
        <>
          <Chips>
            {tags.map((item, idx) => (
              <Chip title={item} key={idx} style={{ marginRight: 4 }} />
            ))}
          </Chips>
          <div style={{ fontStyle: "italic", padding: 4 }}>{description}</div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="secondary" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </>
      ) : null}
    </ExtCard>
  );
}
