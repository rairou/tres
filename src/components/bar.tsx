import {View, Text, Pressable} from 'react-native';

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


import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {TabButton} from './button';

import * as Icon from 'react-native-feather';

export default function BottomBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View className="flex-1 flex-row bg-[#F1EAD8] justify-center min-w-[100vw] max-h-[9.5vh] border-t-2">
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        console.log(route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented)
            navigation.navigate(route.name, {merge: true});
        };
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let icon;
        switch (route.name) {
          case 'Home':
            icon = <Icon.Home className="text-[#0e0e0e] max-h-[18px]" />;
            break;
          case 'Stats':
            icon = <Icon.BarChart className="text-[#0e0e0e] max-h-[18px]" />;
            break;
          case 'Device':
            icon = <Icon.MapPin className="text-[#0e0e0e] max-h-[18px]" />;
            break;
          case 'Settings':
            icon = <Icon.Settings className="text-[#0e0e0e] max-h-[18px]" />;
            break;
        }
        console.log(state.index);
        return (
          <TabButton onPress={onPress} icon={icon} active={isFocused} />
          // <View className="text-[#0e0e0e]">{icon}</View>
        );
      })}
    </View>
  );
}