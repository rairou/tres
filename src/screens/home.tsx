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


import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {HomeScreenProps} from '../interfaces/screen';
import { LOCATION, useGlobalState } from '../lib/state';
import { location_permission } from "../lib/perm";
import { sleep } from "../lib/utils";
import { BackgroundService, start, stop } from '../lib/task';
import Geolocation from '@react-native-community/geolocation';
import Button from '../components/button';
import { ble } from '../lib/ble';
import { Device } from 'react-native-ble-plx';


interface TaskData {
    delay: number;
}


const HomeScreen: React.FC<HomeScreenProps> = props => {
  const [loc, setLoc] = useGlobalState('loc');
  const [val, setVal] = useGlobalState('value');
  const [devices, setDevices] = React.useState<Device[]>([]);

  let running = BackgroundService.isRunning();

  const scan = () => {
    ble.startDeviceScan(null, null, (error, device) => {
      if (device) {
        setDevices([...devices, device])
      }
    })
  }
  
  React.useEffect(() => {
      location_permission();
      
  }, []);

  return (
    <SafeAreaView className="flex-1 px-5 pt-12 bg-[#F1EAD8]">
      <View className="">
        <Text
          className="text-[#0e0e0e] font-semibold text-[40px]"
          style={{fontFamily: 'JetBrains Mono'}}>
          You've been in
          <Text
            className="text-[#a78587]"
            style={{fontFamily: 'JetBrains Mono'}}>
            {' '}
            2{' '}
          </Text>
          places TODAY!
        </Text>
        <Button onPress={scan} text='Scan' padding={{ top: 2 }} />
        <Button onPress={async () => {
          if (running) await stop();
        }}  text="Stop" />
        <Text className='text-[#0e0e0e]' style={{ fontFamily: 'JetBrains Mono' }}>
          Lat: {loc?.lat}; Long: {loc?.long}
        </Text>
        {devices.map((v, i) => {
          return (<Text className='text-[#0e0e0e]' style={{ fontFamily: 'JetBrains Mono' }}>
          Device: {v.name};{v.id}
        </Text>
          )
        })}
        <Text className='text-[#0e0e0e]' style={{ fontFamily: 'JetBrains Mono' }}>
          Type: ${val.message} Message: {val.message}
        </Text>
        
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
