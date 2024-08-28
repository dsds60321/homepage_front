import { lazy } from 'react';
import Loadable from '@components/Loadable';
import DashboardDefault from '@pages/Dashboard/index.jsx';
import Layout from '@layout/index.jsx';
import { PagingProvider } from '@/context/Paging.jsx';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth.jsx';

const Tennis = Loadable(
    lazy(() => import('@pages/Physical/Tennis/Tennis.jsx')),
);

const Login = Loadable(
    lazy(() => import('@pages/Auth/Login.jsx')), // Login 컴포넌트 import
);

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); // 로그인 상태 가져오기
    return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

export const routes = {
    path: '/',
    element: (
        <PrivateRoute>
            <Layout />
        </PrivateRoute>
    ),
    children: [
        {
            index: true, // 기본 경로에 대한 인덱스 라우트 설정
            element: <Navigate to="dashboard" replace />, // dashboard로 리디렉션
        },
        {
            path: 'dashboard',
            element: <DashboardDefault />,
        },
        {
            path: 'tennis',
            element: (
                <PagingProvider>
                    <Tennis />
                </PagingProvider>
            ),
        },
        {
            path: 'auth/login',
            element: <Login />, // 로그인 경로 설정
        },
    ],
};
