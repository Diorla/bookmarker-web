import styled from "styled-components";

export default styled.div`
  box-shadow: 0.3rem 0.3rem 0.6rem ${({ theme }) => theme.greyLight2},
    -0.2rem -0.2rem 0.5rem ${({ theme }) => theme.white};
  border-radius: 0 0 1rem 1rem;
  display: flex;
  align-items: center;
  position: sticky;
  padding: 0.4rem;
  width: clamp(120px, 90%, 90%);
  justify-content: space-evenly;
  top: 0;
  background-color: ${({ theme }) => theme.greyLight1};
  z-index: 1;
`;
