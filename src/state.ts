import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createGlobalState } from "react-hooks-global-state";
import { Algorithms } from "react-native-aes-crypto";
import { Location, TransactionData } from "./interfaces/data";
import { Connection, Value } from "./interfaces/state";
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
    loc: null as Location | null,
});