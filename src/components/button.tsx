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


import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {ButtonProps, TabButtonProps} from '../interfaces/button';
import Google from './google';

export function TabButton({onPress, icon, active}: TabButtonProps) {
  return (
    <Pressable onPress={onPress}>
      {({pressed}) => (
        <View
          className={`${
            active ? 'bg-[#0e0e0e] mt-4' : 'mt-5'
          } rounded-xl  mr-5`}>
          <View
            // style={{
            //   transform: active
            //     ? [
            //         {translateX: pressed ? 0 : -5},
            //         {translateY: pressed ? 0 : -5},
            //       ]
            //     : [],
            // }}
            className={` ${
              active ? ' border-black bg-[#a78587] border-[1.5px]' : ''
            } flex min-w-[13vw] items-center justify-center rounded-xl py-2 font-bold`}>
            {icon}
          </View>
        </View>
      )}
    </Pressable>
  );
}

// Button designed for pin component. Do not use it as a normal button.
export function PinButton({onPress, text, icon = null}: ButtonProps) {
  return (
    <Pressable onPress={onPress} className="mx-3 my-3">
      {({pressed}) => (
        <View className={`max-w-[60vw] bg-[#0e0e0e] rounded-xl`}>
          <View
            style={{
              transform: [
                {translateX: pressed ? 0 : -5},
                {translateY: pressed ? 0 : -5},
              ],
            }}
            className="flex max-w-[15vw] min-w-[15vw] min-h-[15vw] max-h-[15vw] items-center justify-center rounded-xl border-[1.5px] border-black bg-[#a78587] py-3 font-bold">
            {icon ? icon :   
            <Text
              style={{fontFamily: 'JetBrains Mono', fontWeight: 'bold'}}
              className="text-[#0e0e0e]">
              {text}
            </Text>
            }
          
          </View>
        </View>
      )}
    </Pressable>
  );
}

export default function Button({
  onPress, 
  text, 
  klass = '', 
  small  = false,
  icon = null, 
  disabled = false,
  padding = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  background = '#a78587',
  shadow = true
}: ButtonProps) {
  const bg = icon ? '#d5d5d5' : background;
  const  size =  small ?  'max-w-[30vw]' : 'max-w-[70vw]'
  return (
    <Pressable className={
      `
      pl-${padding.left} 
      pr-${padding.right} 
      pt-${padding.top} 
      pb-${padding.bottom}
      `
    }  disabled={disabled} onPress={onPress}>
      {({pressed}) => (
        <View className={`${size} bg-[#0e0e0e] rounded-xl`}>
        <View
          style={{
            transform: disabled || !shadow ? [] : [
              {translateX: pressed ? 0 : -5},
              {translateY: pressed ? 0 : -5},
            ],
            backgroundColor: bg
          }}
          className={
            `
            flex-row ${size} space-x-2 
            ${small ? 'min-w-[30vw]': 'min-w-[70vw]'} items-center justify-center 
            rounded-xl ${disabled ? 'opacity-70' : 'border-[1.5px] border-black'}
            py-3 font-bold ${klass}
            `
          }>
            
          {icon ? <Google /> : ''}
          <Text
            style={{fontFamily: 'JetBrains Mono', fontWeight: 'bold'}}
            className="text-[#0e0e0e]">
              {text}
          </Text>
        </View>
      </View>
      )}
    </Pressable>
  );
}
