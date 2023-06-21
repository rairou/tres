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


import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView, 
  View, 
  Image, 
  Text, 
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {HomeScreenProps} from '../interfaces/screen';
import { Data, compareDate } from '../lib/time';
import { useGlobalState } from '../lib/state';
import { Location, TresDoc } from '../interfaces/data';
import { Geolocation } from '../lib/task';
import uuid from 'react-native-uuid';
import Button from '../components/button';
import { AndroidSuccessTypes, DirectSms, SendSMS } from '../lib/sms';


function Item({ data }: { data: TresDoc }) {
  return (
    <TouchableOpacity>
      <Text>{data.lat} {data.long} {data.timestamp}</Text>
    </TouchableOpacity>
  )
}


const HomeScreen: React.FC<HomeScreenProps> = props => {
  const [db, setDb] = useGlobalState('db');
  const [locations, setLocations] = useGlobalState('locationHistory');
  const [locToday, setLocToday] = useGlobalState('locToday');
  const [locThisWeek, setLocThisWeek] = useGlobalState('locThisWeek');
  const [locLastWeek, setLocLastWeek] = useGlobalState('locLastWeek');
  const [locMoreThanWeek, setLocMoraThanWeek] = useGlobalState('locMoreThanWeek');

  const [loc, setLoc] = React.useState({
    long: 0,
    lat: 0,
  });

  React.useEffect(() => {
    db?.get()
      .then(v => {
        console.log(`Locations`, v);
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
   
          }
        })
      })
    Geolocation.getCurrentPosition((pos) => {
      let c = pos.coords;
      setLoc({
        lat: c.latitude,
        long: c.longitude
      })
    })
  }, [])

  if (!locations) return  (
  <SafeAreaView className="flex-1 justify-center items-center bg-[#F1EAD8]">
    
        <Text className="text-[#0e0e0e] text-lg pt-10" style={{ fontFamily: 'JetBrains Mono' }}>
            Empty History
        </Text>
        
        </SafeAreaView>
  )
  return (      
      <ScrollView showsVerticalScrollIndicator={false} className='' contentContainerStyle={{ 
        flexGrow: 1, 
        paddingLeft: 0
      }} style={{ 
        width: '100%', 
        paddingLeft: 0, 
      }}>
        
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
            {locToday.length}{' '}
          </Text>
          place/s TODAY!
        </Text>
        <View>

        <TouchableOpacity onPress={() => {
          props.navigation.navigate('Stats', {
            data: locToday,
            name: `${locToday.length} total place/s visited today.`
          })
        }} className='pt-2'>
              <Text className='text-[#0e0e0e] underline' style={{ fontFamily: 'JetBrains Mono' }}>
                Learn More &rarr;
              </Text>
            </TouchableOpacity>
          
        </View>
        <View className='pt-12'>
          <View className='py-2'>
          <View className="border border-t-[#0e0e0e] border-b-[#0e0e0e]">
          <Text className="py-2 text-[20px] px-2 extrabold text-[#0e0e0e]" style={{ fontFamily: 'JetBrains Mono' }}>
            {locThisWeek.length} <Text className='text-[15px]'>place/s you've visited <Text className='font-semibold'>this week</Text></Text>
            {locThisWeek.length >= 1 && (
              
              <TouchableOpacity onPress={() => {
                props.navigation.navigate("Stats", { data: locThisWeek, name: `${locThisWeek.length} total place/s visited this week` })
              }} className='pt-2'>
              <Text className='text-[#0e0e0e] underline' style={{ fontFamily: 'JetBrains Mono' }}>
                Learn More &rarr;
              </Text>
            </TouchableOpacity>
            )}
          </Text>
          </View>
        
          </View>
          <View className='py-2'>
          <View className="border border-t-[#0e0e0e] border-b-[#0e0e0e]">
          <Text className="py-2 text-[20px] px-2 extrabold text-[#0e0e0e]" style={{ fontFamily: 'JetBrains Mono' }}>
            {locLastWeek.length} <Text className='text-[15px]'>place/s you've visited <Text className='font-semibold'>last week</Text></Text>
            {locLastWeek.length >= 1 && (
              
              <TouchableOpacity onPress={() => {
                props.navigation.navigate("Stats", { data: locLastWeek, name: `${locLastWeek.length} total place/s visited last week` })
              }} className='pt-2'>
              <Text className='text-[#0e0e0e] underline' style={{ fontFamily: 'JetBrains Mono' }}>
                Learn More &rarr;
              </Text>
            </TouchableOpacity>
            )}
          </Text>
          </View>
        
          </View>
          
          <View className='py-2'>
          <View className="border border-t-[#0e0e0e] border-b-[#0e0e0e]">
          <Text className="py-2 text-[20px] px-2 extrabold text-[#0e0e0e]" style={{ fontFamily: 'JetBrains Mono' }}>
            {locMoreThanWeek.length} <Text className='text-[15px]'>place/s you've visited <Text className='font-semibold'>more than a week</Text></Text>
            {locMoreThanWeek.length >= 1 && (
              
              <TouchableOpacity  onPress={() => {
                props.navigation.navigate("Stats", { data: locMoreThanWeek, name: `${locLastWeek.length} total place/s visited more than week` })
              }}className='pt-2'>
              <Text className='text-[#0e0e0e] underline' style={{ fontFamily: 'JetBrains Mono' }}>
                Learn More &rarr;
              </Text>
            </TouchableOpacity>
            )}
          </Text>
          </View>
        
          </View>
       
        </View>
    </View>
    </SafeAreaView>
    </ScrollView>
    
  );
};

export default HomeScreen;
