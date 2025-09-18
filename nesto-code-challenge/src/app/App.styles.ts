import styled from "styled-components";

export const AppWrapper = styled.div`
  padding: 1rem 3rem;
`;

export const HeaderWrapper = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;

  a {
    text-decoration: none;
    color: var(--primary-color);
    font-weight: bold;
    margin: 0.5rem 1rem;
  }

  a:hover {
    text-decoration: underline;
  }

`;

export const Logo = styled.img`
  height: 3rem;
  margin-right: 2rem;

  @media (min-width: 768px) {
    height: 4rem;
  }
`;

export const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;