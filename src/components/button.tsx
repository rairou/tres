
import React from "react";
import { Text, View, Pressable } from "react-native";

type TButton = {
  onPress: () => {};
  text: string;
  className?: string;
}

export default function Button({ onPress, text, className = "" }: TButton) {
  return (
    <Pressable onPress={onPress}>
      {({pressed}) => (
    <View className={`max-w-[60vw] bg-[#0e0e0e] rounded-xl`}>
    <View style={{ transform: [{translateX: pressed ? 0 : -5}, {translateY: pressed ? 0 : -5}] }} className="flex max-w-[60vw] items-center justify-center rounded-xl border-2 border-black bg-[#a78587] py-3 font-bold">
      <Text style={{ fontFamily: "JetBrains Mono", fontWeight: "bold"}} className="text-[#0e0e0e]">{text}</Text>
    </View>
    </View>
    )}
    </Pressable>
  )
}
