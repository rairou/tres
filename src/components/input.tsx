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

import { Text, View, TextInput, KeyboardTypeOptions } from "react-native";


type InputProps = {
    placeholder: string;
    password?: boolean;
    klass?: string;
    onChangeText?: (v: string) => void;
    type?: KeyboardTypeOptions;
    value?: string;
    disabled?: boolean;
}

export default function Input({ 
    placeholder, 
    password = false, 
    klass = "", 
    onChangeText = () => {},
    type = "default",
    value = "",
    disabled = false
}: InputProps) {
    return (
        <View className={`${klass}`}>
            <TextInput editable={!disabled} value={value ? value : undefined} keyboardType={type} onChangeText={onChangeText} style={{ fontFamily: 'JetBrains Mono' }} placeholderTextColor="#555"  secureTextEntry={password} placeholder={placeholder} cursorColor="#555" className={
                `
                max-w-[70vw] min-w-[70vw] 
                rounded-xl max-h-[13vw]  
                border-[1.5px] border-black
                text-[#0e0e0e] px-5
                
                `
            }/>
            <Text className="text-[#000]"></Text>
        </View>
    )
}
