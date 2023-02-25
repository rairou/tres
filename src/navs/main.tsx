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

import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';
import BottomBar from '../components/bar';
import * as Icon from 'react-native-feather';
import {TabButton} from '../components/button';
import DeviceNavigator from './device';

import HomeScreen from '../screens/home';
import StatsScreen from '../screens/stats';
import SettingsScreen from '../screens/settings';
import {TabParamList} from '../interfaces/screen';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainNavigator() {
  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => e.preventDefault());
  }, [navigation])
  return (
    <>
      <StatusBar backgroundColor="#F1EAD8" barStyle="default" />
      <Tab.Navigator
        tabBar={props => <BottomBar {...props} />}
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
        <Tab.Screen name="Device" component={DeviceNavigator} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </>
  );
}
