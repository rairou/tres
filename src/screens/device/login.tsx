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
import {SafeAreaView, View, Text, Pressable, Alert} from 'react-native';
import { LoginScreenProps } from '../../interfaces/screen';
import auth,  { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { onGoogleButtonPress } from '../../lib/auth';
import { useGlobalState } from '../../lib/state';
import Button from '../../components/button';
import Google from '../../components/google';
import Input from '../../components/input';
import Loading from '../../components/loading';
import ErrorDialog from '../../components/dialog';


const LoginScreen: React.FC<LoginScreenProps> = props => {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = useGlobalState('user');

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (!user) {
      props.navigation.navigate("Login");
    } else {
      props.navigation.navigate("FindDevice");
    }
    if (loading) setLoading(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);


  // if (user) {
  //   props.navigation.navigate("FindDevice");
  // }

  const validateEmail = (text: string): boolean => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    }
    else {
      return true
    }
  }
  
  const login = () => {
    setLoading(true);
          auth().signInWithEmailAndPassword(email, password).then(() => {
            // props.navigation.navigate('FindDevice');
          }).catch((e: FirebaseAuthTypes.NativeFirebaseAuthError) => {
            // idk if it is necessary to store the error message as state or store it as local variable
            setLoading(false);
            let error = e.message;
            
            <ErrorDialog title="Login Error" message={`${e.code} : ${error}`} />
          
          })
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#F1EAD8]">
      
      <View>
        <Loading title='Logging in...' visible={loading} />
      <Text className='font-bold py-5 text-[30px] text-[#0e0e0e]' style={{ fontFamily: 'JetBrains Mono' }}>Login</Text>
 
      <Button  onPress={() => {
        onGoogleButtonPress().then((value) => {
          props.navigation.navigate("FindDevice");

        }).catch((e) => {
          console.log(`Error signing in using google: ${e}`);
        });
      }} text='Login with Google' icon={<Google />} />

        <Text className='pt-2 text-[#9b7b7d]' style={{ fontFamily: 'JetBrains Mono' }}>NOTE: Username and Password login is currently unavailable, use google instead.</Text>
        <Input disabled type="email-address" onChangeText={(v) => setEmail(v)} klass="pt-10" placeholder="Enter your email" />
        <Input disabled type="email-address" onChangeText={(v) => setPassword(v)} klass="pb-5" placeholder="Enter your password" password />

        <Button disabled onPress={() => {

          if (email && password && validateEmail(email)) {
            login()
          } else {
            Alert.alert("Login Error", "Please provide proper email or password");
          }
        }} text='Login' />
{/* 
        <Pressable onPress={() => props.navigation.navigate("Register")}>
            <Text className="text-[#0e0e0e] pt-5 underline" style={{ fontFamily: 'JetBrains Mono' }}>Register here &rarr;</Text>
        </Pressable> */}
        </View>

    </SafeAreaView>
  );
}

export default LoginScreen;
