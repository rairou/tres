import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';

const user = firestore().collection('user');


function shift(str: string) {
    return str.split('')
        .map(char => String.fromCharCode(char.charCodeAt(0) + (char.toLowerCase() < 'n' ? 13 : -13)))
    .join('');
}

export async function getId(): Promise<string> {
    let device_id = DeviceInfo.getDeviceId();
    let id = shift(device_id);
    let d = await user.doc(id).get();
    if (!d.exists) {
        user.doc(id).set({
            timestamp: new Date().getTime(),
            device_id: device_id
        })
        return id;
    } 
    return id;
}

