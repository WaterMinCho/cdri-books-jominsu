import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <Wrapper>
      <Logo to="/">CERTICOS BOOKS</Logo>
      <Nav>
        <NavItem
          to="/"
          end
        >
          도서 검색
        </NavItem>
        <NavItem to="/wishlist">내가 찜한 책</NavItem>
      </Nav>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  height: 80px;
  padding: 0 40px;

  @media (max-width: 900px) {
    justify-content: space-between;
    padding: 0 16px;
  }
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 700;

  @media (max-width: 900px) {
    font-size: 18px;
  }
`;

const Nav = styled.nav`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 56px;

  @media (max-width: 900px) {
    position: static;
    transform: none;
    gap: 24px;
  }
`;

const NavItem = styled(NavLink)`
  padding-bottom: 4px;
  font-size: 16px;
  border-bottom: 1px solid transparent;

  &.active {
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }
`;

export default Header;
