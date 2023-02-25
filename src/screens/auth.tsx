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


import {SafeAreaView, Text} from 'react-native';
import Button from '../components/button';
import Pin from '../components/pin';
import {AuthScreenProps} from '../interfaces/screen';

const AuthScreen: React.FC<AuthScreenProps> = props => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#F1EAD8]">
      <Text className="text-[#0e0e0e]" style={{fontFamily: 'JetBrains Mono'}}>
        Enter the passcode for the database
      </Text>
      <Pin pinSize={4} onSubmit={(pin: number[]) => props.navigation.navigate("Main")} />
      
    </SafeAreaView>
  );
};

export default AuthScreen;
