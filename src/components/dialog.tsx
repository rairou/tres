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

import { Modal, Text, View, Pressable, ListRenderItemInfo, TouchableOpacity, FlatList } from 'react-native';
import Button from './button';
import React from 'react';
import { Device } from 'react-native-ble-plx';

type ConnectDialogProps = {
    devices: Device[];
    visible: boolean;
    connectToPeripheral : (device: Device) => void;
    closeModal: () => void;
    nullDevice: boolean;
}

type ConnectDialogListItemProps = {
    item: ListRenderItemInfo<Device>;
    connectToPeripheral: (device: Device) => void;
    closeModal: () => void;
}

const ConnectDialogListItem: React.FC<ConnectDialogListItemProps> = props => {
    const { item, connectToPeripheral, closeModal } = props;
    const connectAndCloseModal = React.useCallback(() => {
        connectToPeripheral(item.item);
        closeModal();
    }, []);

    return (
        <TouchableOpacity
            onPress={connectAndCloseModal}
        >
            <Text 
                className='text-[#8f7374] font-extrabold' 
                style={{ fontFamily: 'JetBrains Mono' }}
            >
                {item.item.name}
            </Text>
        </TouchableOpacity>
    )
}

const ConnectDialog: React.FC<ConnectDialogProps> = props => {
    const { devices, visible, connectToPeripheral, closeModal, nullDevice } = props;

    const renderConnectDialogListItem = React.useCallback((item: ListRenderItemInfo<Device>) => {
        return (
            <ConnectDialogListItem
                item={item}
                connectToPeripheral={connectToPeripheral}
                closeModal={closeModal}
            />
        )
    }, [closeModal, connectToPeripheral]);

    React.useEffect(() => {
        if (nullDevice) closeModal();
    }, [nullDevice])
    
    return (
        <Modal
            transparent statusBarTranslucent 
            animationType='slide'
            visible={visible}
        >
            <View className='flex-1 items-center bg-[black]/70 justify-center'>
            <View className="flex-col min-w-[80vw] rounded-md bg-[#F1EAD8] p-5 px-5">
                <Text 
                    className='pb-2 font-semibold' 
                    style={{ 
                        color: '#a78587', 
                        fontSize: 20,  
                        fontFamily: 'JetBrains Mono' 
                    }}>
                        Available Devices
                    </Text>
                    {devices.map((d, i) => {
                        return (
                            <TouchableOpacity
                            key={i}
                            onPress={() => { connectToPeripheral(d); closeModal(); }}
                        >
                            <Text 
                                className='text-[#8f7374] font-extrabold' 
                                style={{ fontFamily: 'JetBrains Mono' }}
                            >
                                {d.name}
                            </Text>
                        </TouchableOpacity>
                        )
                    })}

                    <Pressable className='pt-5' onPress={closeModal}>
                        <View className="bg-[#a78587] max-w-[20vw] items-center">
                            <Text className="text-[14px]" style={{ fontFamily: 'JetBrains Mono' }}>Ok</Text>
                        </View>
                    </Pressable>
                    
{/*                
                    <FlatList
                        data={devices}
                        renderItem={renderConnectDialogListItem}
                    /> */}
                    
            </View>
            </View>
        </Modal>
    )

}

interface IButton {
    text: string;
    onClick: () => void;
}

type Props = {
    visible?: boolean;
    title?: string;
    message?: string;
}
export default function ErrorDialog({
    visible = true, 
    title = "Error", 
    message = "Hello World"
}: Props) {
    const [v, setV] = React.useState(visible);

    return (
        <Modal transparent statusBarTranslucent onRequestClose={() => setV(false) } visible={v}>
            <View className='flex-1 items-center bg-[black]/70 justify-center'>
            <View className="flex-col min-w-[80vw] rounded-md bg-[#F1EAD8] p-5 px-5">
                <Text 
                    className='pb-2 font-semibold' 
                    style={{ 
                        color: '#a78587', 
                        fontSize: 20,  
                        fontFamily: 'JetBrains Mono' 
                    }}>
                        {title}
                    </Text>
                    <Text 
                    className='font-semibold' 
                    style={{ 
                        color: '#0e0e0e', 
                        fontSize: 14,  
                        fontFamily: 'JetBrains Mono' 
                    }}>
                        {message}
                    </Text>
                    <Pressable className='pt-5' onPress={() => setV(false)}>
                        <View className="bg-[#a78587] max-w-[20vw] items-center">
                            <Text className="text-[14px]" style={{ fontFamily: 'JetBrains Mono' }}>Ok</Text>
                        </View>
                    </Pressable>
                   
            </View>
            </View>

        </Modal>
    )
}

export {
    ConnectDialog
}