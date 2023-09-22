import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import AppRouter from './components/AppRouter.tsx';
import { AuthProvider } from './state/AuthProvider.tsx';
import '@fortawesome/fontawesome-free/css/all.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={AppRouter} />
  </AuthProvider>,
);
