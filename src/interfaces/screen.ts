/*
 * Copyright (c) 2022 riyuzenn <riyuzenn@gmail.com>
 * See the license file for more info
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


// Ok here comes the boring part. I have no idea how to make this a less messy.
// The only thing I can imagine of is by defining each types which is sucks, I know.
// - riyuzenn


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
