import {SafeAreaView, Text} from 'react-native';
import Button from '../components/button';
import {AuthScreenProps} from '../interfaces/screen';

const AuthScreen: React.FC<AuthScreenProps> = props => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-[#0e0e0e]" style={{fontFamily: 'JetBrains Mono'}}>
        Auth Screen
      </Text>
      <Button
        onPress={() => props.navigation.navigate('Main')}
        text="Connect"
      />
    </SafeAreaView>
  );
};

export default AuthScreen;
