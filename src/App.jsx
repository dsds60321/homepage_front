import ThemeCustomization from './themes/index.jsx';
import ScrollTop from './components/ScrollTop.jsx';
import { RouterProvider } from 'react-router-dom';
import router from '@routes/index.jsx';

export default function App() {
    return (
        <ThemeCustomization>
            <ScrollTop>
                <RouterProvider router={router} />
            </ScrollTop>
        </ThemeCustomization>
    );
}
