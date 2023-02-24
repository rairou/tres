import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../interfaces/screen';
import ConnectScreen from '../screens/connect';
import AuthNavigator from './auth';

const RootStack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Connect">
      <RootStack.Screen name="Connect" component={ConnectScreen} />
      <RootStack.Screen name="_Auth" component={AuthNavigator} />
    </RootStack.Navigator>
  );
}
