import React from 'react';
import {
  createBottomTabNavigator, createStackNavigator,
} from 'react-navigation';
// import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, fonts } from '../styling/base';

// import Ionicons from 'react-native-vector-icons/FontAwesome';
import Home from '../components/tabs/home';
import Payments from '../components/tabs/payments';
import AddTask from '../components/tabs/addTask';
import Profile from '../components/tabs/profile';
import Goals from '../components/tabs/goals';
import Login from '../components/login';
import SignUp from '../components/signup/signUp';

import SignUpFirstDialouge from '../components/signup/accountTypeSelector';


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
  Goals,
  'Add Task': AddTask,
  Profile,
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-home${focused ? '' : ''}`;
      } else if (routeName === 'Payments') {
        iconName = `ios-card${focused ? '' : ''}`;
      } else if (routeName === 'Add Task') {
        iconName = `ios-add-circle${focused ? '' : ''}`;
      } else if (routeName === 'Profile') {
        iconName = `ios-person${focused ? '' : ''}`;
      } else if (routeName === 'Goals') {
        iconName = `ios-star${focused ? '' : ''}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: colors.primary,
    inactiveTintColor: 'white',
    style: {
      backgroundColor: colors.linearGradientBottom,
      fontFamily: fonts.secondary,
    },
  },
},
{
  initialRouteName: 'Home',
});

const SignUpDialouge = createStackNavigator({
  SignUpFirstDialouge: { screen: SignUpFirstDialouge },
  SignUp: { screen: SignUp },

},
{
  initialRouteName: 'SignUpFirstDialouge',
  headerBackTitleVisible: 'True',
  navigationOptions: () => ({
    headerTransparent: 'True',
  }),
});


const RootStack = createStackNavigator(
  {
    SignUp: { screen: SignUpDialouge },
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
    headerBackTitleVisible: 'True',
    navigationOptions: () => ({
      headerTransparent: 'True',
    }),

  },
);


export default RootStack;
