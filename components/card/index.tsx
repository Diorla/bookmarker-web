import { useState } from "react";
import Button from "../button";
import Chip from "../chip";
import Link from "../link";
import CardProps from "./CardProps";
import Chips from "./Chips";
import Icon from "./Icon";
import StyledCard from "./StyledCard";
import Top from "./Top";

export default function Card({
  favicon,
  title,
  tags,
  description,
  onDelete,
  url,
}: CardProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <StyledCard>
      <Top onClick={() => setExpanded(!expanded)}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={favicon}
            style={{ height: 24, width: 24, marginRight: 4 }}
          />
          <Link href={url} target="_blank" referrerPolicy="no-referrer">
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
    </StyledCard>
  );
}
