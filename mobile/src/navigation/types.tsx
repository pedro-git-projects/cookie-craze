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
  Home: undefined;
  Search: undefined;
  Advertise: undefined;
  Message: undefined;
  Menu: undefined;
};

export type MainTabsScreenProps<T extends keyof MainTabsParamList> =
  BottomTabScreenProps<MainTabsParamList, T>;
