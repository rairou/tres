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
import {SafeAreaView, ToastAndroid, BackHandler, View, Text, Image, Alert, PermissionsAndroid, Platform, StatusBar, Modal, Pressable, LogBox} from 'react-native';
import Button from '../components/button';
import {ConnectScreenProps} from '../interfaces/screen';
import { Location, TransactionData, TresCol } from '../interfaces/data';
import { useGlobalState } from '../lib/state';
import Loading from '../components/loading';
import { BackgroundService, start, stop, Geolocation, isRunning } from '../lib/task';
import { decode, encode, sleep } from "../lib/utils";
import { BLE_CONF, ble, scanDevice, sendLocationData } from "../lib/ble";
import { BleError, Characteristic, Device } from 'react-native-ble-plx';
import { tresdb } from '../lib/db';
import { getDbPath } from '../lib/path';
import { DirectSms, sendLocation } from '../lib/sms';
import { daysToMs, getTime, minsToMs } from '../lib/time';
import uuid from 'react-native-uuid';

LogBox.ignoreLogs(["new NativeEventEmitter"])
// LogBox.ignoreAllLogs();

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

const requestPerm = async () => {
  // const bleScanPerm = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
  //     {
  //         title: "Location Permission",
  //         message: "BLE requires location",
  //         buttonPositive: "OK",
  //     }
  // );
  // const bleConnectPerm = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
  //     {
  //         title: "Location Permission",
  //         message: "BLE requires Location",
  //         buttonPositive: "OK"
  //     }
  // );
  const fineLocationPerm = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
          title: "Location Permission",
          message: "BLE requires Location",
          buttonPositive: "OK"
      }
  );
    
  return (
      fineLocationPerm === "granted" 
  )
}


const ConnectScreen: React.FC<ConnectScreenProps> = props => {
  const [loc, setLoc] = useGlobalState('loc');
  const [conn, setConn] = useGlobalState('connection');
  const [value, setValue] = useGlobalState('value');

  const [dialog, setDialog] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);
  const [showConnecting, setShowConnecting] = React.useState(false);
  const [dc, setDc] = React.useState(false);
  const [error, setError] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [monitor, setMonitor] = React.useState(false);
  const [msgChar, setMsgChar] = React.useState<Characteristic | null>(null);
  const [msgError, setMsgError] = React.useState<BleError | null>(null);
  const [h, setH] = React.useState(false);
  const [i, setI] = React.useState(false);
  const [d, setD] = React.useState<Device | null>();
  const [abc, setABC] = React.useState<Device | null>();
  const [db, setDb] = useGlobalState('db');
  const [key, _] = useGlobalState('key');
  const [_interval, setInt] = useGlobalState('interval');
  const [_numbers, setNumbers] = useGlobalState('numbers');
  const [_ac, setAc] = useGlobalState('auto_connect');
  const [numbers, setN] = React.useState<string[]>([]);
  const [nDev, setNDev] = React.useState(false);
  
React.useEffect(() => {
      const d = new tresdb(getDbPath(), key);
      setDb(d); 
      d.read_raw<TresCol>().then(async (v) => {

        let settings = v.settings;
        
          
          setInt(settings.interval);
          setNumbers(settings.emergency_numbers);
          setAc(settings.auto_connect);
          
          settings.emergency_numbers.map(v => {
            setN([...numbers, v.number])
          })
        
          if (settings.auto_connect) {
            await scan()
          }
        console.log(`Settings all done`);
      })
    }, []);

  // const scanForPeripherals = () =>
//     bleManager.startDeviceScan(null, null, (error, device) => {
//       if (error) {
//         console.log(error);
//       }
//       // console.log(`Available Devices: ${device}`)
//       // if (device) setH([...h, device]); bleManager.stopDeviceScan();
//       if (device && device.name?.includes("TRES")) {
//         setAllDevices((prevState: Device[]) => {
//           if (!isDuplicteDevice(prevState, device)) {
//             return [...prevState, device];
//           }
//           return prevState;
//         });
//         // setAllDevices([...allDevices, device]);
//         setNDevice(false);
//         bleManager.stopDeviceScan();
//       }
//     });

