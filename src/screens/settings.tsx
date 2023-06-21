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
import {
  SafeAreaView, 
  View, 
  Text,
  ScrollView, 
  TouchableOpacity, 
  Alert, 
  ToastAndroid,
  BackHandler
} from 'react-native';

import Button from '../components/button';
import Input from '../components/input';
import SwitchToggle from 'react-native-switch-toggle';
import { useGlobalState } from '../lib/state';
import { Location, SMSData } from '../interfaces/data'
import uuid  from 'react-native-uuid';
import { FileSystem } from 'react-native-file-access';
import { useNavigation } from '@react-navigation/native';
import { getDbPath } from '../lib/path';
import { CONSTANT } from '../lib/constant';


type ItemProps = {
  data: SMSData;
  onPress: () => void;
}
function Item({ data, onPress }: ItemProps)  {
  return (
    <View>
      <TouchableOpacity onPress={onPress} className='py-2 px-2'>
        <View className="bg-[#719372] border border-[#0e0e0e] rounded-lg py-2 px-2">
        <Text 
          className='text-[#0e0e0e]' 
          style={{ fontFamily: 'JetBrains Mono' }}
        >
          {data.number}
        </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default function SettingsScreen() {
  const [db, _setDb] = useGlobalState('db');
  const [interval, setInterval] = useGlobalState('interval')
  const [autoConnect, setAutoConnect] = useGlobalState('auto_connect')
  const [numbers, setNumbers] = useGlobalState('numbers')
  const [num, setNum] = React.useState('');
  const [location, setLocation] = React.useState<Location>({
    lat: 0,
    long: 0
  });
  
  const navigation = useNavigation();

  function renderItem(item: SMSData) {
    return (

    <Item key={item.id} data={item} onPress={() => {
    console.log(`Remove: ${item.number}`);
    Alert.alert(
      "Are your sure?",
      `Are you sure you want to remove number:  '${item.number}' permanently?`,
      [

        {
          text: "Yes",
          onPress: () => {
            db?.removeSettingsNumber(item)
            .then(() => {
              const filtered = numbers.filter(i => i.id !== item.id)
              setNumbers(filtered);
              showToast("Removed successfully, please restart the app");
            })
            .catch(e => {
              showToast(e.toString());
            })
            
          },
        },

        {
          text: "No",
        },
      ]
    );
   
  }}  />
  
    )
  }



  const showToast = (message: string) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  }
  
  
  return (
    <SafeAreaView className="flex-1 px-2  bg-[#F1EAD8]">
      <ScrollView showsVerticalScrollIndicator={false} className='' contentContainerStyle={{ 
          flexGrow: 1, 
          // backgroundColor: 'red', 
          paddingLeft: 10
        }} style={{ 
          width: '100%', 
          paddingLeft: 0, 
        }}>
      <View className='flex-1 pt-12'>
        <Text
          className="text-[#0e0e0e] font-semibold text-[40px]"
          style={{fontFamily: 'JetBrains Mono'}}>
          Settings
        </Text>
        
        <View className='pt-2'>
          <Text className='text-[#0e0e0e] text-[25px] font-semibold' style={{ 
            fontFamily: 'JetBrains Mono' 
          }}>Interval</Text>
          <Text className='pt-2 font-semibold text-[#0e0e0e]' style={{ fontFamily: 'JetBrains Mono' }}>
            The time interval for the passive tracking (in minutes)
          </Text>
          <Input 
            onChangeText={(v) => {
              setInterval(Number(v));
            }}
            type="numeric" 
            klass='pt-4' 
            value={interval ? interval.toString() : undefined}
            placeholder='Time interval in min' 
          />
          <Button background='#719372' padding={{
            
          }} text='Save' onPress={() => {
            db?.updateSettingsInterval(Number(interval))
              .then(() => {
                showToast('Saved successfully. Re-connect to the server to apply changes')
              })
          }} />
        </View>
        {/* <View className='pt-6'>
          <Text className='text-[#0e0e0e] text-[25px] font-semibold' style={{ 
            fontFamily: 'JetBrains Mono' 
          }}>Auto Connect</Text>
          <Text className='py-2 font-semibold text-[#0e0e0e]' style={{ fontFamily: 'JetBrains Mono' }}>
           Toggle auto connect
          </Text>
          <SwitchToggle 
            
            switchOn={autoConnect} 
            circleColorOff='#a78587'
            backgroundColorOff='#8b6f71'
            backgroundColorOn='#719372'
            circleColorOn='#526b53'
            onPress={() => {
              db?.updateSettingsAutoConnect(!autoConnect).then(() => {
                console.log(`Set`);
              })
              setAutoConnect(prev => !prev);
            }}
            containerStyle={{ width: 50, height: 25, borderRadius: 25, padding: 5}}
            circleStyle={{ width: 17, height: 17, borderRadius: 8 }}
          />
        </View> */}
        <View className='pt-6'>
          <Text className='text-[#0e0e0e] text-[25px] font-semibold' style={{ 
            fontFamily: 'JetBrains Mono' 
          }}>Emergency Numbers</Text>
          <Text className='pt-2 font-semibold text-[#0e0e0e]' style={{ fontFamily: 'JetBrains Mono' }}>
            Add / remove up to <Text style={{ fontFamily: 'JetBrains Mono' }} className="font-extrabold text-[#0e0e0e]">5</Text> emergency numbers {}
          </Text>
          <Input 
            onChangeText={(s) => {
              setNum(s);
            }}
            type="numeric" 
            klass='pt-4' 
            value={num}
            placeholder='Emergency numbers' 
          />
          <Button background='#719372'  text='Add' onPress={() => {
            console.log(!(num.length === 11), num.startsWith(CONSTANT.country_code));
            if (!(num.length === 11) || !num.startsWith(CONSTANT.country_code)) {
              showToast('Invalid number format')
              return
            }
            let id = uuid.v4().toString();
            db?.addSettingsNumber({
              id: id,
              number: num
            })
              .then(v => {
                setNumbers([...numbers, {
                  id:id,
                  number: num
                }]);
                showToast(`Successfully added '${num}'`);
               
              })
              .catch(e => showToast(e.toString()));
            

          }} />
          
        
        <View style={{ paddingTop: 10,  paddingBottom: 10 }}>
          <View className="flex-1 flex-row flex-wrap">
            {numbers.map((v) => {
              return renderItem(v);
            })}
          </View>
        </View>
         
        </View>

        <Text
          className="text-[#7c6465] pt-6 font-semibold text-[40px]"
          style={{fontFamily: 'JetBrains Mono'}}>
          Danger Zone
        </Text>
        <View className='py-4'>
        <Text className='text-[#0e0e0e] text-[25px] font-semibold' style={{ 
            fontFamily: 'JetBrains Mono' 
          }}>Settings Configuration</Text>
          <Text className='py-2 font-semibold text-[#0e0e0e]' style={{ fontFamily: 'JetBrains Mono' }}>
            Revert all settings config to default 
          </Text>
          <Button  padding={{ top: 5 }} text="Clear Settings" onPress={() => {
             Alert.alert(
              "Are your sure?",
              `Are you sure you want to clear all settings? Please take note that this action cannot be undone.`,
              [

                {
                  text: "Yes",
                  onPress: () => {
                    db?.clearSettings()
                      .then(() => {
                        showToast("All setting were reverted to the default value.")
                        setNumbers([]);
                        navigation.setParams(undefined);
                      })
                      .catch(e => {
                        showToast(e.toString())
                      })
                      
                  },
                },

                {
                  text: "No",
                },
              ]
            );
          }} />
        </View>
        <View className='py-4'>
        <Text className='text-[#0e0e0e] text-[25px] font-semibold' style={{ 
            fontFamily: 'JetBrains Mono' 
          }}>Location  History</Text>
          <Text className='py-2 font-semibold text-[#0e0e0e]' style={{ fontFamily: 'JetBrains Mono' }}>
            Clear all location history
          </Text>
          <Button padding={{ top: 5 }} text="Clear History" onPress={() => {
            Alert.alert(
              "Are your sure?",
              `Are you sure you want to clear all the location? Please take note that this action cannot be undone.`,
              [

                {
                  text: "Yes",
                  onPress: () => {
                    db?.clear()
                      .then(() => {
                        showToast("Successfully deleted the history.")
                      })
                      .catch(e => {
                        showToast(e.toString())
                      })
                  },
                },

                {
                  text: "No",
                },
              ]
            );
          }} />
        </View>
        <View className='py-4'>
        <Text className='text-[#0e0e0e] text-[25px] font-semibold' style={{ 
            fontFamily: 'JetBrains Mono' 
          }}>Database</Text>
          <Text className='py-2 font-semibold text-[#0e0e0e]' style={{ fontFamily: 'JetBrains Mono' }}>
            Delete and create new fresh database
          </Text>
          <Button padding={{ top: 5 }} text="Clear Database" onPress={() => {
            Alert.alert(
              "Are your sure?",
              `Are you sure you want to delete the database permanently? Please take note that this action cannot be undone.`,
              [

                {
                  text: "Yes",
                  onPress: () => {
                    FileSystem.unlink(getDbPath()).then(() => {
                      showToast("Successfully deleted the database. App exited")
                      BackHandler.exitApp();
                    })
                      .catch(e => {
                        showToast(e.toString());
                        
                      })
                  },
                },

                {
                  text: "No",
                },
              ]
            );
          }} />
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
