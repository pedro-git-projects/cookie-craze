import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabsParamList } from './types';
import { NavigationContainer } from '@react-navigation/native';
import GameScreen from '../screens/Game';
import Icon from 'react-native-vector-icons/FontAwesome';
import StoreScreen from '../screens/Store';
import LeaderboardScreen from '../screens/Leaderboard';
import SettingsScreen from '../screens/Settings';

const MainTabs = createBottomTabNavigator<MainTabsParamList>();

export default function MainTabsNavigation() {
  return (
    <NavigationContainer>
      <MainTabs.Navigator initialRouteName="Game">
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
        <MainTabs.Screen
          name="Store"
          component={StoreScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="shopping-bag" color={color} size={size} />
            ),
            tabBarLabel: 'Loja',
          }}
        />
        <MainTabs.Screen
          name="Leaderboad"
          component={LeaderboardScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="line-chart" color={color} size={size} />
            ),
            tabBarLabel: 'Placar',
          }}
        />
        <MainTabs.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="cog" color={color} size={size} />
            ),
            tabBarLabel: 'Opções',
          }}
        />
      </MainTabs.Navigator>
    </NavigationContainer>
  );
}
