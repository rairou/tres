/*
 * Copyright (c) 2022 riyuzenn <riyuzenn@gmail.com>
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
import {TButton, TTabButton} from '../interfaces/button';

export function TabButton({onPress, icon, active}: TTabButton) {
  return (
    <Pressable onPress={onPress}>
      {({pressed}) => (
        <View
          className={`${
            active ? 'bg-[#0e0e0e] mt-4' : 'mt-5'
          } rounded-xl  mr-5`}>
          <View
            style={{
              transform: active
                ? [
                    {translateX: pressed ? 0 : -5},
                    {translateY: pressed ? 0 : -5},
                  ]
                : [],
            }}
            className={` ${
              active ? ' border-black bg-[#a78587] border-2' : ''
            } flex min-w-[13vw] items-center justify-center rounded-xl py-2 font-bold`}>
            {icon}
          </View>
        </View>
      )}
    </Pressable>
  );
}

export default function Button({onPress, text, className = ''}: TButton) {
  return (
    <Pressable onPress={onPress}>
      {({pressed}) => (
        <View className={`max-w-[60vw] bg-[#0e0e0e] rounded-xl`}>
          <View
            style={{
              transform: [
                {translateX: pressed ? 0 : -5},
                {translateY: pressed ? 0 : -5},
              ],
            }}
            className="flex max-w-[60vw] min-w-[60vw] items-center justify-center rounded-xl border-2 border-black bg-[#a78587] py-3 font-bold">
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
