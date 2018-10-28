import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { View, Text } from 'react-native';
// import Ionicons from 'react-native-vector-icons/FontAwesome';
import Home from '../components/home';


const PaymentsTab = (props) => {
  return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Payments</Text></View>;
};
//
// const AddTaskTab = (props) => {
//   return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Add Task</Text></View>;
// };
//
// const ManageTab = (props) => {
//   return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Manage</Text></View>;
// };
//
// const ProfileTab = (props) => {
//   return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Profile</Text></View>;
// };


const MainTabBar = createBottomTabNavigator({
  Home,
  PaymentsTab,
},
{
  initialRouteName: 'Home',
});


export default MainTabBar;
