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
import React from "react";

import { FileSystem } from "react-native-file-access";
import {SafeAreaView, Text, Alert } from 'react-native';
import Pin from '../components/pin';
import {AuthScreenProps} from '../interfaces/screen';
import { useGlobalState } from '../state';
import { deriveKeyFromPin } from '../lib/key';
import { checkEncryptionKey, tresdb } from '../lib/db';
import { getDbPath } from '../lib/path';

const AuthScreen: React.FC<AuthScreenProps> = props => {
  const [_key, setKey] = useGlobalState("key");
  const [_iv, setIv] = useGlobalState("iv");
  const [exist, setExist] = React.useState(false);
  React.useEffect(() => {
    FileSystem.exists(getDbPath()).then(v => {
      v ? setExist(true) : setExist(false);
    })
  }, []);
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#F1EAD8]">
      {exist ? <></> : 
        <Text className='text-[#a785a7]' style={{fontFamily: 'JetBrains Mono'}}>
          NOTE: You can only set key ONCE</Text> }
      <Text className="text-[#0e0e0e]" style={{fontFamily: 'JetBrains Mono'}}>
        {`${exist ? "Enter" : "Set"}`} the passcode for the database
      </Text>
      <Pin pinSize={4} onSubmit={(pin: number[]) => {
        let k = deriveKeyFromPin(pin.join(""));
        let db = new tresdb(getDbPath(), pin.join(""));
        db.getIv().then((v) => {
          setIv(v);
        })

        checkEncryptionKey(getDbPath(), k)
          .then(v => {
            const b = () => {
              props.navigation.navigate("Main")
              setKey(k);
            }
            const a =() => {
              Alert.alert('TRES', `Error: Invalid pin (${pin.join("")})`, [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {text: 'OK'},
                ]);
            }
            v ? b() : a()
          })
          .catch(e => {
            console.log(`Failure : ${e}`)
          });
      }} />
      
    </SafeAreaView>
  );
};

export default AuthScreen;
