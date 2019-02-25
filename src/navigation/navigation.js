import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  HeaderBackButton,
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors, fonts } from '../styling/base';
import { colors2, fonts2 } from '../styling/parent';

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
import ViewOfFriendRequests from '../components/tabs/viewOfFriendRequests';
import SignUpFirstDialouge from '../components/signup/accountTypeSelector';
import SocialView from '../components/tabs/socialView';
import ChangePassword from '../components/tabs/changePassword';
import Settings from '../components/tabs/settings';
import Analytics from '../components/tabs/analytics';

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      header: null,
    }),
  },
  ChildPage: {
    screen: ParentViewOfChild,
    navigationOptions: () => ({
      headerTransparent: 'False',
    }),
  },
},
{
  initialRouteName: 'Home',
});

const FriendsStack = createStackNavigator({
  Leaderboard: {
    screen: Friends,
    navigationOptions: () => ({
      headerTransparent: 'True',
    }),
  },
  FriendRequests: {
    screen: ViewOfFriendRequests,
    navigationOptions: () => ({
      headerTransparent: 'True',
    }),
  },
  SocialIndividual: {
    screen: SocialView,
    navigationOptions: () => ({
      headerTransparent: 'True',
    }),
  },
},
{
  initialRouteName: 'Leaderboard',
  headerTransparent: 'True',
  navigationOptions: () => ({
    headerTransparent: 'True',
  }),
});


const SettingsStack = createStackNavigator({
  SettingsPage: {
    screen: Settings,
    navigationOptions: () => ({
      headerTransparent: 'True',
    }),
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: () => ({
      headerTransparent: 'True',
    }),
  },
},
{
  initialRouteName: 'SettingsPage',
});


const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      header: null,
    }),
  },
  SettingsPage: {
    screen: SettingsStack,
    navigationOptions: () => ({
      headerTransparent: 'True',
    }),
  },
  Analytics: {
    screen: Analytics,
    navigationOptions: () => ({
      headerTransparent: 'True',
    }),
  },
},
{
  initialRouteName: 'Profile',
});

const ParentTabBar = createBottomTabNavigator({
  Home: HomeStack,
  Payments,
  'Add Task': AddTask,
  Profile: ProfileStack,
},
{
  headerMode: 'none',
  defaultNavigationOptions: ({ navigation }) => ({
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
    activeTintColor: colors2.logoGreen,
    inactiveTintColor: 'white',
    style: {
      backgroundColor: colors2.linearGradientBottom,
      fontFamily: fonts2.secondary,
    },
  },
},
{
  initialRouteName: 'Home',
});

const ChildTabBar = createBottomTabNavigator({
  Home,
  Goals,
  Friends: FriendsStack,
  Profile: ProfileStack,
},
{
  headerMode: 'none',
  defaultNavigationOptions: ({ navigation }) => ({
    headerTransparent: 'True',
    headerMode: 'none',
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-home${focused ? '' : ''}`;
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


const SignUpDialouge = createStackNavigator({
  SignUpFirstDialouge: {
    screen: SignUpFirstDialouge,
    navigationOptions: ({ navigation }) => ({

      headerLeft: <HeaderBackButton
        title="Back"
        tintColor="#000"
        backTitleVisible="true"
        onPress={() => navigation.navigate('Login')}
      />,

      headerTransparent: 'True',
    }),
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: () => ({
      headerTransparent: 'False',
      headerBackTitleVisible: 'True',
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

        header: null,

      }),
    },
    ChildTabBar: {
      screen: ChildTabBar,
      navigationOptions: () => ({

        header: null,
      }),
    },
    newGoal: {
      screen: NewGoal,
      navigationOptions: () => ({
        headerTransparent: 'True',
      }),
    },
    redeemMoney: {
      screen: redeemMoney,
      navigationOptions: () => ({
        headerTransparent: 'True',
      }),
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
    navigationOptions: () => ({
      headerBackTitleVisible: 'True',
    }),
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
