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
import {SafeAreaView, View, Text, Switch, Pressable} from 'react-native';
import { FindDeviceScreenProps } from '../../interfaces/screen';
import { useGlobalState } from '../../state';
import Button from '../../components/button';
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation } from '@react-navigation/native';
// import MapView from 'react-native-maps';
import Input from '../../components/input';
import SwitchToggle from 'react-native-switch-toggle';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../../interfaces/data';
import ErrorDialog from '../../components/dialog';
import Loading from '../../components/loading';

interface TresInfo {
  id: string;
  active: boolean;
}

const DeviceScreen: React.FC<FindDeviceScreenProps> = props => {
  const [user, _] = useGlobalState('user');
  const [b, setB] = React.useState(false);
  const [share, setShare] = React.useState(false);
  const navigation = useNavigation();
  const [loc, setLoc] = useGlobalState('loc');
  const [loading, setLoading] = React.useState(false);
  const [l, __l] = React.useState<Location>({
    lat: 0,
    long: 0
  });

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log(`${user}`);
    if (!user) {
      props.navigation.navigate("Login");
    } else {
      props.navigation.navigate("FindDevice");
    }
    if (loading) setLoading(false);
  }

  const signOut = () => {
    setLoading(true);
    auth().signOut().catch((e: FirebaseAuthTypes.NativeFirebaseAuthError) => {
      // idk if it is necessary to store the error message as state or store it as local variable
      setLoading(false);
      let error = e.message;
      
      <ErrorDialog title="Login Error" message={`${e.code} : ${error}`} />
      
    
    })
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      if (!user || b) {
        return
      }
      e.preventDefault();
    });
  }, [navigation])

  
  return (
    
    <SafeAreaView className="flex-1 px-5 pt-12 bg-[#F1EAD8]">
      <View style={{ backgroundColor: '' }}>
        <View>
        <Text
          className="text-[#0e0e0e] font-semibold text-[40px]"
          style={{fontFamily: 'JetBrains Mono'}}>
          Find Device
        </Text>
        
        
        <Text className="text-[#0e0e0e]  pb-2" style={{fontFamily: 'JetBrains Mono'}}>
          TRES allows you to locate device realtime over the internet.
        </Text>

        <View className="py-2 flex-row items-center">
          <Text className="pr-2 font-semibold" 
            style={{ color: share ? '#526b53' : '#0e0e0e', fontFamily: 'JetBrains Mono' }} >Share Location</Text>
          <SwitchToggle 
            switchOn={share} 
            circleColorOff='#a78587'
            backgroundColorOff='#8b6f71'
            backgroundColorOn='#719372'
            circleColorOn='#526b53'
            onPress={() => setShare(previousState => !previousState)}
            containerStyle={{ width: 50, height: 25, borderRadius: 25, padding: 5}}
            circleStyle={{ width: 17, height: 17, borderRadius: 8 }}
          />
        </View>
        </View>
        
        <View style={{ backgroundColor: '' }} className='pt-20'>
        <Text className="px-10 text-[#0e0e0e] pb-5" style={{fontFamily: 'JetBrains Mono'}}>
          Your location | Latitude: {l.lat} Longitude: {l.long}
        </Text>
        
        <View className='items-center'>
        <Input placeholder='Enter device id' />
          <Button background='#719372' padding={{ top: 5 }} onPress={() => {

          }}  text="Locate" />
        </View>
        <Pressable className="" onPress={() => {
          signOut();
        }}>
            <Text className="pt-5 px-10 text-[#0e0e0e]" style={{ fontFamily: 'JetBrains Mono' }}>
              Sign out &rarr;
            </Text>
          </Pressable>
          
        </View>
      </View>
    </SafeAreaView>
  );
}

export default DeviceScreen;
