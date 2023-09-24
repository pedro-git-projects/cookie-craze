import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

export type SetupStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Forgot: undefined;
};

export type SetupStackScreenProps<T extends keyof SetupStackParamList> =
  StackScreenProps<SetupStackParamList, T>;

export type MainTabsParamList = {
  Game: undefined;
  Leaderboad: undefined;
  Store: undefined;
  Settings: undefined;
};

export type MainTabsScreenProps<T extends keyof MainTabsParamList> =
  BottomTabScreenProps<MainTabsParamList, T>;
