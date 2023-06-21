/*
 * Copyright (c) 2023 rairou <rairoudes@gmail.com>
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
// - rairou


import type {StackScreenProps} from '@react-navigation/stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import { TresDoc } from './data';

export type RootStackParamList = {
  _Auth:  undefined;
};

export type AuthStackParamList = {
  Auth:  undefined;
  Connect: undefined;
  Main: undefined;
};

export type DeviceStackParamList = {
  FindDevice: undefined;
  Register: undefined;
  Login: undefined;
  Realtime: { deviceId: string };
};

// Bottom Tabs screen
export type TabParamList = {
  Home: undefined;
  Stats: { data: TresDoc[], name: string };
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
  AuthStackParamList,
  'Connect'
>;
export type AuthScreenProps = StackScreenProps<AuthStackParamList, 'Auth'>;

export type FindDeviceScreenProps = StackScreenProps<
  DeviceStackParamList,
  'FindDevice'
>;

export type RegisterScreenProps = StackScreenProps<
  DeviceStackParamList,
  'Register'
>;

export type LoginScreenProps = StackScreenProps<DeviceStackParamList, 'Login'>;

export type RealtimeScreenProps = StackScreenProps<
  DeviceStackParamList,
  'Realtime'
>;
