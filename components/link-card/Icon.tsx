import styled from "styled-components";

export default styled.div<{ expanded: boolean }>`
  font-weight: bold;
  padding: 0.4rem;
  transition: 0.3s linear;
  transform: ${({ expanded }) =>
    expanded ? "rotate(90deg)" : "rotate(-90deg)"};
  font-size: 1.4rem;
`;
