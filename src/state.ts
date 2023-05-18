import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createGlobalState } from "react-hooks-global-state";
import { Algorithms } from "react-native-aes-crypto";

export const { useGlobalState } = createGlobalState({
    key: '',
    algo: 'aes-256-cbc' as Algorithms,
    iv: '',
    connected: false,
    user: {} as FirebaseAuthTypes.User | null
});