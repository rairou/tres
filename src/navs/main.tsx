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
import { useGlobalState } from "../lib/state";
import { Data, compareDate } from "../lib/time";
import { TresDoc } from "../interfaces/data";

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainNavigator() {
  const [db, setDb] = useGlobalState('db');
  const [locations, setLocations] = useGlobalState('locationHistory');
  const [locToday, setLocToday] = useGlobalState('locToday');
  const [locThisWeek, setLocThisWeek] = useGlobalState('locThisWeek');
  const [locLastWeek, setLocLastWeek] = useGlobalState('locLastWeek');
  const [locMoreThanWeek, setLocMoraThanWeek] = useGlobalState('locMoreThanWeek');

  const [df, setDf] = React.useState<TresDoc[]>([]);

  React.useEffect(() => {
    db?.get()
      .then(v => {
        setLocations(v);
        v.map((v, i) => {
          switch (compareDate(v.timestamp)) {
            case Data.Today:
              if(locToday.some(i  => i.id === v.id)) break;
              setLocToday([...locToday, v])
              break;
            case Data.ThisWeek:
              if(locThisWeek.some(i  => i.id === v.id)) break;
              setLocThisWeek([...locThisWeek, v])
              break;
            case  Data.LastWeek:
              if(locLastWeek.some(i  => i.id === v.id)) break;
              setLocLastWeek([...locLastWeek,  v]);
              break;
            case Data.MoreThanAWeek:
              if(locMoreThanWeek.some(i  => i.id === v.id)) break;
              setLocMoraThanWeek([...locMoreThanWeek, v]);
              break;
            default:
              break;
          }
        })
      })
   }, []);

  return (
    <>
      <StatusBar backgroundColor="#F1EAD8" barStyle="dark-content" />
      <Tab.Navigator
        tabBar={props => <BottomBar {...props} />}
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen initialParams={{
          data: locToday,
          name: `${locToday.length} total place/s visited today`
        }}  name="Stats"  component={StatsScreen} />
        <Tab.Screen name="Device" component={DeviceNavigator} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </>
  );
}
