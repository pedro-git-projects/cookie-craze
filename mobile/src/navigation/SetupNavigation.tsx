import { createStackNavigator } from '@react-navigation/stack';
import { SetupStackParamList } from './types';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/Splash';
import LoginScreen from '../screens/Login';
import ForgotScreen from '../screens/Forgot';

const SetupStack = createStackNavigator<SetupStackParamList>();

export default function SetupNavigation() {
  return (
    <NavigationContainer theme={{ colors: { background: '#282828' } }}>
      <SetupStack.Navigator initialRouteName="Splash">
        <SetupStack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <SetupStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <SetupStack.Screen
          name="Forgot"
          component={ForgotScreen}
          options={{ headerShown: false }}
        />
      </SetupStack.Navigator>
    </NavigationContainer>
  );
}
