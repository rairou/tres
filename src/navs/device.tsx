import {createStackNavigator} from '@react-navigation/stack';
import {DeviceStackParamList} from '../interfaces/screen';

const DeviceStack = createStackNavigator<DeviceStackParamList>();
export default function DeviceNavigator() {
  return (
    <DeviceStack.Navigator>

    </DeviceStack.Navigator>
  );
}
