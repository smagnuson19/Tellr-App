import React from 'react';
import {
} from 'react-native';
// import BottomTabBar from './navigation/bottom_tab_bar';
import RootStack from './navigation/bottom_tab_bar';

// disable really annoying in app warnings
console.disableYellowBox = true;
//  <BottomTabBar /> - put this in below, was buggy error
const App = (props) => {
  return (
    <RootStack />
  );
};

export default App;
