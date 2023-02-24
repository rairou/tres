import React from 'react';
import {SafeAreaView, View, Text, Image, Alert, StatusBar} from 'react-native';
import Button from '../components/button';
import {ConnectScreenProps} from '../interfaces/screen';

const ConnectScreen: React.FC<ConnectScreenProps> = props => {
  return (
    <SafeAreaView className="flex-1 bg-[#F1EAD8] justify-center">
      <StatusBar backgroundColor="#a78587" barStyle="default" />
      <View className="flex bg-[#a78587] px-2 py-7">
        <Image
          className=""
          source={require('../../assets/images/illustration.png')}
        />
      </View>
      <View className="flex-1 gap-5 py-7 px-10">
        <Text
          style={{fontFamily: 'JetBrains Mono', fontWeight: 'bold'}}
          className="text-[#0e0e0e] text-[30px]">
          Multi-purpose security device
        </Text>
        <Text
          style={{fontFamily: 'JetBrains Mono'}}
          className="text-[#0e0e0e] text-[15px]">
          Get insights into your location with ease.
        </Text>

        <View className="flex-1 pt-4">
          <Button
            onPress={() => {
              Alert.alert('TRES', 'Connect button pressed', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
            }}
            text="CONNECT"
          />
          <View className="h-3"></View>
          <Button
            onPress={() => props.navigation.navigate('_Auth')}
            text="VIEW STATS"
          />
          <View className="min-h-10 bg-[#0e0e0e]"></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConnectScreen;
