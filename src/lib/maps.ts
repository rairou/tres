
import { Platform, Linking } from 'react-native';

type OpenLocProps = {
    sourceLat: number;
    sourceLong: number
    destLat: number,
    destLong: number,
    label?: string,
}

type OpenProps = {
    lat: number;
    long: number
    label?: string,
}

export function openLocation({
    sourceLat,
    sourceLong,
    destLat,
    destLong,
    label = 'Your Location'
}: OpenLocProps) {
    const scheme = Platform.select({
        ios: `maps://${sourceLat},${sourceLong}?q=`,
        android: `geo:${sourceLat},${sourceLong}?q=`
    })
    const url = Platform.select({
        ios: `${scheme}${label}@${destLat},${destLong}`,
        android: `${scheme}${destLat},${destLong}(${label})`,
        default: `${scheme}${destLat},${destLong}(${label})`,
    })
    Linking.openURL(url);
}

export default function open({
    lat,
    long,
    label = 'Your Location'
}: OpenProps) {
    return openLocation({
        sourceLat: 0,
        sourceLong: 0,
        destLat: lat,
        destLong: long,
        label: label
    })
}