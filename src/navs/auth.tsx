import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackParamList} from '../interfaces/screen';
import AuthScreen from '../screens/auth';
import MainNavigator from './main';

const AuthStack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Auth">
      <AuthStack.Screen name="Auth" component={AuthScreen} />
      <AuthStack.Screen name="Main" component={MainNavigator} />
    </AuthStack.Navigator>
  );
}
