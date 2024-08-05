/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #ffffff;
  border-bottom: 1px solid #e9ecef;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #228be6;
`;

const MenuButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: block;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
`;

const UserInfo = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #495057;
  font-size: 14px;
`;

const UserPopup = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  border: 1px solid #e9ecef;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  z-index: 1000;
`;

const Header = ({ toggleSidebar }) => {
  const [showPopup, setShowPopup] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <MenuButton onClick={toggleSidebar}>
        <FaBars />
      </MenuButton>
      <Logo>My App Logo</Logo>
      <UserInfo>
        <UserButton onClick={() => setShowPopup(!showPopup)}>{user?.username}</UserButton>
        {showPopup && (
          <UserPopup>
            <p>Username: {user?.username}</p>
            <button onClick={handleLogout}>Logout</button>
          </UserPopup>
        )}
      </UserInfo>
    </HeaderContainer>
  );
};


export default Header;