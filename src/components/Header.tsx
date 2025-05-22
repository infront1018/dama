import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const HeaderBar = styled.header`
  width: 100%;
  height: 64px;
  background: #fffbea;
  border-bottom: 1px solid #ececec;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled(Link)`
  font-size: 1.7rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: #ffaa18;
  text-decoration: none;
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 1.2rem;
`;

const NavItem = styled(Link)`
  color: #666;
  font-size: 1.07rem;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    color: #ffaa18;
  }
`;

const LogoutBtn = styled.button`
  background: none;
  border: none;
  color: #ffaa18;
  font-weight: 600;
  cursor: pointer;
  margin-left: 1.5rem;
  font-size: 1rem;
  transition: color 0.15s;

  &:hover {
    color: #d35400;
  }
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <HeaderBar>
      <Logo to="/">담아 DAMA</Logo>
      <NavMenu>
        <NavItem to="/anniversaries">기념일</NavItem>
        <NavItem to="/gifts">선물기록</NavItem>
        {user ? (
          <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
        ) : (
          <NavItem to="/login">로그인</NavItem>
        )}
      </NavMenu>
    </HeaderBar>
  );
};

export default Header;
