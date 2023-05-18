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
import {SafeAreaView, View, Text, Image, Alert, StatusBar, Modal, Pressable, LogBox} from 'react-native';
import Button from '../components/button';
import {ConnectScreenProps} from '../interfaces/screen';
import { Location, TransactionData } from '../interfaces/data';
import { useGlobalState } from '../state';
import Loading from '../components/loading';
import { BackgroundService, start, stop, Geolocation } from '../lib/task';
import { decode, sleep } from "../lib/utils";
import { BLE_CONF, ble, scanDevice } from "../lib/ble";
import { Device } from 'react-native-ble-plx';
import { bluetooth_permission, location_permission } from '../lib/perm';
import { PERMISSIONS, check } from 'react-native-permissions';

// LogBox.ignoreLogs(["new NativeEventEmitter"])
LogBox.ignoreAllLogs();

type DialogProps = {
  visible: boolean;
  title?: string;
  desc?: string;
}

export const options = {
  taskName: "TRES",
  taskTitle: "TRES Tracker",
  taskDesc: "Realtime track your device",
  taskIcon: {
    name: "ic_launcher",
    type: "mipmap"
  },
  color: "#ff0ff",
  parameters: {
    delay: 1000 
  }
}



const ConnectScreen: React.FC<ConnectScreenProps> = props => {
  const [loc, setLoc] = useGlobalState('loc');
  const [conn, setConn] = useGlobalState('connection');
  const [value, setValue] = useGlobalState('value');

  const [dialog, setDialog] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);
  const [showConnecting, setShowConnecting] = React.useState(false);
  const [dc, setDc] = React.useState(false);

  const scan = async (connectionHandler: (device: Device) => void) => {
    ble.startDeviceScan(null, null, (error, scannedDevice) => {
      console.log(`Devices: ${scannedDevice}`);
      if (scannedDevice && scannedDevice.name === BLE_CONF.name) {
          ble.stopDeviceScan();
          connectionHandler(scannedDevice);
      }
    });
  
  }

  
  React.useEffect(() => {
    BackgroundService.on('expiration', async () => {
      console.log("Disconnected");
      
    })
  }, []);

  React.useEffect(() => {
    setDialog(conn.ble ? 'Connected successfully' : 'Disconnected succesfully');
    if (!BackgroundService.isRunning()) {
      setConn({
        ble: false,
        error: ''
      })
    }
    console.log(`Error: ${conn.error}`)
    // if (conn.error) setShowDialog(true)
  }, []);

 
  
  const connectDevice = async (device: Device) => {
    
        device
            .connect()
            .then(device => {
                setConn({
                  ble: true,
                  device: device,
                  error: ''
                })
                return device.discoverAllServicesAndCharacteristics();
            })
            .then(device => {
                ble.onDeviceDisconnected(device.id, (error, device) => {
                    console.log(`Device : ${device?.id} disconnected`);
                    setConn({
                      ble: false
                    })
                    setDc(true);
                });
                device
                    .readCharacteristicForService(BLE_CONF.service, BLE_CONF.message)
                    .then(v => {
                        let val = JSON.parse(decode(v?.value)) as TransactionData;
                        setValue({
                          message: val,
                        })
                    });

                device
                    .readCharacteristicForService(BLE_CONF.service, BLE_CONF.box)
                    .then(v => {
                      let val = JSON.parse(decode(v?.value)) as TransactionData;
                      setValue({
                        box: val
                      })
                    });
                
                device.monitorCharacteristicForService(
                    BLE_CONF.service, 
                    BLE_CONF.message, 
                    (error, char) => {
                        if (!char) return
                        let val = JSON.parse(decode(char?.value)) as TransactionData;
                        setValue({
                          message: val
                        })
                        
                    },
                    "messagetransaction"
                );
                
                device.monitorCharacteristicForService(
                    BLE_CONF.service, 
                    BLE_CONF.box, 
                    (error, char) => {
                        if (!char) return
                        let val = JSON.parse(decode(char?.value)) as TransactionData;
                        setValue({
                          box: val
                        })
                    },
                    "boxtransaction"
                );

                console.log("Connection established");

            });
        


  }

  const disconnectDevice = async () => { 
    let device = conn.device;
    if (!device) return
    const isConnected = await device.isConnected();
    if (isConnected) {
        ble.cancelTransaction('messagetransaction');
        ble.cancelTransaction('nightmodetransaction');
        ble.cancelDeviceConnection(device.id)
            .then(() => {
                console.log('Disconnected');
                setConn({
                  ble: false
                })
            })
    }
    
  }

  const client = async (data: any) : Promise<void> => {
    await new Promise(async (resolve) => {
      const { delay } = data?.delayw || 1000;

      console.log(`Background task status: ${BackgroundService.isRunning()} with delay ${delay}`);
      for (let i = 0; BackgroundService.isRunning(); i++) {

        
        
        // await connectDevice();
        ble.startDeviceScan(null, null, (error, scannedDevice) => {
          if (scannedDevice && scannedDevice.name === BLE_CONF.name) {
            ble.stopDeviceScan();
            connectDevice(scannedDevice);
      
          }
        });
        // await sleep(3000);
        setShowConnecting(true);
        if (!conn.device) {
          console.log('No device found inside');
          setShowConnecting(false)
          setConn({
            ble: false,
            error: 'No device found'
          })
          // stop();
        } else {
          setShowConnecting(false);
        }
        
  
        Geolocation.getCurrentPosition(async (pos) => {
          let c = pos.coords;

          setLoc({
            lat: c.latitude,
            long: c.longitude
          })
  
          if (BackgroundService.isRunning()) {
            await BackgroundService.updateNotification({
                taskDesc: `Latitude: ${c.latitude}; Longitude: ${c.longitude}`
            });
          }
        })
  
        
        await sleep(delay)
        
      }
    });
  }


  return (
    <SafeAreaView className="flex-1 bg-[#F1EAD8] justify-center">
      <Loading visible={showConnecting} title='Connecting...' />

      <Modal transparent statusBarTranslucent onRequestClose={() => {
        setShowDialog(false);
        setConn({
          ble: conn.ble,
          error: ''
        })
      } } visible={showDialog}>
            <View className='flex-1 items-center bg-[black]/70 justify-center'>
            <View className="flex-col min-w-[80vw] rounded-md bg-[#F1EAD8] p-5 px-5">
                <Text 
                    className='pb-2 font-semibold' 
                    style={{ 
                        color: '#a78587', 
                        fontSize: 20,  
                        fontFamily: 'JetBrains Mono' 
                    }}>
                        TRES
                    </Text>
                    <Text 
                    className='font-semibold' 
                    style={{ 
                        color: '#0e0e0e', 
                        fontSize: 14,  
                        fontFamily: 'JetBrains Mono' 
                    }}>
                        {/* {`${connected ? (conn.error ? `Error: ${conn.error}` : 'Connected succesfully') : 'Disconnected successfully'} `} */}
                        {conn.error ? conn.error : dialog}
                    </Text>
                    <Pressable className='pt-5' onPress={() => setShowDialog(false)}>
                        <View className="bg-[#a78587] max-w-[20vw] items-center">
                            <Text className="text-[14px]" style={{ fontFamily: 'JetBrains Mono' }}>Ok</Text>
                        </View>
                    </Pressable>
                   
            </View>
            </View>

        </Modal>

      <StatusBar backgroundColor="#a78587" barStyle="default" />
      <View className="flex bg-[#a78587] px-2 py-7">
        <Image
          className=""
          source={require('../../assets/images/illustration.png')}
        />
      </View>
      <View className="flex-1 gap-5 py-7 px-10">
        <Text
          style={{fontFamily: 'JetBrains Mono', fontWeight: 'bold'}}
          className="text-[#0e0e0e] text-[30px]">
          Multi-purpose security device
        </Text>
        <Text
          style={{fontFamily: 'JetBrains Mono'}}
          className="text-[#0e0e0e] text-[15px]">
          Get insights into your location with ease.
        </Text>

        <View className="flex-1 pt-4">
          <Button
            onPress={async () => {
              // Alert.alert('TRES', 'Connect button pressed', [
              //   {
              //     text: 'Cancel',
              //     onPress: () => console.log('Cancel Pressed'),
              //     style: 'cancel',
              //   },
              //   {text: 'OK', onPress: () => console.log('OK Pressed')},
              // ]);
           
              let c = !conn.ble;
              
              if (c) {
         
                // setShowConnecting(true)
                await start(client);
              
      
              } else {
                await stop();
              } 
              // ble.stopDeviceScan();
              // ble.startDeviceScan(null, null, (error, scannedDevice) => {
              //   if (error) {
              //     console.log('E: ', error);
              //   }
              //   console.log(scannedDevice);
                
              // })


            }}
            text={`${conn.ble ? 'DISCONNECT' : (conn.error ? conn.error : 'CONNECT')}`}
            background={`${conn.ble ? '#719372' : '#a78587'}`}
          />
          <View className="h-3"></View>
          <Button
            onPress={() => props.navigation.navigate('_Auth', {
              connect: false
            })}
            text="VIEW STATS"
          />
          <Text className='text-[#0e0e0e]'>Dc: {dc}</Text>
          <Text className='text-[#0e0e0e]'>Device: {conn.device?.name}</Text>
          <View className="min-h-10 bg-[#0e0e0e]"></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConnectScreen;
