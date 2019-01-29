import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, fonts } from '../styling/base';

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
import Friends from '../components/tabs/friends';
import AuthLoadingScreen from '../components/AuthLoading';
import ParentViewOfChild from '../components/tabs/parentViewOfChild';


import SignUpFirstDialouge from '../components/signup/accountTypeSelector';

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      headerTransparent: 'True',
    }),
  },
  ChildPage: {
    screen: ParentViewOfChild,
    navigationOptions: () => ({
      headerTransparent: 'True',
    }),

  },
},
{
  initialRouteName: 'Home',
  headerTransparent: 'True',
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
  headerMode: 'none',
  navigationOptions: ({ navigation }) => ({
    headerTransparent: 'True',
    headerMode: 'none',
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
  initialRouteName: 'Home',
});

const ChildTabBar = createBottomTabNavigator({
  Home,
  Goals,
  Friends,
  Profile,
},
{
  headerMode: 'none',
  navigationOptions: ({ navigation }) => ({
    headerTransparent: 'True',

    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-home${focused ? '' : '-outline'}`;
      } else if (routeName === 'Profile') {
        iconName = `ios-person${focused ? '' : ''}`;
      } else if (routeName === 'Goals') {
        iconName = `ios-star${focused ? '' : ''}`;
      } else if (routeName === 'Friends') {
        iconName = `ios-contacts${focused ? '' : ''}`;
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

ParentTabBar.navigationOptions = {
  headerTransparent: 'True',

};

ChildTabBar.navigationOptions = {
  headerTransparent: 'True',

};
const SignUpDialouge = createStackNavigator({
  SignUpFirstDialouge: {
    screen: SignUpFirstDialouge,
    navigationOptions: () => ({
      headerTransparent: 'True',
    }),
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: () => ({
      headerTransparent: 'True',
    }),
  },

},
{
  initialRouteName: 'SignUpFirstDialouge',
  headerBackTitleVisible: 'True',
});

const AppStack = createStackNavigator(
  {
    ParentTabBar: {
      screen: ParentTabBar,
      navigationOptions: () => ({
        gesturesEnabled: false,
        headerTransparent: 'True',
        header: null,

      }),
    },
    ChildTabBar: {
      screen: ChildTabBar,
      navigationOptions: () => ({
        gesturesEnabled: false,
        headerTransparent: 'True',
      }),
    },
    newGoal: {
      screen: NewGoal,
      headerTransparent: 'True',
    },
    redeemMoney: {
      screen: redeemMoney,
      headerTransparent: 'True',
    },
  },

);


AppStack.navigationOptions = {
  headerTransparent: 'True',
};

const AuthStack = createSwitchNavigator({
  App: {
    screen: AppStack,
    navigationOptions: () => ({
      gesturesEnabled: false,
      headerTransparent: 'True',
    }),
  },
  SignUp: {
    screen: SignUpDialouge,
  },

  Loading: {
    screen: Loading,
    navigationOptions: () => ({
      headerTransparent: 'True',
      header: null,
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
});


const RootStack = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
));


// const RootStack = createStackNavigator(
//   {
//     SignUp: { screen: SignUpDialouge },
//     newGoal: { screen: NewGoal },
//     redeemMoney: { screen: redeemMoney },
//     ParentTabBar: {
//       screen: ParentTabBar,
//       navigationOptions: () => ({
//         gesturesEnabled: false,
//       }),
//     },
//     ChildTabBar: {
//       screen: ChildTabBar,
//       navigationOptions: () => ({
//         gesturesEnabled: false,
//       }),
//     },
//     Login: {
//       screen: Login,
//       navigationOptions: () => ({
//         headerTransparent: 'True',
//       }),
//     },
//     Loading: {
//       screen: Loading,
//       navigationOptions: () => ({
//         headerTransparent: 'True',
//       }),
//     },
//   },
//   {
//     initialRouteName: 'Login',
//     headerBackTitleVisible: 'True',
//     navigationOptions: () => ({
//       headerTransparent: 'True',
//     }),
//
//   },
// );

export default RootStack;
