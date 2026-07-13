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
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 700;
`;

const Nav = styled.nav`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 56px;
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
