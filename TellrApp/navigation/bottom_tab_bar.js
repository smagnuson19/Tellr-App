import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { View, Text } from 'react-native';

const AboutTab = (props) => {
  return <View style={{ flex: 1, justifyContent: 'center' }}><Text>about</Text></View>;
};

const SearchTab = (props) => {
  return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Home</Text></View>;
};


const MainTabBar = createBottomTabNavigator({
  SearchTab,
  AboutTab,
}, {
  initialRouteName: 'SearchTab',
});


export default MainTabBar;
