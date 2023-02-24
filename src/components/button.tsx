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
