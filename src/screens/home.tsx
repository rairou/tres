import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {HomeScreenProps} from '../interfaces/screen';

const HomeScreen: React.FC<HomeScreenProps> = props => {
  return (
    <SafeAreaView className="flex-1 px-5 pt-12 bg-[#F1EAD8]">
      <View className="">
        <Text
          className="text-[#0e0e0e] font-semibold text-[40px]"
          style={{fontFamily: 'JetBrains Mono'}}>
          You've been in
          <Text
            className="text-[#a78587]"
            style={{fontFamily: 'JetBrains Mono'}}>
            {' '}
            2{' '}
          </Text>
          places TODAY!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
