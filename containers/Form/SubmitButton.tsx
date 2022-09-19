import styled from "styled-components";

export default styled.div`
  display: flex;
  justify-content: center;
  & > button {
    background-color: teal;
    color: white;
    border: none;
    padding: 4px 8px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.3s linear;
  }
  & > button:hover {
    background-color: #08a1a1;
  }
`;
