import { useEffect, useState } from 'react';
import SetupNavigation from './src/navigation/SetupNavigation';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated, and update setIsAuthenticated accordingly
    // For example, you can use AsyncStorage, a token check, or any other method.
    // Once you determine authentication, update setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    return <SetupNavigation />;
  }
}
