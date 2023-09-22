import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Forgot from '../pages/Forgot';
import Register from '../pages/Register';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/forgot',
    element: <Forgot />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default AppRouter;
