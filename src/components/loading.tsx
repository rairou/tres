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

import { Modal, Text, ActivityIndicator, View } from 'react-native';

type LProps = {
    visible: boolean;
    title?: string;
}
export default function Loading({visible, title = "Loading"}: LProps) {
    return (
        <Modal transparent onRequestClose={() => null} visible={visible}>
            <View className='flex-1 items-center bg-[black]/70 justify-center'>
            <View className="flex-row justify-center items-center rounded-md bg-[#F1EAD8] p-5 px-10">
                <Text 
                    className='pr-5 font-semibold' 
                    style={{ 
                        color: '#0e0e0e', 
                        fontSize: 14,  
                        fontFamily: 'JetBrains Mono' 
                    }}>
                        {title}
                    </Text>
                <ActivityIndicator color="#a78587" size="large" />
            </View>
            </View>

        </Modal>
    )
}