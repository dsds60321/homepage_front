import { RouterProvider } from 'react-router-dom';
import routes from "./router/index.jsx";

function App() {
  return <RouterProvider router={routes} />;
}

export default App;