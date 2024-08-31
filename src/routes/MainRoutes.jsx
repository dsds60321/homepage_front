import { lazy } from 'react';
import Loadable from '@components/Loadable';
import DashboardDefault from '@pages/Dashboard/index.jsx';
import Layout from '@layout/index.jsx';
import { PagingProvider } from '@/context/Paging.jsx';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth.jsx';
import ErrorPage from '@pages/Error/ErrorPage.jsx';
import Loading from '@components/loading/Loading.jsx';

const Tennis = Loadable(
    lazy(() => import('@pages/Physical/Tennis/Tennis.jsx')),
);

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth(); // 로그인 상태 가져오기

    if (isLoading) {
        return <Loading />; // 로딩 중일 때의 표시
    }

    return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

export const MainRoute = {
    path: '/',
    element: (
        <PrivateRoute>
            <Layout />
        </PrivateRoute>
    ),
    children: [
        {
            index: true,
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
            path: '/error', // 에러 페이지 경로 추가
            element: <ErrorPage />, // 에러 페이지 컴포넌트
        },
        {
            path: '*', // Catch-All Route
            element: <Navigate to="/error" replace />, // 등록되지 않은 URL은 /error로 리디렉션
        },
    ],
};
