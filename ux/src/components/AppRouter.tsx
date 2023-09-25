import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Forgot from '../pages/Forgot';
import Register from '../pages/Register';
import Game from '../pages/Game';
import Leaderboard from '../pages/Leaderboard';
import Settings from '../pages/Settings';
import Store from '../pages/Store';

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
  {
    path: '/store',
    element: <Store />,
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
]);

export default AppRouter;
