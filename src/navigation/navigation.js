import React from 'react';
import {
  createBottomTabNavigator, createStackNavigator,
} from 'react-navigation';
// import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuIcon from '@material-ui/icons/Menu';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

// import Ionicons from 'react-native-vector-icons/FontAwesome';
import Home from '../components/tabs/home';
import Payments from '../components/tabs/payments';
import AddTask from '../components/tabs/addTask';
import Profile from '../components/tabs/profile';
import Login from '../components/login';

import SignUpFirstDialouge from '../components/signup/ageselector';


// const PaymentsTab = (props) => {
//   return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Payments</Text></View>;
// };

// const AddTaskTab = (props) => {
//   return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Add Task</Text></View>;
// };

// const ManageTab = (props) => {
//   return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Manage</Text></View>;
// };
//
// const ProfileTab = (props) => {
//   return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Profile</Text></View>;
// };
const MainTabBar = createBottomTabNavigator({
  Home,
  Payments,
  AddTask,
  Profile,
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-home${focused ? '' : '-outline'}`;
      } else if (routeName === 'Payments') {
        iconName = `ios-card${focused ? '' : '-outline'}`;
      } else if (routeName === 'AddTask') {
        iconName = `ios-add-circle${focused ? '' : '-outline'}`;
      } else if (routeName === 'Profile') {
        iconName = `ios-person${focused ? '' : '-outline'}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'blue',
    inactiveTintColor: 'gray',
  },
},
{
  initialRouteName: 'Home',
});


const RootStack = createStackNavigator(
  {
    SignUpFirstDialouge: { screen: SignUpFirstDialouge },
    MainTabBar: {
      screen: MainTabBar,
      navigationOptions: () => ({
        gesturesEnabled: false,
      }),
    },
    Login: {
      screen: Login,
      navigationOptions: () => ({
        headerTransparent: 'True',
      }),
    },
  },
  {
    initialRouteName: 'Login',
  },
);


export default RootStack;
