import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';

export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#F1EAD8]">
      <Text className="text-[#0e0e0e]" style={{fontFamily: 'JetBrains Mono'}}>
        Settings Screen
      </Text>
    </SafeAreaView>
  );
}
