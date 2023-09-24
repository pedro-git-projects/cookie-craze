import Main from './src/components/Main';
import { AuthProvider } from './src/state/AuthProvider';

const App: React.FC = () => (
  <AuthProvider>
    <Main />
  </AuthProvider>
);

export default App;
