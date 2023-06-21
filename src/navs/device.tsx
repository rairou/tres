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

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DeviceStackParamList} from '../interfaces/screen';
import RealtimeScreen from '../screens/device/realtime';
import LoginScreen from '../screens/device/login';
import DeviceScreen from '../screens/device/device';
import RegisterScreen from '../screens/device/register';
import { useGlobalState } from '../lib/state';
import Loading from '../components/loading';
import { useNavigation } from '@react-navigation/native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from "@react-native-firebase/auth";
import { SafeAreaView } from 'react-native';

const DeviceStack = createStackNavigator<DeviceStackParamList>();
export default function DeviceNavigator() {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>();
  const [loading, setLoading] = React.useState(true);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (loading) setLoading(false)
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber
  }, []);
  
  if (loading) return (
    <SafeAreaView className='flex-1 bg-[#F1EAD8]'>
      <Loading visible={loading} />
    </SafeAreaView>
  )


  return (
    <>
    <DeviceStack.Navigator 
      screenOptions={{headerShown: false}}
      initialRouteName={user ? "FindDevice" : "Login"}
      screenListeners={({ navigation }) => ({
        state: (e) => {
          // Do something with the state
          // console.log('state changed', e.data);

          // Do something with the `navigation` object
          if (!navigation.canGoBack()) {
            // console.log("we're on the initial screen");
          }
        },
      })}
    >
      <DeviceStack.Screen name="Login" component={LoginScreen} />
      <DeviceStack.Screen name="FindDevice" component={DeviceScreen} />
      <DeviceStack.Screen name="Realtime" component={RealtimeScreen} />
      <DeviceStack.Screen name="Register" component={RegisterScreen} />

    </DeviceStack.Navigator> 
    </>
    
  );
}
