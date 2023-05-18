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
import {SafeAreaView, View, Text} from 'react-native';
import { LoginScreenProps } from '../../interfaces/screen';
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { onGoogleButtonPress } from '../../lib/auth';
import { useGlobalState } from '../../state';
import Button from '../../components/button';

const LoginScreen: React.FC<LoginScreenProps> = props => {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = useGlobalState('user');
  
  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (user) {
    props.navigation.navigate("FindDevice");
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#F1EAD8]">
      <Text className="text-[#0e0e0e]" style={{fontFamily: 'JetBrains Mono'}}>
        Login Screens
        <Button onPress={() => onGoogleButtonPress().then(() => { 
          console.log("Signed in with google") 
        })} text='Login with Google'/>
      </Text>
    </SafeAreaView>
  );
}

export default LoginScreen;
