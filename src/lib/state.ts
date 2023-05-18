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

import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createGlobalState } from "react-hooks-global-state";
import { Algorithms } from "react-native-aes-crypto";
import { Location, TransactionData } from "../interfaces/data";
import { Connection, Value } from "../interfaces/state";
import { Device } from "react-native-ble-plx";

export const LOCATION: Location = {
    lat: 0,
    long: 0,
}


export const { useGlobalState } = createGlobalState({
    key: '',
    algo: 'aes-256-cbc' as Algorithms,
    iv: '',
    connection: {
        ble: false,
        device: null as Device | null,
        error: ''
    } as Connection,
    value: {
        box: null,
        message: null
    } as Value,
    user: null as FirebaseAuthTypes.User | null,
    loc: {
        lat: null,
        long: null
    } as Location | null,
});