import Layout from '@layout/index.jsx';
import Loadable from '@components/Loadable.jsx';
import { lazy } from 'react';

const Login = Loadable(
    lazy(() => import('@pages/Auth/Login.jsx')), // Login 컴포넌트 import
);

const SignUp = Loadable(
    lazy(() => import('@pages/Auth/SignUp.jsx')), // 회원가입 컴포넌트 import
);

export const AuthRoute = {
    path: '/auth',
    element: <Layout />,
    children: [
        {
            path: 'login',
            element: <Login />,
        },
        {
            path: 'sign-up',
            element: <SignUp />,
        },
    ],
};
