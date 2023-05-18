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


import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackParamList} from '../interfaces/screen';
import AuthScreen from '../screens/auth';
import MainNavigator from './main';
import { useRoute, RouteProp } from '@react-navigation/native';

const AuthStack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  const route: RouteProp<AuthStackParamList> = useRoute();
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Auth">
      <AuthStack.Screen initialParams={{ connect:  route.params?.connect }} name="Auth" component={AuthScreen} />
      <AuthStack.Screen name="Main" component={MainNavigator} />
    </AuthStack.Navigator>
  );
}
