import React from 'react';
import {
  createBottomTabNavigator, createStackNavigator,
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, fonts } from '../styling/base';

// import Ionicons from 'react-native-vector-icons/FontAwesome';
import Home from '../components/tabs/home';
import Payments from '../components/tabs/payments';
import AddTask from '../components/tabs/addTask';
import redeemMoney from '../components/tabs/redeemMoney';
import Profile from '../components/tabs/profile';
import Goals from '../components/tabs/goals';
import NewGoal from '../components/newGoal';
import Login from '../components/login';
import SignUp from '../components/signup/signUp';
import Loading from '../components/loading';

import ParentViewOfChild from '../components/tabs/parentViewOfChild';


import SignUpFirstDialouge from '../components/signup/accountTypeSelector';

const HomeStack = createStackNavigator({
  Home: { screen: Home },
  ChildPage: {
    screen: ParentViewOfChild,
    headerMode: 'none',
    navigationOptions: () => ({
      headerTransparent: 'True',
    }),

  },
},
{
  initialRouteName: 'Home',
  headerBackTitleVisible: 'True',
  navigationOptions: () => ({
    headerTransparent: 'True',
  }),
});

const ParentTabBar = createBottomTabNavigator({
  Home: HomeStack,
  Payments,
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
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      // https://ionicons.com/ ---> link for ionicons names
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
  initialRouteName: 'homeStack',
});

const ChildTabBar = createBottomTabNavigator({
  Home,
  Goals,
  Profile,
},
{
  headerMode: 'none',
  navigationOptions: ({ navigation }) => ({

    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-home${focused ? '' : ''}`;
      } else if (routeName === 'Profile') {
        iconName = `ios-person${focused ? '' : ''}`;
      } else if (routeName === 'Goals') {
        iconName = `ios-star${focused ? '' : ''}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      // https://ionicons.com/ ---> link for ionicons names
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
    newGoal: { screen: NewGoal },
    redeemMoney: { screen: redeemMoney },
    ParentTabBar: {
      screen: ParentTabBar,
      navigationOptions: () => ({
        gesturesEnabled: false,
      }),
    },
    ChildTabBar: {
      screen: ChildTabBar,
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
    Loading: {
      screen: Loading,
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
