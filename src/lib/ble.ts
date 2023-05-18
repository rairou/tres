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

// BLE client. Make sure to change the UUIDs

import { BleManager, Device, DeviceId } from "react-native-ble-plx";
import { Location, TransactionData } from "../interfaces/data";
import { Characteristic } from "react-native-ble-plx";
import { encode, decode, sleep } from "../lib/utils";

// device name
const b = "TRES";
const SERVICE_UUID = "5e701e83-b88c-4622-888f-12fd72bb1837";
const MESSAGE_UUID = "c6f3bc87-c04e-4b7c-a846-6f3e87213b61";
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

export async function sendLocationData(id: DeviceId, data: Location) : Promise<Characteristic> {
    return ble.writeCharacteristicWithoutResponseForDevice(
        id,
        SERVICE_UUID,
        BOX_UUID,
        encode(JSON.stringify(data)),
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