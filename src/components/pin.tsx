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

import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import Button, { PinButton } from './button';
import * as Icon from "react-native-feather";

type PinCodeProps = {
    active?: boolean;
}
type PinProps = {
    pinSize: number;
    onSubmit: (pin: number[]) => void;

}
function PinCode({ active}: PinCodeProps) {
    return (
        <View className={`
            mx-2
            border-2 border-[#0e0e0e] h-5 w-5 rounded-full 
            ${active ? "bg-[#a78587] border-[#a78587]" : ""}
        `}> 
        </View>
    )
}

export default function Pin({ pinSize, onSubmit }: PinProps) {
    const [activePin, setActivePin] = useState(0);
    const [pin, setPin] = useState<number[]>([]);

    let numberOfPins = [];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "backspace"]
    
    const number = (code: string) => {
        let c: number = +code;
        if (activePin < pinSize)
            setActivePin(activePin +  1);

        if (pin.length < pinSize)
            setPin(current => [...current, c]);

    }

    const backspace = () => {
        if (activePin === 0) return
        setActivePin(activePin - 1);
        pin.pop()
        setPin(pin);
    }

    for (let i = 0; i < pinSize; i++) {
        numberOfPins.push(0);
    }

    return (
        <View className='flex justify-center items-center max-w-[85vw]'>
            <View className='flex-row py-5'>
                {numberOfPins.map((value, index) => {
                    return (
                        <PinCode key={index} active={index < activePin} />
                    )
                })}
            </View>
            <View className='flex flex-wrap flex-row justify-center items-center pb-5'>
                {numbers.map((value, index) => {
                   
                    const v = value != null ? value.toString() : "";
                    return (
                       (value === "backspace") ? <PinButton key={index} text={v} onPress={backspace} icon={<Icon.Delete className='text-[#0e0e0e] max-w-[16px]' />} /> : 
                            (value != null) ? <PinButton key={index} text={v} onPress={() => number(v)} />  : 
                                <View key={index} className='px-8 bg-red-800'></View>
                    )
                })}
            </View>
            <Button
                onPress={() => onSubmit(pin)}
                text="Connect"
            />
        </View>
    )
    
}