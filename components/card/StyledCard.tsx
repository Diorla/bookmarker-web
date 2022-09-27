import styled from "styled-components";

export default styled.div`
  box-shadow: 0.15rem 0.15rem 0.3rem ${({ theme }) => theme.greyLight2},
    -0.1rem -0.1rem 0.25rem ${({ theme }) => theme.white};
  width: clamp(120px, 90%, 960px);
  margin: 0.4rem 0;
  padding: 0.4rem;
  border-radius: 0.4rem;
`;
