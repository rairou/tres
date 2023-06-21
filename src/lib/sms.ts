
import { NativeModules, PermissionsAndroid } from 'react-native';
import { Location } from "../interfaces/data";

export enum AndroidSuccessTypes {
    all = "all",
    inbox = "inbox",
    sent = "sent",
    draft = "draft",
    outbox = "outbox",
    failed = "failed",
    queued = "queued",
  }

interface AttachmentOptions {
    url: string;
    iosType?: string;
    iosFilename?: string;
    androidType?: string;
  }
interface SendSmsOptions {
    body?: string;
    recipients?: string[];
    successTypes?: AndroidSuccessTypes[];
    allowAndroidSendWithoutReadPermission?: boolean;
    attachment?: AttachmentOptions;
  }

type DirectSmsType = {
    sendSms(phoneNumber: string, msg: string): void;
}

type SendSMSType = {
    send(options: SendSmsOptions, callback: (completed: boolean, cancelled: boolean, error: boolean) => void): Promise<void>;
}

const SendSMS: SendSMSType = NativeModules.SendSMS;
const DirectSms : DirectSmsType = NativeModules.DirectSms;

const sendLocation = async (phoneNumbers: string[], location: Location): Promise<boolean> => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
            title: 'SMS Permission',
            message: "Tres needs to access SMS",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
        }
    );
    let g = granted === PermissionsAndroid.RESULTS.GRANTED
    if (g)
        phoneNumbers.map(v => {
            DirectSms.sendSms(v, `SOS Alert! Here's my location:\n\nhttps://maps.google.com/?q=${location.lat},${location.long}`);
        });
    
    return g
}
export {
    DirectSms,
    SendSMS,
    sendLocation
}
