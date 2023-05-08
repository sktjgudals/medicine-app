import styled from "styled-components";

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 10px 0px 10px 0px;
`;

const NavButton = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-right: 25px;
  gap: 5px;
`;

const NavText = styled.p`
  font-size: var(--font-size-8);
  font-weight: var(--font-weight-semibold);
`;

export { NavText, NavButton, NavContainer };
