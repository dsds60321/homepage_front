import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from "../components/Layout.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Content from "../components/Content.jsx";
import Login from "../components/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import {Tennis} from "../pages/reserveration/Tennis.jsx";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path:'/dashboard', element: (<ProtectedRoute><Dashboard/></ProtectedRoute>) },
      { path:'/reservation/tennis', element: (<ProtectedRoute><Tennis/></ProtectedRoute>) },
      {
        path: ':category/:subcategory/:page',
        element: (
          <ProtectedRoute>
            <Content />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default routes;