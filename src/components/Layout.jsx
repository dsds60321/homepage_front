/** @jsxImportSource @emotion/react */
import {Navigate, Outlet} from 'react-router-dom';
import styled from '@emotion/styled';
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import useAuthStore from '../store/authStore';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
`;

const ContentWrapper = styled.main`
  flex-grow: 1;
  padding: 20px;
  background-color: #f8f9fa;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppContainer>
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <MainContent>
        <Sidebar isOpen={sidebarOpen}  />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainContent>
      <Footer />
    </AppContainer>
  );
};

export default Layout;