/*
 * Copyright (c) 2023 riyuzenn <riyuzenn@gmail.com>
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


import {createStackNavigator} from '@react-navigation/stack';
import {DeviceStackParamList} from '../interfaces/screen';
import RealtimeScreen from '../screens/device/realtime';
import LoginScreen from '../screens/device/login';
import DeviceScreen from '../screens/device/device';

const DeviceStack = createStackNavigator<DeviceStackParamList>();
export default function DeviceNavigator() {
  return (
    <DeviceStack.Navigator 
      screenOptions={{headerShown: false}}
      initialRouteName="Login"
    >
      <DeviceStack.Screen name="Login" component={LoginScreen} />
      <DeviceStack.Screen name="FindDevice" component={DeviceScreen} />
      <DeviceStack.Screen name="Realtime" component={RealtimeScreen} />
    </DeviceStack.Navigator>
  );
}