//     const _disconnect = async () => {
//       if (connectedDevice) {
//         await bleManager.cancelDeviceConnection(connectedDevice.id);
//         bleManager.cancelTransaction('msgtransaction');
//         setConnectedDevice(null);
//         setBox('');
//         setMsg('');
//       }
//     }
  
//     const disconnectFromDevice = async () => {
//       setNDevice(false);
//       if (BackgroundService.isRunning()) {
//         BackgroundService.stop();
//         await _disconnect();
//         return;
//       }
//       await _disconnect();

//     };

  const scanForPeripherals = () => {
    ble.startDeviceScan(null, null, (e, device) => {
      if (e) {
        console.log(e)
      };
      if (device && device.name === BLE_CONF.name) {
        connect(device);
        setNDev(false);
        ble.stopDeviceScan();
      }
    })
  }

  // const connectToDevice = async (device: Device) => {
    //       try {
    //         const dev = await bleManager.connectToDevice(device.id);
    //         const deviceConnection = await dev.discoverAllServicesAndCharacteristics();
    //         setConnectedDevice(deviceConnection);
    //         bleManager.stopDeviceScan();
            
            
    
    //       } catch (e) {
    //         console.log("FAILED TO CONNECT", e);
    //       }
    //     };
    

  const connect = async (device : Device) => {
  
    try {
      const dev = await ble.connectToDevice(device.id);
      const deviceConnection = await dev.discoverAllServicesAndCharacteristics();
      setConn({
        ble: true,
        device: dev
      });
      // startStreamingData(deviceConnection);
      await start(task, minsToMs(_interval), deviceConnection, numbers);
      ble.stopDeviceScan();
    } catch (e) {
      console.log("Failed to connect", e);
    }

  }

  React.useEffect(() => {

    const i = _interval ? _interval : 1800000
    const interval = setInterval(() => {
      if (!loc) return;
      if (BackgroundService.isRunning()) {
      Geolocation.getCurrentPosition(async (pos) => {
        let c = pos.coords;
        if (!await db?.locationInDb(loc)) await db?.insert({
          id: uuid.v4().toString(),
          lat: c.latitude,
          long: c.longitude,
          timestamp: new Date().getTime()
        })
        console.log(await db?.get());
        if (loc.lat === 0) return
        console.log(`Last: ${loc.lat}, ${loc.long};;;;;;; New: ${c.latitude}, ${c.longitude}`);
        if (loc.lat === c.latitude || loc.long === c.longitude) return;
        console.log(`New position ${c.latitude}, ${c.longitude}`);
      });
      console.log('Hello')
    } else  {
      return () => clearInterval(interval);
    }
    console.log('running')
    }, minsToMs(i));
    return () => clearInterval(i);
 
  }, [loc])

  const scan = async () => {

    requestPerm().then(v => {
      if (!v) {
        Alert.alert("TRES Error", "Permission Denied");
        return;
      }
      scanForPeripherals();
      setTimeout(() => {
        if (!conn.device) {
          ble.stopDeviceScan();
          setNDev(true);
        }
      }, 3000);

    })
  }
  const disconnectDevice = async () => { 
    let device = conn.device;
    if (!device) return
    const isConnected = await device.isConnected();
    if (isConnected) {

        setNDev(false);
        ble.cancelTransaction('messagetransaction');
        // ble.cancelTransaction('boxtransaction');
        ble.cancelDeviceConnection(device.id)
            .then(() => {
                console.log('Disconnected');
                setConn({
                  ble: false,
                  device: null
                })
            })

        setConn({
          device: null,
          ble: false
        })
        if (BackgroundService.isRunning()) {
          await BackgroundService.stop();
        }
    }
    ToastAndroid.showWithGravity(
      "Successfully disconnected.",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
    // BackHandler.exitApp();
    
  }


  const task = async (data: any) => {
    await new Promise(async (resolve) => {
      const delay = data?.delay || minsToMs(30);
      const device = data?.device as Device | null;
      const n = data?.numbers as string[] | null;
      
  
      let last: Location = {
        long: 0,
        lat: 0,
      }

      Geolocation.getCurrentPosition(async (pos) => {
        setLoc({
          lat: pos.coords.latitude,
          long: pos.coords.longitude
        })
        
        if (!await db?.locationInDb({lat: pos.coords.latitude, long: pos.coords.longitude})) {
          console.log(`New Position : ${pos.coords.latitude} ${pos.coords.longitude}`)
        await db?.insert({
          id: uuid.v4().toString(),
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
          timestamp: new Date().getTime()
        })
        }
      })

    


      device?.monitorCharacteristicForService(
        BLE_CONF.service,
        BLE_CONF.message,
        (e, char) => {
          const raw = decode(char?.value);
          if (raw === "location") {
            ToastAndroid.show("Sending SMS Alert...", ToastAndroid.SHORT);
            
            Geolocation.getCurrentPosition(async (pos) => {
              if (!db) {
                // Database should be initialized tho
                ToastAndroid.show("Databse not found ... ?", ToastAndroid.LONG);
                return;
              }
              let c = pos.coords;
              let numbers = await db.readSettingsNumber();
              console.log('Coords', c.latitude)
              console.log("Numbers:", numbers); 
              if (!numbers) ToastAndroid.show("No numbers set", ToastAndroid.SHORT)

              numbers.map(v => {
                
                DirectSms.sendSms(
                  v.number, 
                  `TRES SOS Alert! Here's my exact location:\n\nLatitude: ${c.latitude} Longitude: ${c.longitude}`
                );
               
              })
             
            })
  
            ToastAndroid.show("SMS Alert Sent...", ToastAndroid.LONG);
            
          }
        }
      )

    //   for (let i = 0; BackgroundService.isRunning(); i++) {
        
    //     Geolocation.getCurrentPosition(pos => {
    //       let c = pos.coords;
    //       let lat = c.latitude;
    //       let long = c.longitude;


    //       if (loc.lat !== lat && loc.long !== long) {
    //         db?.insert({
    //           id: uuid.v4().toString(),
    //           lat: lat,
    //           long: long,
    //           timestamp: new Date().getTime(),
    //         });
    //         console.log(`New Location ${lat} ${long}`);
            
    //       }

    //       loc.lat = lat;
    //       loc.long = loc.long;

    //     })

    //     await sleep(delay)
    //   }

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
            onPress={conn.device ? disconnectDevice : scan}
            text={`${conn.device ? 'DISCONNECT' : (nDev ? 'NO DEVICE FOUND' : 'CONNECT')}`}
            background={`${conn.device ? '#719372' : '#a78587'}`}
          />
          <View className="h-3"></View>
          <Button
            onPress={() => props.navigation.navigate('Main')}
            text="VIEW STATS"
          />
          
          {/* <Button
            onPress={BackgroundService.stop}
            text="VIEW STATS"
          /> */}
         
          {/* <Text className='text-[#0e0e0e]'>Dc+: {dc ? 'a' : 'b'}</Text> */}
          {/* <Text className='text-[#0e0e0e]'>Dev: {d?.name} ABC: {abc?.name} I: {i ? 'true' : 'false'} H: {h ? 'true' : 'false'}</Text> */}
          {/* <Text className='text-[#0e0e0e]'>Message: {value.message} Status: {monitor ? 'Monitoring' : 'Idle'}</Text> */}
          {/* <Text className='text-[#0e0e0e]'>Char ID: {msgChar ? msgChar.deviceID : 'none'} Char Value: ${msgChar ? msgChar.value : 'None'} Error : {msgError ? msgError.message : 'None'}</Text> */}
          {/* <Text className='text-[#0e0e0e]'>{}</Text> */}
          {/* {db?.readSettingsNumber().then(v => {
            v.map((_, i) => <Text className="text-[#0e0e0e]" key={i}>Number: {_.number}</Text>)
          })} */}
          {/* <View className="min-h-10 bg-[#0e0e0e]"></View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConnectScreen;
