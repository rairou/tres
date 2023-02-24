// // Main app file
// //

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './navs/root';

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
