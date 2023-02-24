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

const Tab = createBottomTabNavigator<TabParamList>();
export default function MainNavigator() {
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
