import { lazy } from 'react';
import Loadable from '@components/Loadable';

const Tennis = Loadable(
    lazy(() => import('@pages/physical/tennis/Tennis.jsx')),
);

import DashboardDefault from '@pages/dashboard/index.jsx';
import Layout from '@layout/index.jsx';
import { PagingProvider } from '@/context/Paging.jsx';
import { Navigate } from 'react-router-dom';

export const routes = {
    path: '/',
    element: <Layout />,
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
    ],
};
