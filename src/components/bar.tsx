import {View, Text, Pressable} from 'react-native';
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
