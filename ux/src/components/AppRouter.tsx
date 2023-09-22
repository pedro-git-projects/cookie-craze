import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Forgot from '../pages/Forgot';
import Register from '../pages/Register';
import Game from '../pages/Game';

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
  {
    path: '/game',
    element: <Game />,
  },  
]);

export default AppRouter;
