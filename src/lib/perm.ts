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

// Handle all permissions
// Required Permissions:
//  Storage
//  Bluetooth
//  Location (for debugging only)

import Geolocation from '@react-native-community/geolocation';
import { check, request, requestMultiple, PERMISSIONS, RESULTS, checkMultiple } from "react-native-permissions";

const location = [
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
];

const bluetooth = [
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT
]

export function location_permission() {
    checkMultiple(location).then((v) => {
        console.log(`Loc: ${v['android.permission.ACCESS_FINE_LOCATION']}`);
        if (
            v['android.permission.ACCESS_BACKGROUND_LOCATION'] === RESULTS.GRANTED &&
            v['android.permission.ACCESS_FINE_LOCATION'] === RESULTS.GRANTED
        ) {
            return
        }

        requestMultiple(location).then(v => {
            if (
                v['android.permission.ACCESS_BACKGROUND_LOCATION'] === RESULTS.GRANTED &&
                v['android.permission.ACCESS_FINE_LOCATION'] === RESULTS.GRANTED
            ) {
                return
            }
            location_permission()
        });
    })
}

export function bluetooth_permission() {
    checkMultiple(bluetooth).then(v => {
        if (
            v['android.permission.BLUETOOTH_CONNECT'] === RESULTS.GRANTED &&
            v['android.permission.BLUETOOTH_SCAN'] === RESULTS.GRANTED
        )
            return

        requestMultiple(bluetooth).then(v => {
            if (
                v['android.permission.BLUETOOTH_CONNECT'] === RESULTS.GRANTED &&
                v['android.permission.BLUETOOTH_SCAN'] === RESULTS.GRANTED
            )
                return

            bluetooth_permission();
        })
    })
}