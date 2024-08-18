import { lazy } from 'react';
import Loadable from '@components/Loadable';

const Tennis = Loadable(
    lazy(() => import('@pages/physical/tennis/Tennis.jsx')),
);

import DashboardDefault from '@pages/dashboard/index.jsx';
import Layout from '@layout/index.jsx';
import { PagingProvider } from '@/context/Paging.jsx';

export const routes = {
    path: '/',
    element: <Layout />,
    children: [
        {
            path: 'dashboard',
            element: <DashboardDefault />,
        },
        {
            path: 'physical/reservation',
            element: (
                <PagingProvider>
                    <Tennis />
                </PagingProvider>
            ),
        },
    ],
};
