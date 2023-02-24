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
