import MainTabsNavigation from '../navigation/MainTabsNavigation';
import SetupNavigation from '../navigation/SetupNavigation';
import { useAuth } from '../state/AuthProvider';

const Main: React.FC = () => {
  const { accessToken } = useAuth();
  return <>{accessToken ? <MainTabsNavigation /> : <SetupNavigation />}</>;
};

export default Main;
