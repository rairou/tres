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
import { RegisterScreenProps } from '../../interfaces/screen';
import Input from '../../components/input';
import Button from '../../components/button';
import Google from '../../components/google';
import { useGlobalState } from '../../lib/state';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Loading from '../../components/loading';
import { onGoogleButtonPress } from '../../lib/auth';
import ErrorDialog from '../../components/dialog';


const RegisterScreen: React.FC<RegisterScreenProps> = props => {
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPass, setConfirmPass] = React.useState("");
    const [user, setUser] = useGlobalState('user');
  
    const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
      setUser(user);
      if (loading) setLoading(false);
    }
  
    React.useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }, []);


    const validateEmail = (text: string): boolean => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
          console.log("Email is Not Correct");
          return false;
        }
        else {
          console.log("Email is Correct");
          return true
        }
      }

  if (user) {
    console.log("Sign in");
  }

      
  const register = () => {
    setLoading(true);
          auth().createUserWithEmailAndPassword(email, password).then(() => {
            props.navigation.navigate('FindDevice');
          }).catch((e: FirebaseAuthTypes.NativeFirebaseAuthError) => {
            setLoading(false)
            // idk if it is necessary to store the error message as state or store it as local variable
            let error = e.message;
            <ErrorDialog title="Login Error" message={`${e.code} : ${error}`} />
          
          })
  }
  
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#F1EAD8]">
      <Loading visible={loading} title="Registerring..." />
      <View>
      <Text className='font-bold py-5 text-[30px] text-[#0e0e0e]' 
      style={{ fontFamily: 'JetBrains Mono' }}>Register</Text>
 
      <Button  onPress={() => {
              onGoogleButtonPress().then((value) => {
                props.navigation.navigate("FindDevice");
                
              }).catch((e) => {
                console.log(`Error signing in using google: ${e}`);
              });
            }} text='Login with Google' icon={<Google />} />

        
        <Input type="email-address" onChangeText={(e) => setEmail(e)} klass="pt-10" placeholder="Enter your email" />
        <Input type="email-address" onChangeText={(e) => setPassword(e)}  placeholder="Enter your password" password />
        <Input type="email-address" onChangeText={(e) => setConfirmPass(e)}  klass="pb-5" placeholder="Confirm your password" password />

        <Button onPress={() => {
            if (email && password && password === confirmPass && validateEmail(email)) {
                register()
            }
        }} text='Register' />

        <Pressable onPress={() => props.navigation.navigate("Login")}>
            <Text className="text-[#0e0e0e] pt-5 underline" style={{ fontFamily: 'JetBrains Mono' }}>
                Login here &rarr;
            </Text>
        </Pressable>
        </View>

    </SafeAreaView>
  );
}

export default RegisterScreen;
