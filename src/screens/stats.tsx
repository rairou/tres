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


import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Alert, TouchableOpacity, View, Text, Image} from 'react-native';
import { StatsScreenProps } from '../interfaces/screen';
import PieChart from 'react-native-pie-chart';
import { useGlobalState } from '../lib/state';
import open from '../lib/maps';
import { TresDoc } from '../interfaces/data';
import { ScrollView } from 'react-native-gesture-handler';


export default function StatsScreen(props: StatsScreenProps) {
  const navigation = useNavigation();
  const [db, _] = useGlobalState('db');
  const [data, setData] = React.useState<TresDoc[]>();

  React.useEffect(() => {

    // console.log(props.route.params.data);
    if (!props.route.params.data) {
      props.navigation.navigate("Home");
    }

    setData(props.route.params.data);

  }, [])
  return (
    <ScrollView className='bg-[#f1ead8]' showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
    <SafeAreaView className="flex-1 px-5 pt-12 bg-[#F1EAD8]">
     
      <Text className='text-[#0e0e0e]' style={{ fontFamily: 'JetBrains Mono' }}>
        {data?.length} place/s visited today
      </Text>
      <Text
          className="text-[#0e0e0e] py-4 font-semibold text-[40px]"
          style={{fontFamily: 'JetBrains Mono'}}>
          Summary
        </Text>
      <View>
        {data && (data.map((v, i) => {
          return (
            <View key={v.id} className='py-2'>
              
          <View className="border px-2 py-2 border-t-[#0e0e0e] border-b-[#0e0e0e]">
          
          <Text className="text-[20px]  font-extrabold text-[#0e0e0e]" style={{ fontFamily: 'JetBrains Mono' }}>
          {i + 1}</Text>


              <Text className='text-[15px] font-semibold text-[#0e0e0e]' style={{ fontFamily: 'JetBrains Mono' }}>
                Latitude: {v.lat} Longitude: {v.long}
              </Text>   
              <Text className='text-[15px] pt-4 text-[#0e0e0e]' style={{ fontFamily: 'JetBrains Mono' }}>
                {new Date(v.timestamp).getMonth()}/{new Date(v.timestamp).getDay()}/{new Date(v.timestamp).getFullYear()}
              </Text>            
              <View className="flex flex-row gap-4">
                <TouchableOpacity  onPress={() => {
                open({
                  lat: v.lat,
                  long: v.long,
                  label: `Location: ${i + 1}`
                })
              }}className=''>
              <Text className='text-[#0e0e0e] underline' style={{ fontFamily: 'JetBrains Mono' }}>
                Open Maps &rarr;
              </Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => {
                Alert.alert(
                  "Are your sure?",
                  `Are you sure you want to clear all settings? Please take note that this action cannot be undone.`,
                  [
                    {
                      text: "Yes",
                      onPress: async () => {
                        await db?.delete(v.id);
                        setData(prev => prev?.filter(x => x !== v))
                      },
                    },
                    {
                      text: "No",
                    },
                  ]
                );
              }}className=''>
              <Text className='text-[#806567] underline' style={{ fontFamily: 'JetBrains Mono' }}>
                Delete Location
              </Text>
            </TouchableOpacity>
            </View>
     
          </View>
        
          </View>
          )
        }))}
      </View>

   
    </SafeAreaView>
    </ScrollView>
  );
}
