import styled from "styled-components";

export default styled.a`
  padding: 0.4rem;
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease;
  border-radius: 0.4rem;
  max-width: 15rem;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  margin: 0.4rem 0.6rem;
  &:hover {
    color: ${({ theme }) => theme.primary};
    box-shadow: 0.15rem 0.15rem 0.3rem ${({ theme }) => theme.greyLight2},
      -0.1rem -0.1rem 0.25rem ${({ theme }) => theme.white};
  }
  &:active {
    box-shadow: inset 0.4rem 0.4rem 1rem ${({ theme }) => theme.greyLight2},
      inset -0.4rem -0.4rem 1rem ${({ theme }) => theme.white};
  }
  &.active:active {
    box-shadow: inset 0.4rem 0.4rem 1rem ${({ theme }) => theme.greyLight2},
      inset -0.4rem -0.4rem 1rem ${({ theme }) => theme.white};
  }
  &.active {
    transition: all 0.5s ease;
    color: ${({ theme }) => theme.primary};
    box-shadow: inset 0.2rem 0.2rem 0.5rem ${({ theme }) => theme.greyLight2},
      inset -0.2rem -0.2rem 0.5rem ${({ theme }) => theme.white};
  }
`;
