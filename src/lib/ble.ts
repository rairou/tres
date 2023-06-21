// /*
//  * Copyright (c) 2023 rairou <rairoudes@gmail.com>
//  * See the license file for more info
//  *
//  * This program is free software: you can redistribute it and/or modify
//  * it under the terms of the GNU General Public License as published by
//  * the Free Software Foundation, either version 3 of the License, or
//  * (at your option) any later version.
//  *
//  * This program is distributed in the hope that it will be useful,
//  * but WITHOUT ANY WARRANTY; without even the implied warranty of
//  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  * GNU General Public License for more details.
//  * 
//  * You should have received a copy of the GNU General Public License
//  * along with this program.  If not, see <http://www.gnu.org/licenses/>.
// */

// // BLE client. Make sure to change the UUIDs


// import { Location, TransactionData } from "../interfaces/data";
// import { encode, decode, sleep } from "../lib/utils";
// import { useMemo, useState } from 'react';
// import { PermissionsAndroid, Platform } from 'react-native';
// import {  
//     BleError,
//     BleManager,
//     Characteristic,
//     Device
// } from 'react-native-ble-plx';

// interface BLEAPI {
//     requestPerm() : Promise<boolean>;
//     scanForPeripherals(): void;
//     connectToDevice: (id: Device) => Promise<void>;
//     disconnectFromDevice: () => void;
//     connectedDevice: Device | null;
//     allDevices: Device[];
//     box: string;
//     msg: string;
// }


// // device name
// const b = "TRES";
// const SERVICE_UUID = "5e701e83-b88c-4622-888f-12fd72bb1837";
// const MESSAGE_UUID = "c6f3bc87-c04e-4b7c-a846-6f3e87213b61";
// const BOX_UUID = "2bdada9f-2a73-4faf-8745-21b0375fb934";

// export const BLE_CONF = {
//     service: SERVICE_UUID,
//     message: MESSAGE_UUID,
//     box: BOX_UUID,
//     name: b
// }



// export default function useBLE(): BLEAPI {
//     const bleManager = useMemo(() => new BleManager(), []);
//     const [allDevices, setAllDevices] = useState<Device[]>([]);
//     const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
//     const [msg, setMsg] = useState<string>('');
//     const [box, setBox] = useState<string>('');

//     const requestPerm = async () => {
//         const bleScanPerm = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//             {
//                 title: "Location Permission",
//                 message: "BLE requires location",
//                 buttonPositive: "OK",
//             }
//         );
//         const bleConnectPerm = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//             {
//                 title: "Location Permission",
//                 message: "BLE requires Location",
//                 buttonPositive: "OK"
//             }
//         );
//         const fineLocationPerm = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//             {
//                 title: "Location Permission",
//                 message: "BLE requires Location",
//                 buttonPositive: "OK"
//             }
//         );

//         return (
//             bleScanPerm === "granted" && 
//             bleConnectPerm === "granted" &&
//             fineLocationPerm === "granted" 
//         )
//     }


//     const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
//     devices.findIndex((device) => nextDevice.id === device.id) > -1;

//   const scanForPeripherals = () =>
//     bleManager.startDeviceScan(null, null, (error, device) => {
//       if (error) {
//         console.log(error);
//       }
//       console.log(`Available Devices: ${device}`)
//       if (device && device.name?.includes("TRES")) {
//         setAllDevices((prevState: Device[]) => {
//           if (!isDuplicteDevice(prevState, device)) {
//             return [...prevState, device];
//           }
//           return prevState;
//         });
//       }
//     });

//   const connectToDevice = async (device: Device) => {
//     try {
//       const deviceConnection = await bleManager.connectToDevice(device.id);
//       setConnectedDevice(deviceConnection);
//       await deviceConnection.discoverAllServicesAndCharacteristics();
//       bleManager.stopDeviceScan();
//       startStreamingData(deviceConnection);
//     } catch (e) {
//       console.log("FAILED TO CONNECT", e);
//     }
//   };

//   const disconnectFromDevice = () => {
//     if (connectedDevice) {
//       bleManager.cancelDeviceConnection(connectedDevice.id);
//       setConnectedDevice(null);
//       setBox('');
//     }
//   };

//   const handleMessageChar = (
//     error: BleError | null,
//     char: Characteristic | null
//   ) => {
//     if (error) {
//         console.log(error);
//         return '';
//     } else if (!char?.value) {
//         console.log("No Data received")
//         return '';
//     }

//     const raw = decode(char.value);
//     setMsg(raw);
//   }

//   const handleBoxChar = (
//     error: BleError | null,
//     char: Characteristic | null
//   ) => {
//     if (error) {
//         console.log(error);
//         return '';
//     } else if (!char?.value) {
//         console.log("No Data received")
//         return '';
//     }

//     const raw = decode(char.value);
//     setBox(raw);
//   }

//    const startStreamingData = async (device: Device) => {
//     if (device) {
//       device.monitorCharacteristicForService(
//         BLE_CONF.service,
//         BLE_CONF.message,
//         handleMessageChar
//       );
//       device.monitorCharacteristicForService(
//         BLE_CONF.service,
//         BLE_CONF.box,
//         handleBoxChar
//       );
//     } else {
//       console.log("No Device Connected");
//     }
//   };
//   return {
//     scanForPeripherals,
//     requestPerm,
//     connectToDevice,
//     allDevices,
//     connectedDevice,
//     disconnectFromDevice,
//     box,
//     msg,
//   }
// }

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

// BLE client. Make sure to change the UUIDs

import { BleManager, Device, DeviceId } from "react-native-ble-plx";
import { Location, TransactionData } from "../interfaces/data";
import { Characteristic } from "react-native-ble-plx";
import { encode, decode, sleep } from "../lib/utils";

// device name
const b = "TRES";
const SERVICE_UUID = "40afc201-1fb5-459e-8fcc-c5c9c331914b";
const MESSAGE_UUID = "bcb5483e-36e1-4688-b7f5-ea07361b26a8";
const BOX_UUID = "2bdada9f-2a73-4faf-8745-21b0375fb934";

export const BLE_CONF = {
    service: SERVICE_UUID,
    message: MESSAGE_UUID,
    box: BOX_UUID,
    name: b
}

const ble = new BleManager();

export async function sendLocationNotification(id: DeviceId) : Promise<TransactionData | {}> {
    let raw: TransactionData = 
    {
        type: "notif",
        timestamp: new Date().getTime(),
        message: "Location notification",
        data: {},
    }

    let char = await ble.writeCharacteristicWithResponseForDevice(
        id,
        SERVICE_UUID,
        BOX_UUID,
        encode(JSON.stringify(raw))
    );
    
    if (!char.value) return {}
    return parse<TransactionData>(char.value);

}

export function parse<T>(value: string) : T {
    return JSON.parse(decode(value)) as T
}

export async function sendLocationData(id: DeviceId, data: string) : Promise<Characteristic> {
    return ble.writeCharacteristicWithoutResponseForDevice(
        id,
        SERVICE_UUID,
        BOX_UUID,
        encode(data),
    )
}

export async function scanDevice(connectionHandler : (device: Device) => void) {
    ble.startDeviceScan(null, null, (error, scannedDevice) => {
        if (scannedDevice && scannedDevice.name == b) {
            ble.stopDeviceScan();
            connectionHandler(scannedDevice);
        }
    });



}

export { ble, BleManager };