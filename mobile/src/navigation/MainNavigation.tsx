import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabsParamList } from './types';
import { NavigationContainer } from '@react-navigation/native';
import GameScreen from '../screens/Game';
import Icon from 'react-native-vector-icons/FontAwesome';

const MainTabs = createBottomTabNavigator<MainTabsParamList>();

export default function MainTabsNavigation() {
  return (
    <NavigationContainer>
      <MainTabs.Screen
        name="Game"
        component={GameScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="gamepad" color={color} size={size} />
          ),
          tabBarLabel: 'Jogar',
        }}
      />
    </NavigationContainer>
  );
}
