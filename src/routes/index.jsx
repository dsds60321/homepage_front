import { createBrowserRouter } from 'react-router-dom';
import { MainRoute } from './MainRoutes.jsx';
import { AuthRoute } from '@routes/AuthRoute.jsx';

const router = createBrowserRouter([AuthRoute, MainRoute]);

export default router;
