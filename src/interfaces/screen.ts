/*
 * Ok Heres come the boring part. I have no idea how to make this a less messy.
 * The only thing I can imagine of is by defining each types which is sucks, I know.
 * - riyuzenn
 */

import type {StackScreenProps} from '@react-navigation/stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Connect: undefined;
  _Auth: undefined;
};

export type AuthStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type DeviceStackParamList = {
  Device: undefined;
  Login: undefined;
  Register: undefined;
  Realtime: undefined;
};

// Bottom Tabs screen
export type TabParamList = {
  Home: undefined;
  Stats: undefined;
  Device: undefined;
  Settings: undefined;
};

export type HomeScreenProps = BottomTabScreenProps<TabParamList, 'Home'>;
export type StatsScreenProps = BottomTabScreenProps<TabParamList, 'Stats'>;
export type SettingsScreenProps = BottomTabScreenProps<
  TabParamList,
  'Settings'
>;

export type ConnectScreenProps = StackScreenProps<
  RootStackParamList,
  'Connect'
>;
export type AuthScreenProps = StackScreenProps<AuthStackParamList, 'Auth'>;

export type DeviceScreenProps = StackScreenProps<
  DeviceStackParamList,
  'Device'
>;
export type LoginScreenProps = StackScreenProps<DeviceStackParamList, 'Login'>;
export type RegisterScreenProps = StackScreenProps<
  DeviceStackParamList,
  'Register'
>;
export type RealtimeScreenProps = StackScreenProps<
  DeviceStackParamList,
  'Realtime'
>;
