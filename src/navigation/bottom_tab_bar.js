import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import Ionicons from 'react-native-vector-icons/FontAwesome';
import Home from '../components/home';
import Login from '../components/login';
import SignUp from '../components/signup';


const PaymentsTab = (props) => {
  return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Payments</Text></View>;
};

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
  PaymentsTab,
},
{
  navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            iconName = `ios-home${focused ? '' : '-outline'}`;
          } else if (routeName === 'PaymentsTab') {
            iconName = `ios-card${focused ? '' : '-outline'}`;
          }

          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      },
},
{
  initialRouteName: 'Home',
}
);


const RootStack = createStackNavigator(
  {
    SignUp: { screen: SignUp },
    MainTabBar: { screen: MainTabBar },
    Login: { screen: Login },
  },
  {
    initialRouteName: 'Login',
  },
);


export default RootStack;
